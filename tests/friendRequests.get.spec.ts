import { StreakoidFactory } from '../src/streakoid';
import { getUser, streakoidTest, username } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { connectToDatabase } from './setup/connectToDatabase';
import { disconnectFromDatabase } from './setup/disconnectFromDatabase';
import { getFriend, friendUsername } from './setup/getFriend';
import { FriendRequestStatus } from '../src';

jest.setTimeout(120000);

describe('GET /complete-solo-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let friendId: string;

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await connectToDatabase();
            const user = await getUser();
            userId = user._id;
            streakoid = await streakoidTest();
            const friend = await getFriend();
            friendId = friend._id;
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await disconnectFromDatabase();
        }
    });

    test(`friend requests can be retreived with requesterId query parameter`, async () => {
        expect.assertions(12);

        await streakoid.friendRequests.create({
            requesteeId: userId,
            requesterId: friendId,
        });

        const friendRequests = await streakoid.friendRequests.getAll({
            requesterId: friendId,
        });
        expect(friendRequests.length).toBeGreaterThanOrEqual(1);

        const friendRequest = friendRequests[0];

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
