import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import UserTypes from '../src/userTypes';
import { username } from './setup/environment';

jest.setTimeout(120000);

describe('GET /complete-solo-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            const user = await getPayingUser();
            userId = user._id;
            streakoid = await streakoidTest();
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`that request passes when updatedUser is patched with correct keys`, async () => {
        expect.assertions(19);

        const updatedTimezone = 'Europe/Paris';

        const updatedUser = await streakoid.users.update({
            userId,
            updateData: {
                timezone: updatedTimezone,
            },
        });

        expect(Object.keys(updatedUser.stripe)).toEqual(['customer', 'subscription']);
        expect(updatedUser.stripe.subscription).toEqual(null);
        expect(updatedUser.stripe.customer).toEqual(null);
        expect(Object.keys(updatedUser.membershipInformation)).toEqual([
            'isPayingMember',
            'currentMembershipStartDate',
            'pastMemberships',
        ]);
        expect(updatedUser.membershipInformation.isPayingMember).toEqual(true);
        expect(updatedUser.membershipInformation.currentMembershipStartDate).toBeDefined();
        expect(updatedUser.membershipInformation.pastMemberships).toEqual([]);
        expect(updatedUser.userType).toEqual(UserTypes.basic);
        expect(updatedUser.friends).toEqual([]);
        expect(updatedUser._id).toEqual(expect.any(String));
        expect(updatedUser.username).toEqual(username);
        expect(updatedUser.email).toBeUndefined();
        expect(updatedUser.timezone).toEqual(updatedTimezone);
        expect(updatedUser.profileImages).toEqual({
            originalImageUrl: 'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
        });
        expect(updatedUser.pushNotificationToken).toBeNull();
        expect(updatedUser.endpointArn).toBeNull();
        expect(updatedUser.createdAt).toEqual(expect.any(String));
        expect(updatedUser.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(updatedUser).sort()).toEqual(
            [
                'stripe',
                'membershipInformation',
                'userType',
                'friends',
                '_id',
                'timezone',
                'profileImages',
                'pushNotificationToken',
                'endpointArn',
                'username',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });
});
