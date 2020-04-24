import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { username } from './setup/environment';
import { getFriend } from './setup/getFriend';
import UserTypes from '@streakoid/streakoid-models/lib/Types/UserTypes';
import AchievementTypes from '@streakoid/streakoid-models/lib/Types/AchievementTypes';

const updatedEmail = 'email@gmail.com';
const updatedTimezone = 'Europe/Paris';
const updatedPushNotificationToken = 'push-notification-token';

const updatedHasCompletedIntroduction = true;
const updateData = {
    email: updatedEmail,
    timezone: updatedTimezone,
    pushNotificationToken: updatedPushNotificationToken,
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
        expect.assertions(26);

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
        expect(updatedUser.followers).toEqual([]);
        expect(updatedUser.following).toEqual([]);
        expect(updatedUser.achievements).toEqual([]);
        expect(updatedUser.membershipInformation.isPayingMember).toEqual(true);
        expect(updatedUser.membershipInformation.pastMemberships).toEqual([]);
        expect(updatedUser.membershipInformation.currentMembershipStartDate).toBeDefined();
        expect(Object.keys(updatedUser.pushNotifications).sort()).toEqual(
            ['newFollowerUpdates', 'teamStreakUpdates', 'customStreakReminders', 'achievementUpdates'].sort(),
        );
        expect(Object.keys(updatedUser.pushNotifications.newFollowerUpdates).sort()).toEqual(['enabled']);
        expect(updatedUser.pushNotifications.newFollowerUpdates.enabled).toEqual(expect.any(Boolean));
        expect(Object.keys(updatedUser.pushNotifications.teamStreakUpdates).sort()).toEqual(['enabled']);
        expect(updatedUser.pushNotifications.teamStreakUpdates.enabled).toEqual(expect.any(Boolean));
        expect(Object.keys(updatedUser.pushNotifications.achievementUpdates).sort()).toEqual(['enabled']);
        expect(updatedUser.pushNotifications.achievementUpdates.enabled).toEqual(expect.any(Boolean));
        expect(updatedUser.pushNotifications.customStreakReminders).toEqual([]);
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
                'membershipInformation',
                'profileImages',
                'followers',
                'following',
                'achievements',
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
                'followers',
                'following',
                'achievements',
                'membershipInformation',
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
                'followers',
                'following',
                'achievements',
                'membershipInformation',
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

    test(`if current user has an achievement it returns the current user with populated achievements`, async () => {
        expect.assertions(6);

        const achievementName = '100 Hundred Days';
        const achievementDescription = '100 Day solo streak';
        await streakoid.achievements.create({
            achievementType: AchievementTypes.oneHundredDaySoloStreak,
            name: achievementName,
            description: achievementDescription,
        });

        const soloStreak = await streakoid.soloStreaks.create({ userId, streakName: 'Reading' });
        const soloStreakId = soloStreak._id;

        await streakoid.soloStreaks.update({
            soloStreakId,
            updateData: {
                currentStreak: {
                    ...soloStreak.currentStreak,
                    numberOfDaysInARow: 99,
                },
            },
        });

        await streakoid.completeSoloStreakTasks.create({
            userId,
            soloStreakId,
        });

        const user = await streakoid.user.updateCurrentUser({ updateData });

        expect(user.achievements.length).toEqual(1);

        const achievement = user.achievements[0];
        expect(achievement.achievementType).toEqual(AchievementTypes.oneHundredDaySoloStreak);
        expect(achievement.name).toEqual(achievementName);
        expect(achievement.description).toEqual(achievementDescription);
        expect(Object.keys(achievement).sort()).toEqual(
            ['_id', 'achievementType', 'name', 'description', 'createdAt', 'updatedAt', '__v'].sort(),
        );

        expect(Object.keys(user).sort()).toEqual(
            [
                '_id',
                'createdAt',
                'email',
                'followers',
                'following',
                'achievements',
                'membershipInformation',
                'pushNotifications',
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
