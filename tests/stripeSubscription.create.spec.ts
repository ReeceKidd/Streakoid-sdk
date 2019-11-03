/* eslint-disable @typescript-eslint/no-explicit-any */
import { StreakoidFactory, londonTimezone } from '../src/streakoid';
import { getUser, streakoidTest } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { connectToDatabase } from './setup/connectToDatabase';
import { disconnectFromDatabase } from './setup/disconnectFromDatabase';
import { email, username } from './setup/environment';

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
            await connectToDatabase();
            const user = await getUser();
            userId = user._id;
            streakoid = await streakoidTest();

            const premiumUser = await streakoid.users.create({
                username: premiumUsername,
                email: premiumEmail,
            });
            premiumId = premiumUser._id;
            await streakoid.stripe.createSubscription({ token, userId: premiumId });
        }
    });

    afterEach(async () => {
        if (isTestEnvironment()) {
            await disconnectFromDatabase();
        }
    });

    test('takes users payment and subscribes them', async () => {
        expect.assertions(15);
        const user = await streakoid.stripe.createSubscription({
            token,
            userId,
        });
        expect(Object.keys(user.stripe)).toEqual(['customer', 'subscription']);
        expect(user.stripe.subscription).toEqual(expect.any(String));
        expect(user.stripe.customer).toEqual(expect.any(String));
        expect(user.membershipInformation.isPayingMember).toEqual(true);
        expect(user.membershipInformation.currentMembershipStartDate).toEqual(expect.any(String));
        expect(Object.keys(user.membershipInformation)).toEqual(['isPayingMember', 'currentMembershipStartDate']);
        expect(user.friends).toEqual([]);
        expect(user._id).toEqual(expect.any(String));
        expect(user.username).toEqual(username);
        expect(user.email).toEqual(email);
        expect(user.timezone).toEqual(londonTimezone);
        expect(user.profileImages).toEqual({
            originalImageUrl: 'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
        });
        expect(user.createdAt).toEqual(expect.any(String));
        expect(user.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(user).sort()).toEqual(
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
