import { StreakoidFactory } from '../src/streakoid';
import { FriendRequestStatus } from '../src';
import { getUser, streakoidTest, username } from './setup/streakoidTest';

const friendEmail = 'friend-friend-patch@gmail.com';
const friendUsername = 'friend-friend-request-patch@gmail.com';

jest.setTimeout(120000);

describe(`PATCH /friend-requests`, () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let friendId: string;
    let friendRequestId: string;

    beforeAll(async () => {
        const user = await getUser();
        userId = user._id;
        streakoid = await streakoidTest();

        const friend = await streakoid.users.create({
            username: friendUsername,
            email: friendEmail,
        });
        friendId = friend._id;

        const friendRequest = await streakoid.friendRequests.create({
            requesteeId: userId,
            requesterId: friendId,
        });

        friendRequestId = friendRequest._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.users.deleteOne(friendId);
        await streakoid.friendRequests.deleteOne(friendRequestId);
    });

    test(`friend request can be rejected.`, async () => {
        expect.assertions(11);

        const rejectedFriendRequest = await streakoid.friendRequests.update({
            friendRequestId,
            updateData: { status: FriendRequestStatus.rejected },
        });

        expect(rejectedFriendRequest._id).toEqual(expect.any(String));
        expect(rejectedFriendRequest.requestee._id).toEqual(userId);
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
