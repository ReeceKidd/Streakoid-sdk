import { streakoid } from '../src/streakoid';
import { FriendRequestStatus } from '../src';

const email = 'get-all-friend-request-user@gmail.com';
const username = 'get-all-friend-request-user';

const friendEmail = 'get-all-friend-email@gmail.com';
const friendUsername = 'get-all-friend-request-username';

jest.setTimeout(120000);

describe('GET /friend-requests', () => {
    let userId: string;
    let friendId: string;
    let friendRequestId: string;

    beforeAll(async () => {
        const user = await streakoid.users.create({
            email,
            username,
        });
        userId = user._id;

        const friend = await streakoid.users.create({
            email: friendEmail,
            username: friendUsername,
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

    test(`friend requests can be retreived with requesterId query parameter`, async () => {
        expect.assertions(12);

        const friendRequests = await streakoid.friendRequests.getAll({
            requesterId: friendId,
        });
        expect(friendRequests.length).toBeGreaterThanOrEqual(1);

        const friendRequest = friendRequests[0];

        friendRequestId = friendRequest._id;

        expect(friendRequest._id).toEqual(expect.any(String));
        expect(friendRequest.requestee._id).toEqual(userId);
        expect(friendRequest.requestee.username).toEqual(username);
        expect(Object.keys(friendRequest.requestee).sort()).toEqual(['_id', 'username']);
        expect(friendRequest.requester._id).toEqual(friendId);
        expect(friendRequest.requester.username).toEqual(friendUsername);
        expect(Object.keys(friendRequest.requester).sort()).toEqual(['_id', 'username']);
        expect(friendRequest.status).toEqual(FriendRequestStatus.pending);
        expect(friendRequest.createdAt).toEqual(expect.any(String));
        expect(friendRequest.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(friendRequest).sort()).toEqual(
            ['_id', 'requester', 'requestee', 'status', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`friend requests can be retreived with requesteeId query parameter`, async () => {
        expect.assertions(12);

        const friendRequests = await streakoid.friendRequests.getAll({
            requesteeId: userId,
        });
        expect(friendRequests.length).toBeGreaterThanOrEqual(1);

        const friendRequest = friendRequests[0];

        friendRequestId = friendRequest._id;

        expect(friendRequest._id).toEqual(expect.any(String));
        expect(friendRequest.requestee._id).toEqual(userId);
        expect(friendRequest.requestee.username).toEqual(username);
        expect(Object.keys(friendRequest.requestee).sort()).toEqual(['_id', 'username']);
        expect(friendRequest.requester._id).toEqual(friendId);
        expect(friendRequest.requester.username).toEqual(friendUsername);
        expect(Object.keys(friendRequest.requester).sort()).toEqual(['_id', 'username']);
        expect(friendRequest.status).toEqual(FriendRequestStatus.pending);
        expect(friendRequest.createdAt).toEqual(expect.any(String));
        expect(friendRequest.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(friendRequest).sort()).toEqual(
            ['_id', 'requester', 'requestee', 'status', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`pending friend requests can be retreived with status query parameter`, async () => {
        expect.assertions(12);

        const friendRequests = await streakoid.friendRequests.getAll({
            status: FriendRequestStatus.pending,
        });
        expect(friendRequests.length).toBeGreaterThanOrEqual(1);

        const friendRequest = friendRequests[0];

        friendRequestId = friendRequest._id;

        expect(friendRequest._id).toEqual(expect.any(String));
        expect(friendRequest.requestee._id).toEqual(userId);
        expect(friendRequest.requestee.username).toEqual(username);
        expect(Object.keys(friendRequest.requestee).sort()).toEqual(['_id', 'username']);
        expect(friendRequest.requester._id).toEqual(friendId);
        expect(friendRequest.requester.username).toEqual(friendUsername);
        expect(Object.keys(friendRequest.requester).sort()).toEqual(['_id', 'username']);
        expect(friendRequest.status).toEqual(FriendRequestStatus.pending);
        expect(friendRequest.createdAt).toEqual(expect.any(String));
        expect(friendRequest.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(friendRequest).sort()).toEqual(
            ['_id', 'requester', 'requestee', 'status', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });
});
