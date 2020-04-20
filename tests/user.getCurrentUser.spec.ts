import { StreakoidFactory, londonTimezone } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { getFriend } from './setup/getFriend';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import UserTypes from '../src/userTypes';
import { username } from './setup/environment';

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
        expect.assertions(27);

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
        expect(user.membershipInformation.isPayingMember).toEqual(true);
        expect(user.membershipInformation.pastMemberships).toEqual([]);
        expect(user.membershipInformation.currentMembershipStartDate).toBeDefined();
        expect(Object.keys(user.pushNotifications).sort()).toEqual(
            ['newFollowerUpdates', 'teamStreakUpdates', 'customStreakReminders'].sort(),
        );
        expect(Object.keys(user.pushNotifications.newFollowerUpdates).sort()).toEqual(['enabled']);
        expect(user.pushNotifications.newFollowerUpdates.enabled).toEqual(true);
        expect(Object.keys(user.pushNotifications.teamStreakUpdates).sort()).toEqual(['enabled']);
        expect(user.pushNotifications.teamStreakUpdates.enabled).toEqual(true);
        expect(user.pushNotifications.customStreakReminders).toEqual([]);
        expect(user.timezone).toEqual(londonTimezone);
        expect(user.profileImages).toEqual({
            originalImageUrl: expect.any(String),
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
                'followers',
                'following',
                'friends',
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

    test(`if current user is following a user it returns the a populated following list`, async () => {
        expect.assertions(5);

        const friend = await getFriend();

        await streakoid.users.following.followUser({ userId, userToFollowId: friend._id });

        const user = await streakoid.user.getCurrentUser();

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
                'friends',
                'following',
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

    test(`if current user has a follower a user it returns the a populated follower list`, async () => {
        expect.assertions(6);

        const friend = await getFriend();

        await streakoid.users.following.followUser({ userId: friend._id, userToFollowId: userId });

        const user = await streakoid.user.getCurrentUser();

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
                'friends',
                'following',
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
