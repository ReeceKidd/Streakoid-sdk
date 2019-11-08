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
        expect(friendRequest.requestee._id).toBeDefined();
        expect(friendRequest.requestee.username).toEqual(username);
        expect(Object.keys(friendRequest.requestee).sort()).toEqual(['_id', 'username']);
        expect(friendRequest.requester._id).toBeDefined();
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
        expect(friendRequest.requestee._id).toBeDefined();
        expect(friendRequest.requestee.username).toEqual(username);
        expect(Object.keys(friendRequest.requestee).sort()).toEqual(['_id', 'username']);
        expect(friendRequest.requester._id).toBeDefined();
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
        expect(friendRequest.requestee._id).toBeDefined();
        expect(friendRequest.requestee.username).toEqual(username);
        expect(Object.keys(friendRequest.requestee).sort()).toEqual(['_id', 'username']);
        expect(friendRequest.requester._id).toBeDefined();
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
