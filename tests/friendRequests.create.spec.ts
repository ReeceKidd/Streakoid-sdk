import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { getFriend, friendUsername } from './setup/getFriend';
import { FriendRequestStatus } from '../src';
import { username } from './setup/environment';
import { getUserWithPushNotificationsEnabled } from './setup/getUserWithPushNotificationsEnabled';

jest.setTimeout(120000);

describe('GET /complete-solo-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let friendId: string;

    beforeEach(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            const user = await getUserWithPushNotificationsEnabled();
            userId = user._id;
            streakoid = await streakoidTest();
            const friend = await getFriend();
            friendId = friend._id;
        }
    });

    afterEach(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`creates friend request`, async () => {
        expect.assertions(11);

        const friendRequest = await streakoid.friendRequests.create({
            requesterId: userId,
            requesteeId: friendId,
        });

        expect(friendRequest._id).toEqual(expect.any(String));
        expect(friendRequest.requester._id).toBeDefined();
        expect(friendRequest.requester.username).toEqual(username);
        expect(Object.keys(friendRequest.requester).sort()).toEqual(['_id', 'username']);
        expect(friendRequest.requestee._id).toEqual(friendId);
        expect(friendRequest.requestee.username).toEqual(friendUsername);
        expect(Object.keys(friendRequest.requestee).sort()).toEqual(['_id', 'username']);
        expect(friendRequest.status).toEqual(FriendRequestStatus.pending);
        expect(friendRequest.createdAt).toEqual(expect.any(String));
        expect(friendRequest.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(friendRequest).sort()).toEqual(
            ['_id', 'requester', 'requestee', 'status', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`cannot send a friend request to someone who is already a friend`, async () => {
        expect.assertions(3);

        await streakoid.friendRequests.create({
            requesterId: friendId,
            requesteeId: userId,
        });

        await streakoid.users.friends.addFriend({
            userId,
            friendId,
        });

        try {
            await streakoid.friendRequests.create({
                requesterId: friendId,
                requesteeId: userId,
            });
        } catch (err) {
            expect(err.response.status).toEqual(400);
            expect(err.response.data.message).toEqual('Requestee is already a friend.');
            expect(err.response.data.code).toEqual('400-46');
        }
    });

    test(`cannot send a friend request twice in a row`, async () => {
        expect.assertions(3);

        await streakoid.friendRequests.create({
            requesterId: friendId,
            requesteeId: userId,
        });

        try {
            await streakoid.friendRequests.create({
                requesterId: friendId,
                requesteeId: userId,
            });
        } catch (err) {
            expect(err.response.status).toEqual(400);
            expect(err.response.data.message).toEqual('Friend request already sent.');
            expect(err.response.data.code).toEqual('400-65');
        }
    });
});
