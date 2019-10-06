import { streakoid } from '../src/streakoid';
import { FriendRequestStatus } from '../src';

const email = 'friends.add.user@gmail.com';
const username = 'friends-add-user';

const friendEmail = 'friend.emai@gmail.com';
const friendUsername = 'friend-username@gmail.com';

const secondFriendEmail = 'second.friend@gmail.com';
const secondFriendUsername = 'second-friend-username';

jest.setTimeout(120000);

describe('POST /users/:id/friends', () => {
    let userId: string;
    let friendId: string;
    let friendRequestId: string;
    let secondFriendRequestId: string;
    let secondFriendId: string;

    beforeAll(async () => {
        const user = await streakoid.users.create({
            username,
            email,
        });
        userId = user._id;

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

        const secondFriend = await streakoid.users.create({
            username: secondFriendUsername,
            email: secondFriendEmail,
        });
        secondFriendId = secondFriend._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.users.deleteOne(friendId);
        await streakoid.users.deleteOne(secondFriendId);
        await streakoid.friendRequests.deleteOne(friendRequestId);
        await streakoid.friendRequests.deleteOne(secondFriendRequestId);
    });

    test(`user can add a friend if they are not already on their friends list`, async () => {
        expect.assertions(22);

        const updatedFriends = await streakoid.users.friends.addFriend({
            userId,
            friendId,
        });

        expect(updatedFriends.length).toEqual(1);

        const friend = updatedFriends[0];
        expect(friend.friendId).toEqual(friendId);
        expect(friend.username).toEqual(expect.any(String));
        expect(Object.keys(friend).sort()).toEqual(['friendId', 'username'].sort());

        const updatedUser = await streakoid.users.getOne(userId);
        expect(updatedUser.friends[0].friendId).toEqual(friendId);
        expect(updatedUser.friends[0].username).toEqual(expect.any(String));
        expect(Object.keys(updatedUser.friends[0]).sort()).toEqual(['friendId', 'username'].sort());

        const updatedFriend = await streakoid.users.getOne(userId);
        expect(updatedFriend.friends[0].friendId).toEqual(friendId);
        expect(updatedFriend.friends[0].username).toEqual(expect.any(String));
        expect(Object.keys(updatedFriend.friends[0]).sort()).toEqual(['friendId', 'username'].sort());

        expect(updatedUser.friends.length).toEqual(1);

        const friendRequests = await streakoid.friendRequests.getAll({
            requesteeId: userId,
            requesterId: friendId,
        });
        const acceptedFriendRequest = friendRequests[0];

        expect(acceptedFriendRequest._id).toEqual(expect.any(String));
        expect(acceptedFriendRequest.requestee._id).toEqual(userId);
        expect(acceptedFriendRequest.requestee.username).toEqual(username);
        expect(Object.keys(acceptedFriendRequest.requestee).sort()).toEqual(['_id', 'username']);
        expect(acceptedFriendRequest.requester._id).toEqual(friendId);
        expect(acceptedFriendRequest.requester.username).toEqual(friendUsername);
        expect(Object.keys(acceptedFriendRequest.requester).sort()).toEqual(['_id', 'username']);
        expect(acceptedFriendRequest.status).toEqual(FriendRequestStatus.accepted);
        expect(acceptedFriendRequest.createdAt).toEqual(expect.any(String));
        expect(acceptedFriendRequest.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(acceptedFriendRequest).sort()).toEqual(
            ['_id', 'requester', 'requestee', 'status', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`user can't add the same friend twice`, async () => {
        expect.assertions(3);

        await streakoid.friendRequests.create({
            requesterId: secondFriendId,
            requesteeId: userId,
        });

        await streakoid.users.friends.addFriend({
            userId,
            friendId: secondFriendId,
        });

        try {
            await streakoid.users.friends.addFriend({
                userId,
                friendId: secondFriendId,
            });
        } catch (err) {
            expect(err.response.status).toEqual(400);
            expect(err.response.data.message).toEqual('User is already a friend.');
            expect(err.response.data.code).toEqual('400-20');
        }
    });

    test(`user can't add a friend without a friend request`, async () => {
        expect.assertions(3);

        try {
            await streakoid.users.friends.addFriend({
                userId: friendId,
                friendId: secondFriendId,
            });
        } catch (err) {
            expect(err.response.status).toEqual(400);
            expect(err.response.data.message).toEqual('Friend request must exist to add friend.');
            expect(err.response.data.code).toEqual('400-48');
        }
    });

    test("can't send a request from a user who does not exist", async () => {
        expect.assertions(3);

        try {
            await streakoid.users.friends.addFriend({
                userId: '5d54487483233622e43270f8',
                friendId,
            });
        } catch (err) {
            expect(err.response.status).toEqual(400);
            expect(err.response.data.message).toEqual('User does not exist.');
            expect(err.response.data.code).toEqual('400-18');
        }
    });

    test(`user can't add friend that doesn't exist`, async () => {
        expect.assertions(3);

        try {
            await streakoid.users.friends.addFriend({
                userId,
                friendId: '5d54487483233622e43270f8',
            });
        } catch (err) {
            expect(err.response.status).toEqual(400);
            expect(err.response.data.message).toEqual('Friend does not exist.');
            expect(err.response.data.code).toEqual('400-19');
        }
    });
});
