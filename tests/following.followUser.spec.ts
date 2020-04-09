import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { getFriend } from './setup/getFriend';
import { ActivityFeedItemTypes } from '../src';

jest.setTimeout(120000);

describe('GET /users/:userId/users/:userToFollowId', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let userToFollowId: string;

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            const user = await getPayingUser();
            userId = user._id;
            streakoid = await streakoidTest();
            const userToFollow = await getFriend();
            userToFollowId = userToFollow._id;
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`can follow another user and followed user activity gets created`, async () => {
        expect.assertions(11);

        const following = await streakoid.users.following.followUser({ userId, userToFollowId });
        expect(following.length).toEqual(1);
        expect(following[0]).toEqual(String(userToFollowId));

        const updatedUserWhoIsFollowing = await streakoid.users.getOne(userId);
        expect(updatedUserWhoIsFollowing.followers).toEqual([]);
        expect(updatedUserWhoIsFollowing.following).toEqual([
            { userId: expect.any(String), username: expect.any(String), profileImage: expect.any(String) },
        ]);

        const updatedUserWhoIsBeingFollowed = await streakoid.users.getOne(userToFollowId);
        expect(updatedUserWhoIsBeingFollowed.followers).toEqual([
            { userId: expect.any(String), username: expect.any(String), profileImage: expect.any(String) },
        ]);
        expect(updatedUserWhoIsBeingFollowed.following).toEqual([]);

        try {
            const activityFeedItems = await streakoid.activityFeedItems.getAll({
                activityFeedItemType: ActivityFeedItemTypes.followedUser,
            });
            const createdAccountActivityFeedItem = activityFeedItems.activityFeedItems[0];
            expect(createdAccountActivityFeedItem.activityFeedItemType).toEqual(ActivityFeedItemTypes.followedUser);
            expect(createdAccountActivityFeedItem.userId).toEqual(userId);
            expect(createdAccountActivityFeedItem.subjectId).toEqual(userToFollowId);
            expect(createdAccountActivityFeedItem._id).toEqual(expect.any(String));
            expect(Object.keys(createdAccountActivityFeedItem).sort()).toEqual(
                ['_id', 'createdAt', 'updatedAt', 'activityFeedItemType', 'subjectId', 'userId', '__v'].sort(),
            );
        } catch (err) {
            console.log(err);
        }
    });
});
