import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { getFriend, friendUsername } from './setup/getFriend';
import { FriendRequestStatus } from '../src';
import { username, originalImageUrl } from './setup/environment';

jest.setTimeout(120000);

describe('POST /user/friends', () => {
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

    test(`user can add a friend if they are not already on their friends list`, async () => {
        expect.assertions(25);

        await streakoid.friendRequests.create({
            requesterId: friendId,
            requesteeId: userId,
        });

        const updatedFriends = await streakoid.users.friends.addFriend({
            userId,
            friendId,
        });

        expect(updatedFriends.length).toEqual(1);

        const friend = updatedFriends[0];
        expect(friend.friendId).toBeDefined();
        expect(friend.username).toEqual(expect.any(String));
        expect(friend.profileImage).toEqual(originalImageUrl);
        expect(Object.keys(friend).sort()).toEqual(['friendId', 'username', 'profileImage'].sort());

        const updatedUser = await streakoid.users.getOne(userId);
        expect(updatedUser.friends[0].friendId).toBeDefined();
        expect(updatedUser.friends[0].username).toEqual(expect.any(String));
        expect(updatedUser.friends[0].profileImage).toEqual(originalImageUrl);
        expect(Object.keys(updatedUser.friends[0]).sort()).toEqual(['friendId', 'username', 'profileImage'].sort());

        const updatedFriend = await streakoid.users.getOne(userId);
        expect(updatedFriend.friends[0].friendId).toBeDefined();
        expect(updatedFriend.friends[0].username).toEqual(expect.any(String));
        expect(updatedFriend.friends[0].profileImage).toEqual(originalImageUrl);
        expect(Object.keys(updatedFriend.friends[0]).sort()).toEqual(['friendId', 'username', 'profileImage'].sort());

        expect(updatedUser.friends.length).toEqual(1);

        const friendRequests = await streakoid.friendRequests.getAll({
            requesteeId: userId,
            requesterId: friendId,
        });
        const acceptedFriendRequest = friendRequests[0];

        expect(acceptedFriendRequest._id).toEqual(expect.any(String));
        expect(acceptedFriendRequest.requestee._id).toBeDefined();
        expect(acceptedFriendRequest.requestee.username).toEqual(username);
        expect(Object.keys(acceptedFriendRequest.requestee).sort()).toEqual(['_id', 'username']);
        expect(acceptedFriendRequest.requester._id).toBeDefined();
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

        const secondFriend = await streakoid.users.create({
            username: 'secondfriend',
            email: 'secondfriend@gmail.com',
        });
        const secondFriendId = secondFriend._id;

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

        const newFriend = await streakoid.users.create({
            username: 'newfriend',
            email: 'newfriend@gmail.com',
        });
        const newFriendId = newFriend._id;
        try {
            await streakoid.users.friends.addFriend({
                userId: friendId,
                friendId: newFriendId,
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
