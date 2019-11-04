import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { getFriend, friendUsername } from './setup/getFriend';
import { FriendRequestStatus } from '../src';
import { username } from './setup/environment';

jest.setTimeout(120000);

describe('GET /complete-solo-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let friendId: string;

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            const user = await getPayingUser();
            userId = user._id;
            streakoid = await streakoidTest();
            const friend = await getFriend();
            friendId = friend._id;
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`friend request can be rejected.`, async () => {
        expect.assertions(11);

        const friendRequest = await streakoid.friendRequests.create({
            requesteeId: userId,
            requesterId: friendId,
        });

        const rejectedFriendRequest = await streakoid.friendRequests.update({
            friendRequestId: friendRequest._id,
            updateData: { status: FriendRequestStatus.rejected },
        });

        expect(rejectedFriendRequest._id).toEqual(expect.any(String));
        expect(rejectedFriendRequest.requestee._id).toBeDefined();
        expect(rejectedFriendRequest.requestee.username).toEqual(username);
        expect(Object.keys(rejectedFriendRequest.requestee).sort()).toEqual(['_id', 'username']);
        expect(rejectedFriendRequest.requester._id).toEqual(friendId);
        expect(rejectedFriendRequest.requester.username).toEqual(friendUsername);
        expect(Object.keys(rejectedFriendRequest.requester).sort()).toEqual(['_id', 'username']);
        expect(rejectedFriendRequest.status).toEqual(FriendRequestStatus.rejected);
        expect(rejectedFriendRequest.createdAt).toEqual(expect.any(String));
        expect(rejectedFriendRequest.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(rejectedFriendRequest).sort()).toEqual(
            ['_id', 'requester', 'requestee', 'status', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });
});
