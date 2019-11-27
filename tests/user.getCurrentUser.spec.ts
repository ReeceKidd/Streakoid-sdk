import { StreakoidFactory, londonTimezone } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import UserTypes from '../src/userTypes';
import { username } from './setup/environment';

jest.setTimeout(120000);

describe('GET /user', () => {
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
        expect.assertions(26);

        const user = await streakoid.user.getCurrentUser();

        expect(user._id).toEqual(expect.any(String));
        expect(user.email).toBeDefined();
        expect(user.username).toEqual(username);
        expect(user.userType).toEqual(UserTypes.basic);
        expect(Object.keys(user.membershipInformation).sort()).toEqual(
            ['isPayingMember', 'pastMemberships', 'currentMembershipStartDate'].sort(),
        );
        expect(user.badges).toEqual([]);
        expect(user.membershipInformation.isPayingMember).toEqual(true);
        expect(user.membershipInformation.pastMemberships).toEqual([]);
        expect(user.membershipInformation.currentMembershipStartDate).toBeDefined();
        expect(Object.keys(user.notifications).sort()).toEqual(
            ['completeStreaksReminder', 'friendRequest', 'teamStreakUpdates'].sort(),
        );
        expect(Object.keys(user.notifications.completeStreaksReminder).sort()).toEqual(
            ['emailNotification', 'pushNotification', 'reminderTime'].sort(),
        );
        expect(user.notifications.completeStreaksReminder.emailNotification).toEqual(false);
        expect(user.notifications.completeStreaksReminder.pushNotification).toEqual(false);
        expect(user.notifications.completeStreaksReminder.reminderTime).toEqual(21);
        expect(Object.keys(user.notifications.friendRequest).sort()).toEqual([`emailNotification`, 'pushNotification']);
        expect(user.notifications.friendRequest.emailNotification).toEqual(false);
        expect(user.notifications.friendRequest.pushNotification).toEqual(false);
        expect(Object.keys(user.notifications.teamStreakUpdates).sort()).toEqual([
            `emailNotification`,
            'pushNotification',
        ]);
        expect(user.notifications.teamStreakUpdates.emailNotification).toEqual(false);
        expect(user.notifications.teamStreakUpdates.pushNotification).toEqual(false);
        expect(user.timezone).toEqual(londonTimezone);
        expect(user.profileImages).toEqual({
            originalImageUrl: 'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
        });
        expect(user.pushNotificationToken).toBeNull();
        expect(user.createdAt).toEqual(expect.any(String));
        expect(user.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(user).sort()).toEqual(
            [
                '_id',
                'createdAt',
                'email',
                'badges',
                'membershipInformation',
                'notifications',
                'profileImages',
                'pushNotificationToken',
                'timezone',
                'updatedAt',
                'userType',
                'username',
            ].sort(),
        );
    });
});
