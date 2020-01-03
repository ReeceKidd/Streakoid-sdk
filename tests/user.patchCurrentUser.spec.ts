import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import UserTypes from '../src/userTypes';
import { username } from './setup/environment';
import Notifications from '../src/models/Notifications';
import { BadgeTypes } from '../src';

jest.setTimeout(120000);

describe('PATCH /user', () => {
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
        expect.assertions(30);

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
            teamStreakUpdates: {
                emailNotification: true,
                pushNotification: true,
            },
            badgeUpdates: {
                emailNotification: true,
                pushNotification: true,
            },
        };
        const updatedTimezone = 'Europe/Paris';
        const updatedPushNotificationToken = 'push-notification-token';
        const updatedHasCompletedIntroduction = true;
        const updateData = {
            email: updatedEmail,
            notifications: updatedNotifications,
            timezone: updatedTimezone,
            pushNotificationToken: updatedPushNotificationToken,
            hasCompletedIntroduction: updatedHasCompletedIntroduction,
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
        expect(updatedUser.badges).toEqual([]);
        expect(updatedUser.membershipInformation.isPayingMember).toEqual(true);
        expect(updatedUser.membershipInformation.pastMemberships).toEqual([]);
        expect(updatedUser.membershipInformation.currentMembershipStartDate).toBeDefined();
        expect(Object.keys(updatedUser.notifications).sort()).toEqual(
            ['completeStreaksReminder', 'friendRequest', 'teamStreakUpdates', 'badgeUpdates'].sort(),
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
        expect(Object.keys(updatedUser.notifications.teamStreakUpdates).sort()).toEqual([
            `emailNotification`,
            'pushNotification',
        ]);
        expect(updatedUser.notifications.teamStreakUpdates.emailNotification).toEqual(true);
        expect(updatedUser.notifications.teamStreakUpdates.pushNotification).toEqual(true);
        expect(Object.keys(updatedUser.notifications.badgeUpdates).sort()).toEqual([
            `emailNotification`,
            'pushNotification',
        ]);
        expect(updatedUser.notifications.badgeUpdates.emailNotification).toEqual(true);
        expect(updatedUser.notifications.badgeUpdates.pushNotification).toEqual(true);
        expect(updatedUser.timezone).toEqual(updatedTimezone);
        expect(updatedUser.profileImages).toEqual({
            originalImageUrl: 'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
        });
        expect(updatedUser.pushNotificationToken).toEqual(updatedPushNotificationToken);
        expect(updatedUser.hasCompletedIntroduction).toEqual(updatedHasCompletedIntroduction);
        expect(updatedUser.createdAt).toEqual(expect.any(String));
        expect(updatedUser.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(updatedUser).sort()).toEqual(
            [
                '_id',
                'createdAt',
                'email',
                'badges',
                'membershipInformation',
                'notifications',
                'profileImages',
                'pushNotificationToken',
                'hasCompletedIntroduction',
                'timezone',
                'updatedAt',
                'userType',
                'username',
            ].sort(),
        );
    });

    test(`when user has a badge on profile it gets populated after being patched.`, async () => {
        expect.assertions(38);

        // Adds user to challenge streak so they get a badge on their profile
        const name = 'Duolingo';
        const description = 'Everyday I must complete a duolingo lesson';
        const icon = 'duolingo';
        const color = 'blue';
        const levels = [{ level: 0, criteria: 'criteria' }];
        const { challenge } = await streakoid.challenges.create({
            name,
            description,
            icon,
            color,
            levels,
        });
        const challengeId = challenge._id;
        await streakoid.challengeStreaks.create({
            userId,
            challengeId,
        });

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
            teamStreakUpdates: {
                emailNotification: true,
                pushNotification: true,
            },
            badgeUpdates: {
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
        const updatedHasCompletedIntroduction = true;

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
        expect(updatedUser.badges.length).toEqual(1);
        const badge = updatedUser.badges[0];

        expect(badge._id).toEqual(expect.any(String));
        expect(badge.name).toEqual(name);
        expect(badge.description).toEqual(description);
        expect(badge.icon).toEqual(icon);
        expect(badge.badgeType).toEqual(BadgeTypes.challenge);
        expect(badge.createdAt).toEqual(expect.any(String));
        expect(badge.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(badge).sort()).toEqual(
            ['_id', 'name', 'description', 'icon', 'badgeType', 'createdAt', 'updatedAt', '__v'].sort(),
        );

        expect(updatedUser.membershipInformation.isPayingMember).toEqual(true);
        expect(updatedUser.membershipInformation.pastMemberships).toEqual([]);
        expect(updatedUser.membershipInformation.currentMembershipStartDate).toBeDefined();
        expect(Object.keys(updatedUser.notifications).sort()).toEqual(
            ['completeStreaksReminder', 'friendRequest', 'teamStreakUpdates', 'badgeUpdates'].sort(),
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
        expect(Object.keys(updatedUser.notifications.teamStreakUpdates).sort()).toEqual([
            `emailNotification`,
            'pushNotification',
        ]);
        expect(updatedUser.notifications.teamStreakUpdates.emailNotification).toEqual(true);
        expect(updatedUser.notifications.teamStreakUpdates.pushNotification).toEqual(true);
        expect(Object.keys(updatedUser.notifications.badgeUpdates).sort()).toEqual([
            `emailNotification`,
            'pushNotification',
        ]);
        expect(updatedUser.notifications.badgeUpdates.emailNotification).toEqual(true);
        expect(updatedUser.notifications.badgeUpdates.pushNotification).toEqual(true);
        expect(updatedUser.timezone).toEqual(updatedTimezone);
        expect(updatedUser.profileImages).toEqual({
            originalImageUrl: 'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
        });
        expect(updatedUser.pushNotificationToken).toEqual(updatedPushNotificationToken);
        expect(updatedUser.hasCompletedIntroduction).toEqual(updatedHasCompletedIntroduction);
        expect(updatedUser.createdAt).toEqual(expect.any(String));
        expect(updatedUser.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(updatedUser).sort()).toEqual(
            [
                '_id',
                'createdAt',
                'email',
                'badges',
                'membershipInformation',
                'notifications',
                'profileImages',
                'pushNotificationToken',
                'hasCompletedIntroduction',
                'timezone',
                'updatedAt',
                'userType',
                'username',
            ].sort(),
        );
    });
});
