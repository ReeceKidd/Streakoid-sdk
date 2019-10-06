import { streakoid } from '../src/streakoid';

const registeredEmail = 'delete-user@gmail.com';
const registeredUsername = 'delete-user';

const friendEmail = 'delete-friend@gmail.com';
const friendUsername = 'delete-friend';

jest.setTimeout(120000);

describe('DELETE /users/:userId/friends/:friendId', () => {
    let userId: string;
    let friendId: string;

    beforeAll(async () => {
        const userRegistrationResponse = await streakoid.users.create({
            username: registeredUsername,
            email: registeredEmail,
        });
        userId = userRegistrationResponse._id;

        const friendRegistrationResponse = await streakoid.users.create({
            username: friendUsername,
            email: friendEmail,
        });
        friendId = friendRegistrationResponse._id;

        await streakoid.friendRequests.create({
            requesterId: friendId,
            requesteeId: userId,
        });

        await streakoid.users.friends.addFriend({ userId, friendId });
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.users.deleteOne(friendId);
    });

    test(`user can delete a friend`, async () => {
        expect.assertions(1);

        const friends = await streakoid.users.friends.deleteOne(userId, friendId);
        expect(friends.length).toEqual(0);
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
