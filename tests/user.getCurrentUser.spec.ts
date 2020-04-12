import { StreakoidFactory, londonTimezone } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { getFriend } from './setup/getFriend';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import UserTypes from '../src/userTypes';
import { username } from './setup/environment';
import { BadgeTypes } from '../src';

jest.setTimeout(120000);

describe('GET /user', () => {
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

    test(`retreives current user`, async () => {
        expect.assertions(33);

        const user = await streakoid.user.getCurrentUser();

        expect(user._id).toEqual(expect.any(String));
        expect(user.email).toBeDefined();
        expect(user.username).toEqual(username);
        expect(user.userType).toEqual(UserTypes.basic);
        expect(Object.keys(user.membershipInformation).sort()).toEqual(
            ['isPayingMember', 'pastMemberships', 'currentMembershipStartDate'].sort(),
        );
        expect(user.followers).toEqual([]);
        expect(user.following).toEqual([]);
        expect(user.friends).toEqual([]);
        expect(user.badges).toEqual([]);
        expect(user.membershipInformation.isPayingMember).toEqual(true);
        expect(user.membershipInformation.pastMemberships).toEqual([]);
        expect(user.membershipInformation.currentMembershipStartDate).toBeDefined();
        expect(Object.keys(user.notifications).sort()).toEqual(
            ['completeStreaksReminder', 'newFollowerUpdates', 'teamStreakUpdates', 'badgeUpdates'].sort(),
        );
        expect(Object.keys(user.notifications.completeStreaksReminder).sort()).toEqual(
            ['emailNotification', 'pushNotification', 'reminderHour'].sort(),
        );
        expect(user.notifications.completeStreaksReminder.emailNotification).toEqual(true);
        expect(user.notifications.completeStreaksReminder.pushNotification).toEqual(true);
        expect(user.notifications.completeStreaksReminder.reminderHour).toEqual(21);
        expect(Object.keys(user.notifications.newFollowerUpdates).sort()).toEqual([
            `emailNotification`,
            'pushNotification',
        ]);
        expect(user.notifications.newFollowerUpdates.emailNotification).toEqual(true);
        expect(user.notifications.newFollowerUpdates.pushNotification).toEqual(true);
        expect(Object.keys(user.notifications.teamStreakUpdates).sort()).toEqual([
            `emailNotification`,
            'pushNotification',
        ]);
        expect(user.notifications.teamStreakUpdates.emailNotification).toEqual(true);
        expect(user.notifications.teamStreakUpdates.pushNotification).toEqual(true);
        expect(Object.keys(user.notifications.badgeUpdates).sort()).toEqual([`emailNotification`, 'pushNotification']);
        expect(user.notifications.badgeUpdates.emailNotification).toEqual(true);
        expect(user.notifications.badgeUpdates.pushNotification).toEqual(true);
        expect(user.timezone).toEqual(londonTimezone);
        expect(user.profileImages).toEqual({
            originalImageUrl: 'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
        });
        expect(user.pushNotificationToken).toBeNull();
        expect(user.hasCompletedIntroduction).toEqual(false);
        expect(user.createdAt).toEqual(expect.any(String));
        expect(user.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(user).sort()).toEqual(
            [
                '_id',
                'createdAt',
                'email',
                'badges',
                'followers',
                'following',
                'friends',
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

    test(`if current user has a badge on their profile it returns a populated badge`, async () => {
        expect.assertions(41);

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

        const user = await streakoid.user.getCurrentUser();

        expect(user._id).toEqual(expect.any(String));
        expect(user.email).toBeDefined();
        expect(user.username).toEqual(username);
        expect(user.userType).toEqual(UserTypes.basic);
        expect(Object.keys(user.membershipInformation).sort()).toEqual(
            ['isPayingMember', 'pastMemberships', 'currentMembershipStartDate'].sort(),
        );
        expect(user.followers).toEqual([]);
        expect(user.following).toEqual([]);
        expect(user.friends).toEqual([]);
        expect(user.badges.length).toEqual(1);
        const badge = user.badges[0];

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
        expect(user.membershipInformation.isPayingMember).toEqual(true);
        expect(user.membershipInformation.pastMemberships).toEqual([]);
        expect(user.membershipInformation.currentMembershipStartDate).toBeDefined();
        expect(Object.keys(user.notifications).sort()).toEqual(
            ['completeStreaksReminder', 'newFollowerUpdates', 'teamStreakUpdates', 'badgeUpdates'].sort(),
        );
        expect(Object.keys(user.notifications.completeStreaksReminder).sort()).toEqual(
            ['emailNotification', 'pushNotification', 'reminderHour'].sort(),
        );
        expect(user.notifications.completeStreaksReminder.emailNotification).toEqual(true);
        expect(user.notifications.completeStreaksReminder.pushNotification).toEqual(true);
        expect(user.notifications.completeStreaksReminder.reminderHour).toEqual(21);
        expect(Object.keys(user.notifications.newFollowerUpdates).sort()).toEqual([
            `emailNotification`,
            'pushNotification',
        ]);
        expect(user.notifications.newFollowerUpdates.emailNotification).toEqual(true);
        expect(user.notifications.newFollowerUpdates.pushNotification).toEqual(true);
        expect(Object.keys(user.notifications.teamStreakUpdates).sort()).toEqual([
            `emailNotification`,
            'pushNotification',
        ]);
        expect(user.notifications.teamStreakUpdates.emailNotification).toEqual(true);
        expect(user.notifications.teamStreakUpdates.pushNotification).toEqual(true);
        expect(user.notifications.badgeUpdates.emailNotification).toEqual(true);
        expect(user.notifications.badgeUpdates.pushNotification).toEqual(true);
        expect(Object.keys(user.notifications.badgeUpdates).sort()).toEqual([`emailNotification`, 'pushNotification']);
        expect(user.timezone).toEqual(londonTimezone);
        expect(user.profileImages).toEqual({
            originalImageUrl: 'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
        });
        expect(user.pushNotificationToken).toBeNull();
        expect(user.hasCompletedIntroduction).toEqual(false);
        expect(user.createdAt).toEqual(expect.any(String));
        expect(user.updatedAt).toEqual(expect.any(String));
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
                'hasCompletedIntroduction',
                'timezone',
                'updatedAt',
                'userType',
                'username',
            ].sort(),
        );
    });

    test(`if current user is following a user it returns the a populated following list`, async () => {
        expect.assertions(37);

        const friend = await getFriend();

        await streakoid.users.following.followUser({ userId, userToFollowId: friend._id });

        const user = await streakoid.user.getCurrentUser();

        expect(user._id).toEqual(expect.any(String));
        expect(user.email).toBeDefined();
        expect(user.username).toEqual(username);
        expect(user.userType).toEqual(UserTypes.basic);
        expect(Object.keys(user.membershipInformation).sort()).toEqual(
            ['isPayingMember', 'pastMemberships', 'currentMembershipStartDate'].sort(),
        );
        expect(user.followers).toEqual([]);
        expect(user.friends).toEqual([]);
        expect(user.badges).toEqual([]);
        expect(user.following.length).toEqual(1);

        const following = user.following[0];
        expect(following.username).toEqual(expect.any(String));
        expect(following.userId).toEqual(expect.any(String));
        expect(following.profileImage).toEqual(expect.any(String));
        expect(Object.keys(following).sort()).toEqual(['userId', 'username', 'profileImage'].sort());

        expect(user.membershipInformation.isPayingMember).toEqual(true);
        expect(user.membershipInformation.pastMemberships).toEqual([]);
        expect(user.membershipInformation.currentMembershipStartDate).toBeDefined();
        expect(Object.keys(user.notifications).sort()).toEqual(
            ['completeStreaksReminder', 'newFollowerUpdates', 'teamStreakUpdates', 'badgeUpdates'].sort(),
        );
        expect(Object.keys(user.notifications.completeStreaksReminder).sort()).toEqual(
            ['emailNotification', 'pushNotification', 'reminderHour'].sort(),
        );
        expect(user.notifications.completeStreaksReminder.emailNotification).toEqual(true);
        expect(user.notifications.completeStreaksReminder.pushNotification).toEqual(true);
        expect(user.notifications.completeStreaksReminder.reminderHour).toEqual(21);
        expect(Object.keys(user.notifications.newFollowerUpdates).sort()).toEqual([
            `emailNotification`,
            'pushNotification',
        ]);
        expect(user.notifications.newFollowerUpdates.emailNotification).toEqual(true);
        expect(user.notifications.newFollowerUpdates.pushNotification).toEqual(true);
        expect(Object.keys(user.notifications.teamStreakUpdates).sort()).toEqual([
            `emailNotification`,
            'pushNotification',
        ]);
        expect(user.notifications.teamStreakUpdates.emailNotification).toEqual(true);
        expect(user.notifications.teamStreakUpdates.pushNotification).toEqual(true);
        expect(user.notifications.badgeUpdates.emailNotification).toEqual(true);
        expect(user.notifications.badgeUpdates.pushNotification).toEqual(true);
        expect(Object.keys(user.notifications.badgeUpdates).sort()).toEqual([`emailNotification`, 'pushNotification']);
        expect(user.timezone).toEqual(londonTimezone);
        expect(user.profileImages).toEqual({
            originalImageUrl: 'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
        });
        expect(user.pushNotificationToken).toBeNull();
        expect(user.hasCompletedIntroduction).toEqual(false);
        expect(user.createdAt).toEqual(expect.any(String));
        expect(user.updatedAt).toEqual(expect.any(String));
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
                'hasCompletedIntroduction',
                'timezone',
                'updatedAt',
                'userType',
                'username',
            ].sort(),
        );
    });

    test(`if current user has a follower a user it returns the a populated follower list`, async () => {
        expect.assertions(37);

        const friend = await getFriend();

        await streakoid.users.following.followUser({ userId: friend._id, userToFollowId: userId });

        const user = await streakoid.user.getCurrentUser();

        expect(user._id).toEqual(expect.any(String));
        expect(user.email).toBeDefined();
        expect(user.username).toEqual(username);
        expect(user.userType).toEqual(UserTypes.basic);
        expect(Object.keys(user.membershipInformation).sort()).toEqual(
            ['isPayingMember', 'pastMemberships', 'currentMembershipStartDate'].sort(),
        );
        expect(user.following).toEqual([]);
        expect(user.friends).toEqual([]);
        expect(user.badges).toEqual([]);
        expect(user.followers.length).toEqual(1);

        const follower = user.followers[0];
        expect(follower.username).toEqual(expect.any(String));
        expect(follower.userId).toEqual(expect.any(String));
        expect(follower.profileImage).toEqual(expect.any(String));
        expect(Object.keys(follower).sort()).toEqual(['userId', 'username', 'profileImage'].sort());

        expect(user.membershipInformation.isPayingMember).toEqual(true);
        expect(user.membershipInformation.pastMemberships).toEqual([]);
        expect(user.membershipInformation.currentMembershipStartDate).toBeDefined();
        expect(Object.keys(user.notifications).sort()).toEqual(
            ['completeStreaksReminder', 'newFollowerUpdates', 'teamStreakUpdates', 'badgeUpdates'].sort(),
        );
        expect(Object.keys(user.notifications.completeStreaksReminder).sort()).toEqual(
            ['emailNotification', 'pushNotification', 'reminderHour'].sort(),
        );
        expect(user.notifications.completeStreaksReminder.emailNotification).toEqual(true);
        expect(user.notifications.completeStreaksReminder.pushNotification).toEqual(true);
        expect(user.notifications.completeStreaksReminder.reminderHour).toEqual(21);
        expect(Object.keys(user.notifications.newFollowerUpdates).sort()).toEqual([
            `emailNotification`,
            'pushNotification',
        ]);
        expect(user.notifications.newFollowerUpdates.emailNotification).toEqual(true);
        expect(user.notifications.newFollowerUpdates.pushNotification).toEqual(true);
        expect(Object.keys(user.notifications.teamStreakUpdates).sort()).toEqual([
            `emailNotification`,
            'pushNotification',
        ]);
        expect(user.notifications.teamStreakUpdates.emailNotification).toEqual(true);
        expect(user.notifications.teamStreakUpdates.pushNotification).toEqual(true);
        expect(user.notifications.badgeUpdates.emailNotification).toEqual(true);
        expect(user.notifications.badgeUpdates.pushNotification).toEqual(true);
        expect(Object.keys(user.notifications.badgeUpdates).sort()).toEqual([`emailNotification`, 'pushNotification']);
        expect(user.timezone).toEqual(londonTimezone);
        expect(user.profileImages).toEqual({
            originalImageUrl: 'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
        });
        expect(user.pushNotificationToken).toBeNull();
        expect(user.hasCompletedIntroduction).toEqual(false);
        expect(user.createdAt).toEqual(expect.any(String));
        expect(user.updatedAt).toEqual(expect.any(String));
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
                'hasCompletedIntroduction',
                'timezone',
                'updatedAt',
                'userType',
                'username',
            ].sort(),
        );
    });
});
