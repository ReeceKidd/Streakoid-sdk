import { StreakoidFactory, londonTimezone } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import UserTypes from '../src/userTypes';
import { username } from './setup/environment';

jest.setTimeout(120000);

describe('GET /users/:userId', () => {
    let streakoid: StreakoidFactory;

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            await getPayingUser();
            streakoid = await streakoidTest();
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`retreives current user`, async () => {
        expect.assertions(21);
        const user = await streakoid.user.getCurrentUser();

        expect(user._id).toEqual(expect.any(String));
        expect(user.email).toBeDefined();
        expect(user.username).toEqual(username);
        expect(user.userType).toEqual(UserTypes.basic);
        expect(Object.keys(user.membershipInformation).sort()).toEqual(
            ['isPayingMember', 'pastMemberships', 'currentMembershipStartDate'].sort(),
        );
        expect(user.membershipInformation.isPayingMember).toEqual(true);
        expect(user.membershipInformation.pastMemberships).toEqual([]);
        expect(user.membershipInformation.currentMembershipStartDate).toBeDefined();
        expect(Object.keys(user.notifications).sort()).toEqual(['completeSoloStreaksReminder'].sort());
        expect(Object.keys(user.notifications.completeSoloStreaksReminder).sort()).toEqual(
            ['emailNotification', 'pushNotification', 'reminderTime'].sort(),
        );
        expect(user.notifications.completeSoloStreaksReminder.emailNotification).toEqual(false);
        expect(user.notifications.completeSoloStreaksReminder.pushNotification).toEqual(false);
        expect(user.notifications.completeSoloStreaksReminder.reminderTime).toEqual(null);
        expect(user.friends).toEqual([]);
        expect(user.timezone).toEqual(londonTimezone);
        expect(user.profileImages).toEqual({
            originalImageUrl: 'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
        });
        expect(Object.keys(user.stripe).sort()).toEqual(['customer', 'subscription'].sort());
        expect(user.pushNotificationToken).toBeNull();
        expect(user.createdAt).toEqual(expect.any(String));
        expect(user.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(user).sort()).toEqual(
            [
                '__v',
                '_id',
                'createdAt',
                'email',
                'friends',
                'membershipInformation',
                'notifications',
                'profileImages',
                'pushNotificationToken',
                'stripe',
                'timezone',
                'updatedAt',
                'userType',
                'username',
            ].sort(),
        );
    });
});
