import { streakoid } from "../src/streakoid";
import { UserTypes } from "../src/types";

const registeredEmail = "friends.add.user@gmail.com";
const registeredUsername = "friends-add-user";

const friendEmail = "friend.emai@gmail.com";
const friendUsername = "friend-username@gmail.com";

const secondFriendEmail = "second.friend@gmail.com";
const secondFriendUsername = "second-friend-username";

jest.setTimeout(120000);

describe("POST /users/:id/friends", () => {
  let userId: string;
  let friendId: string;
  let secondFriendId: string;

  beforeAll(async () => {
    const registrationResponse = await streakoid.users.create({
      username: registeredUsername,
      email: registeredEmail
    });
    userId = registrationResponse._id;

    const friendRegistrationResponse = await streakoid.users.create({
      username: friendUsername,
      email: friendEmail
    });
    friendId = friendRegistrationResponse._id;

    const secondFriendRegistration = await streakoid.users.create({
      username: secondFriendUsername,
      email: secondFriendEmail
    });
    secondFriendId = secondFriendRegistration._id;
  });

  afterAll(async () => {
    await streakoid.users.deleteOne(userId);
    await streakoid.users.deleteOne(friendId);
    await streakoid.users.deleteOne(secondFriendId);
  });

  test(`user can add a friend if they are not already on their friends list`, async () => {
    expect.assertions(12);

    const updatedUser = await streakoid.users.friends.addFriend({
      userId,
      friendId
    });

    expect(Object.keys(updatedUser.stripe)).toEqual([
      "customer",
      "subscription"
    ]);
    expect(updatedUser.stripe.subscription).toEqual(null);
    expect(updatedUser.stripe.customer).toEqual(null);
    expect(updatedUser._id).toEqual(expect.any(String));
    expect(updatedUser.username).toEqual(registeredUsername);
    expect(updatedUser.email).toEqual(registeredEmail);
    expect(updatedUser.createdAt).toEqual(expect.any(String));
    expect(updatedUser.updatedAt).toEqual(expect.any(String));
    expect(updatedUser.type).toEqual(UserTypes.basic);
    expect(updatedUser.friends.length).toEqual(1);
    expect(updatedUser.friends).toContain(friendId);
    expect(Object.keys(updatedUser).sort()).toEqual(
      [
        "stripe",
        "type",
        "friends",
        "_id",
        "username",
        "email",
        "createdAt",
        "updatedAt",
        "__v"
      ].sort()
    );
  });

  test(`user can't add the same friend twice`, async () => {
    expect.assertions(3);

    await streakoid.users.friends.addFriend({
      userId,
      friendId: secondFriendId
    });

    try {
      await streakoid.users.friends.addFriend({
        userId,
        friendId: secondFriendId
      });
    } catch (err) {
      expect(err.response.status).toEqual(400);
      expect(err.response.data.message).toEqual("User is already a friend.");
      expect(err.response.data.code).toEqual("400-20");
    }
  });

  test("can't send a request from a user who does not exist", async () => {
    expect.assertions(3);

    try {
      await streakoid.users.friends.addFriend({
        userId: "5d54487483233622e43270f8",
        friendId
      });
    } catch (err) {
      expect(err.response.status).toEqual(400);
      expect(err.response.data.message).toEqual("User does not exist.");
      expect(err.response.data.code).toEqual("400-18");
    }
  });

  test(`user can't add friend that doesn't exist`, async () => {
    expect.assertions(3);

    try {
      await streakoid.users.friends.addFriend({
        userId,
        friendId: "5d54487483233622e43270f8"
      });
    } catch (err) {
      expect(err.response.status).toEqual(400);
      expect(err.response.data.message).toEqual("Friend does not exist.");
      expect(err.response.data.code).toEqual("400-19");
    }
  });
});
