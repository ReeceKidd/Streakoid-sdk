/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';

import { StreakoidFactory, londonTimezone } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { email, username } from './setup/environment';
import { getUser } from './setup/getUser';
import UserTypes from '../src/userTypes';

jest.setTimeout(120000);

const premiumUsername = 'premium';
const premiumEmail = 'premium@gmail.com';

describe('GET /complete-solo-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let premiumId: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const token: any = { id: 'tok_visa', email };

    beforeEach(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            const user = await getUser();
            userId = user._id;
            streakoid = await streakoidTest();

            const premiumUser = await streakoid.user.create({
                username: premiumUsername,
                email: premiumEmail,
            });
            premiumId = premiumUser._id;
            await streakoid.stripe.createSubscription({ token, userId: premiumId });
        }
    });

    afterEach(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test('takes users payment and subscribes them', async () => {
        expect.assertions(37);
        const user = await streakoid.stripe.createSubscription({
            token,
            userId,
        });
        expect(user.userType).toEqual(UserTypes.basic);
        expect(user.friends).toEqual([]);
        expect(user._id).toEqual(expect.any(String));
        expect(user.username).toEqual(username);
        expect(user.timezone).toEqual(londonTimezone);
        expect(user.profileImages).toEqual({
            originalImageUrl: 'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
        });
        expect(user.pushNotificationToken).toBeNull();
        expect(user.createdAt).toEqual(expect.any(String));
        expect(user.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(user).sort()).toEqual(
            [
                'userType',
                'isPayingMember',
                'friends',
                '_id',
                'username',
                'timezone',
                'profileImages',
                'pushNotificationToken',
                'createdAt',
                'updatedAt',
            ].sort(),
        );

        const databaseUser = await mongoose.connection.db.collection('Users').findOne({ username });
        expect(Object.keys(databaseUser.stripe)).toEqual(['customer', 'subscription']);
        expect(databaseUser.stripe.subscription).toEqual(expect.any(String));
        expect(databaseUser.stripe.customer).toEqual(expect.any(String));
        expect(databaseUser.membershipInformation.isPayingMember).toEqual(true);
        expect(databaseUser.membershipInformation.currentMembershipStartDate).toBeDefined();
        expect(databaseUser.membershipInformation.pastMemberships).toEqual([]);
        expect(Object.keys(databaseUser.membershipInformation)).toEqual([
            'isPayingMember',
            'currentMembershipStartDate',
            'pastMemberships',
        ]);
        expect(databaseUser.friends).toEqual([]);
        expect(databaseUser._id).toBeDefined();
        expect(databaseUser.username).toEqual(username);
        expect(databaseUser.email).toEqual(email);
        expect(databaseUser.timezone).toEqual(londonTimezone);
        expect(databaseUser.profileImages).toEqual({
            originalImageUrl: 'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
        });
        expect(Object.keys(databaseUser.notifications.completeStreaksReminder).sort()).toEqual(
            ['emailNotification', 'pushNotification', 'reminderTime'].sort(),
        );
        expect(databaseUser.notifications.completeStreaksReminder.emailNotification).toEqual(false);
        expect(databaseUser.notifications.completeStreaksReminder.pushNotification).toEqual(false);
        expect(databaseUser.notifications.completeStreaksReminder.reminderTime).toEqual(21);
        expect(Object.keys(databaseUser.notifications.friendRequest).sort()).toEqual([
            `emailNotification`,
            'pushNotification',
        ]);
        expect(databaseUser.notifications.friendRequest.emailNotification).toEqual(false);
        expect(databaseUser.notifications.friendRequest.pushNotification).toEqual(false);
        expect(Object.keys(databaseUser.notifications.teamStreakUpdates).sort()).toEqual([
            `emailNotification`,
            'pushNotification',
        ]);
        expect(databaseUser.notifications.teamStreakUpdates.emailNotification).toEqual(false);
        expect(databaseUser.notifications.teamStreakUpdates.pushNotification).toEqual(false);
        expect(databaseUser.pushNotificationToken).toBeNull();
        expect(databaseUser.createdAt).toBeDefined();
        expect(databaseUser.updatedAt).toBeDefined();
        expect(Object.keys(databaseUser).sort()).toEqual(
            [
                'stripe',
                'userType',
                'friends',
                'membershipInformation',
                '_id',
                'username',
                'email',
                'timezone',
                'profileImages',
                'notifications',
                'pushNotificationToken',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });

    test('sends correct error when cvc check fails', async () => {
        expect.assertions(2);
        try {
            const token: any = { email, id: 'tok_cvcCheckFail' };
            await streakoid.stripe.createSubscription({ token, userId });
        } catch (err) {
            expect(err.response.status).toEqual(400);
            expect(err.response.data.message).toEqual("Your card's security code is incorrect.");
        }
    });

    test('sends correct error when customer has insufficent funds', async () => {
        expect.assertions(2);
        try {
            const token: any = { email, id: 'tok_chargeDeclinedInsufficientFunds' };
            await streakoid.stripe.createSubscription({ token, userId });
        } catch (err) {
            expect(err.response.status).toEqual(400);
            expect(err.response.data.message).toEqual('Your card has insufficient funds.');
        }
    });

    test('sends correct error when id is empty', async () => {
        expect.assertions(2);
        try {
            await streakoid.stripe.createSubscription({ token, userId: '' });
        } catch (err) {
            expect(err.response.status).toEqual(400);
            expect(err.response.data.message).toEqual(
                'child "userId" fails because ["userId" is not allowed to be empty]',
            );
        }
    });

    test('sends correct error when non Mongo ID is sent', async () => {
        expect.assertions(2);

        try {
            await streakoid.stripe.createSubscription({ token, userId: 'invalid-id' });
        } catch (err) {
            expect(err.response.status).toEqual(500);
            expect(err.response.data.code).toEqual('500-44');
        }
    });

    test('sends correct error when user does not exist', async () => {
        expect.assertions(3);

        try {
            await streakoid.stripe.createSubscription({
                token,
                userId: '5d053a174c64143898b78455',
            });
        } catch (err) {
            expect(err.response.status).toEqual(400);
            expect(err.response.data.code).toEqual('400-11');
            expect(err.response.data.message).toEqual('User does not exist.');
        }
    });

    test('sends correct error when user is already premium', async () => {
        expect.assertions(3);

        try {
            await streakoid.stripe.createSubscription({ token, userId: premiumId });
        } catch (err) {
            expect(err.response.status).toEqual(400);
            expect(err.response.data.code).toEqual('400-12');
            expect(err.response.data.message).toEqual('User is already subscribed.');
        }
    });
});
