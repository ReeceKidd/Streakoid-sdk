import { StreakoidFactory } from '../src/streakoid';
import { getUser, streakoidTest } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { connectToDatabase } from './setup/connectToDatabase';
import { disconnectFromDatabase } from './setup/disconnectFromDatabase';
import { getFriend, friendUsername } from './setup/getFriend';

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

    test(`user can get a list of friends`, async () => {
        expect.assertions(4);

        await streakoid.friendRequests.create({
            requesterId: friendId,
            requesteeId: userId,
        });

        await streakoid.users.friends.addFriend({ userId, friendId });

        const friends = await streakoid.users.friends.getAll(userId);
        expect(friends.length).toEqual(1);

        const friend = friends[0];
        expect(friend.friendId).toEqual(friendId);
        expect(friend.username).toEqual(friendUsername);
        expect(Object.keys(friend).sort()).toEqual(['username', 'friendId'].sort());
    });

    test(`throws GetFriendsUserDoesNotExist error when user does not exist`, async () => {
        expect.assertions(3);

        try {
            await streakoid.users.friends.getAll('5d616c43e1dc592ce8bd487b');
        } catch (err) {
            expect(err.response.status).toEqual(400);
            expect(err.response.data.message).toEqual('User does not exist.');
            expect(err.response.data.code).toEqual('400-23');
        }
    });
});
