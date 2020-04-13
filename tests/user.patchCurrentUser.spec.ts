import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import UserTypes from '../src/userTypes';
import { username } from './setup/environment';
import Notifications from '../src/models/Notifications';
import { BadgeTypes, PushNotificationTypes, StreakTypes } from '../src';
import { getFriend } from './setup/getFriend';
import { CustomStreakReminder, CompleteAllStreaksReminder } from '../src/models/PushNotifications';

const updatedEmail = 'email@gmail.com';
const updatedNotifications: Notifications = {
    completeStreaksReminder: {
        emailNotification: true,
        pushNotification: true,
        reminderHour: 22,
        reminderMinute: 15,
    },
    newFollowerUpdates: {
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
const customStreakReminder: CustomStreakReminder = {
    type: PushNotificationTypes.customStreakReminder,
    expoId: 'customStreakReminderId',
    reminderHour: 10,
    reminderMinute: 5,
    streakId: 'streakId',
    streakType: StreakTypes.solo,
};
const completeAllStreksReminder: CompleteAllStreaksReminder = {
    type: PushNotificationTypes.completeAllStreaksReminder,
    expoId: 'completeAllStreakReminder',
    reminderHour: 10,
    reminderMinute: 5,
};
const updatedPushNotifications = [customStreakReminder, completeAllStreksReminder];
const updatedHasCompletedIntroduction = true;
const updateData = {
    email: updatedEmail,
    notifications: updatedNotifications,
    timezone: updatedTimezone,
    pushNotificationToken: updatedPushNotificationToken,
    pushNotifications: updatedPushNotifications,
    hasCompletedIntroduction: updatedHasCompletedIntroduction,
};

jest.setTimeout(120000);

describe('PATCH /user', () => {
    let streakoid: StreakoidFactory;
    let userId: string;

    beforeEach(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            const user = await getPayingUser();
            userId = user._id;
            streakoid = await streakoidTest();
        }
    });

    afterEach(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`that request passes when updatedUser is patched with correct keys`, async () => {
        expect.assertions(42);

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
        expect(updatedUser.followers).toEqual([]);
        expect(updatedUser.following).toEqual([]);
        expect(updatedUser.membershipInformation.isPayingMember).toEqual(true);
        expect(updatedUser.membershipInformation.pastMemberships).toEqual([]);
        expect(updatedUser.membershipInformation.currentMembershipStartDate).toBeDefined();
        expect(Object.keys(updatedUser.notifications).sort()).toEqual(
            ['completeStreaksReminder', 'newFollowerUpdates', 'teamStreakUpdates', 'badgeUpdates'].sort(),
        );
        expect(Object.keys(updatedUser.notifications.completeStreaksReminder).sort()).toEqual(
            ['emailNotification', 'pushNotification', 'reminderHour', 'reminderMinute'].sort(),
        );
        expect(updatedUser.notifications.completeStreaksReminder.emailNotification).toEqual(true);
        expect(updatedUser.notifications.completeStreaksReminder.pushNotification).toEqual(true);
        expect(updatedUser.notifications.completeStreaksReminder.reminderHour).toEqual(22);
        expect(updatedUser.notifications.completeStreaksReminder.reminderMinute).toEqual(15);
        expect(Object.keys(updatedUser.notifications.newFollowerUpdates).sort()).toEqual([
            `emailNotification`,
            'pushNotification',
        ]);
        expect(updatedUser.notifications.newFollowerUpdates.emailNotification).toEqual(true);
        expect(updatedUser.notifications.newFollowerUpdates.pushNotification).toEqual(true);
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
        expect(updatedUser.pushNotifications.length).toEqual(2);
        const updatedUserCustomStreakReminder = updatedUser.pushNotifications.find(
            notification => notification.type === PushNotificationTypes.customStreakReminder,
        );
        if (updatedUserCustomStreakReminder) {
            expect(updatedUserCustomStreakReminder.expoId).toEqual(customStreakReminder.expoId);
            expect(updatedUserCustomStreakReminder.reminderHour).toEqual(customStreakReminder.reminderHour);
            expect(updatedUserCustomStreakReminder.reminderMinute).toEqual(customStreakReminder.reminderMinute);
            expect(updatedUserCustomStreakReminder.type).toEqual(PushNotificationTypes.customStreakReminder);
        }
        const updatedCompleteAllStreakReminder = updatedUser.pushNotifications.find(
            notification => notification.type === PushNotificationTypes.completeAllStreaksReminder,
        );
        if (updatedCompleteAllStreakReminder) {
            expect(updatedCompleteAllStreakReminder.expoId).toEqual(completeAllStreksReminder.expoId);
            expect(updatedCompleteAllStreakReminder.reminderHour).toEqual(completeAllStreksReminder.reminderHour);
            expect(updatedCompleteAllStreakReminder.reminderMinute).toEqual(completeAllStreksReminder.reminderMinute);
            expect(updatedCompleteAllStreakReminder.type).toEqual(PushNotificationTypes.completeAllStreaksReminder);
        }
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
                'followers',
                'following',
                'friends',
                'pushNotificationToken',
                'pushNotifications',
                'hasCompletedIntroduction',
                'timezone',
                'updatedAt',
                'userType',
                'username',
            ].sort(),
        );
    });

    test(`if current user has a badge on their profile it returns a populated badge.`, async () => {
        expect.assertions(10);

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

        const updatedUser = await streakoid.user.updateCurrentUser({
            updateData,
        });

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
                'pushNotifications',
                'hasCompletedIntroduction',
                'timezone',
                'followers',
                'following',
                'friends',
                'updatedAt',
                'userType',
                'username',
            ].sort(),
        );
    });

    test(`if current user is following a user it returns the a populated following list`, async () => {
        expect.assertions(6);

        const friend = await getFriend();

        await streakoid.users.following.followUser({ userId, userToFollowId: friend._id });

        const user = await streakoid.user.updateCurrentUser({ updateData });

        expect(user.following.length).toEqual(1);

        const following = user.following[0];

        expect(following.username).toEqual(expect.any(String));
        expect(following.userId).toEqual(expect.any(String));
        expect(following.profileImage).toEqual(expect.any(String));
        expect(Object.keys(following).sort()).toEqual(['userId', 'username', 'profileImage'].sort());

        expect(Object.keys(user).sort()).toEqual(
            [
                '_id',
                'createdAt',
                'email',
                'badges',
                'followers',
                'friends',
                'following',
                'membershipInformation',
                'notifications',
                'profileImages',
                'pushNotificationToken',
                'pushNotifications',
                'hasCompletedIntroduction',
                'timezone',
                'updatedAt',
                'userType',
                'username',
            ].sort(),
        );
    });

    test(`if current user has a follower a user it returns the a populated follower list`, async () => {
        expect.assertions(6);

        const friend = await getFriend();

        await streakoid.users.following.followUser({ userId: friend._id, userToFollowId: userId });

        const user = await streakoid.user.updateCurrentUser({ updateData });

        expect(user.followers.length).toEqual(1);

        const follower = user.followers[0];
        expect(follower.username).toEqual(expect.any(String));
        expect(follower.userId).toEqual(expect.any(String));
        expect(follower.profileImage).toEqual(expect.any(String));
        expect(Object.keys(follower).sort()).toEqual(['userId', 'username', 'profileImage'].sort());

        expect(Object.keys(user).sort()).toEqual(
            [
                '_id',
                'createdAt',
                'email',
                'badges',
                'followers',
                'friends',
                'following',
                'membershipInformation',
                'notifications',
                'profileImages',
                'pushNotificationToken',
                'pushNotifications',
                'hasCompletedIntroduction',
                'timezone',
                'updatedAt',
                'userType',
                'username',
            ].sort(),
        );
    });
});
