import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import UserTypes from '../src/userTypes';
import { username } from './setup/environment';
import Notifications from '../src/models/Notifications';

jest.setTimeout(120000);

describe('PATCH /user', () => {
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

    test(`that request passes when updatedUser is patched with correct keys`, async () => {
        expect.assertions(22);

        const updatedEmail = 'email@gmail.com';
        const updatedNotifications: Notifications = {
            completeStreaksReminder: {
                emailNotification: true,
                pushNotification: true,
                reminderTime: 22,
            },
            friendRequest: {
                emailNotification: true,
                pushNotification: true,
            },
        };
        const updatedTimezone = 'Europe/Paris';
        const updatedPushNotificationToken = 'push-notification-token';
        const updateData = {
            email: updatedEmail,
            notifications: updatedNotifications,
            timezone: updatedTimezone,
            pushNotificationToken: updatedPushNotificationToken,
        };

        const updatedUser = await streakoid.user.updateCurrentUser({
            updateData,
        });

        expect(updatedUser._id).toEqual(expect.any(String));
        expect(updatedUser.email).toEqual(updatedEmail);
        expect(updatedUser.username).toEqual(username);
        expect(updatedUser.userType).toEqual(UserTypes.basic);
        expect(Object.keys(updatedUser.membershipInformation).sort()).toEqual(
            ['isPayingMember', 'pastMemberships', 'currentMembershipStartDate'].sort(),
        );
        expect(updatedUser.membershipInformation.isPayingMember).toEqual(true);
        expect(updatedUser.membershipInformation.pastMemberships).toEqual([]);
        expect(updatedUser.membershipInformation.currentMembershipStartDate).toBeDefined();
        expect(Object.keys(updatedUser.notifications).sort()).toEqual(
            ['completeStreaksReminder', 'friendRequest'].sort(),
        );
        expect(Object.keys(updatedUser.notifications.completeStreaksReminder).sort()).toEqual(
            ['emailNotification', 'pushNotification', 'reminderTime'].sort(),
        );
        expect(updatedUser.notifications.completeStreaksReminder.emailNotification).toEqual(true);
        expect(updatedUser.notifications.completeStreaksReminder.pushNotification).toEqual(true);
        expect(updatedUser.notifications.completeStreaksReminder.reminderTime).toEqual(22);
        expect(Object.keys(updatedUser.notifications.friendRequest).sort()).toEqual([
            `emailNotification`,
            'pushNotification',
        ]);
        expect(updatedUser.notifications.friendRequest.emailNotification).toEqual(true);
        expect(updatedUser.notifications.friendRequest.pushNotification).toEqual(true);
        expect(updatedUser.timezone).toEqual(updatedTimezone);
        expect(updatedUser.profileImages).toEqual({
            originalImageUrl: 'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
        });
        expect(updatedUser.pushNotificationToken).toEqual(updatedPushNotificationToken);
        expect(updatedUser.createdAt).toEqual(expect.any(String));
        expect(updatedUser.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(updatedUser).sort()).toEqual(
            [
                '_id',
                'createdAt',
                'email',
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
