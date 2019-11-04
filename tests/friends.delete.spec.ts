import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { getFriend } from './setup/getFriend';

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

    test(`user can delete a friend`, async () => {
        await streakoid.friendRequests.create({
            requesterId: friendId,
            requesteeId: userId,
        });

        await streakoid.users.friends.addFriend({ userId, friendId });
        expect.assertions(2);

        const friends = await streakoid.users.friends.deleteOne(userId, friendId);
        expect(friends.length).toEqual(0);

        const updatedFriend = await streakoid.users.getOne(friendId);

        expect(updatedFriend.friends.length).toEqual(0);
    });

    test(`can't delete a friend for a user that does not exist`, async () => {
        expect.assertions(3);

        try {
            await streakoid.users.friends.deleteOne('5d54487483233622e43270f8', friendId);
        } catch (err) {
            expect(err.response.status).toEqual(400);
            expect(err.response.data.message).toEqual('User does not exist.');
            expect(err.response.data.code).toEqual('400-21');
        }
    });

    test(`can't delete a friend who does not exist`, async () => {
        expect.assertions(3);

        try {
            await streakoid.users.friends.deleteOne(userId, '5d54487483233622e43270f8');
        } catch (err) {
            expect(err.response.status).toEqual(400);
            expect(err.response.data.message).toEqual('Friend does not exist.');
            expect(err.response.data.code).toEqual('400-22');
        }
    });
});
