import { streakoid } from "../src/streakoid";

import { FriendRequestStatus } from "../src";

const email = "create-friend-request-user@gmail.com";
const username = "create-friend-request-user";

const friendEmail = "friend-email@gmail.com";
const friendUsername = "friend-request-username";

jest.setTimeout(120000);

describe("POST /friend-requests", () => {
  let userId: string;
  let friendId: string;
  let friendRequestId: string;

  beforeAll(async () => {
    const user = await streakoid.users.create({
      email,
      username
    });
    userId = user._id;

    const friend = await streakoid.users.create({
      email: friendEmail,
      username: friendUsername
    });
    friendId = friend._id;
  });

  afterAll(async () => {
    await streakoid.users.deleteOne(userId);
    await streakoid.users.deleteOne(friendId);
    await streakoid.friendRequests.deleteOne(friendRequestId);
  });

  test(`creates friend request`, async () => {
    expect.assertions(7);

    const friendRequest = await streakoid.friendRequests.create({
      requesterId: userId,
      requesteeId: friendId
    });

    friendRequestId = friendRequest._id;

    expect(friendRequest._id).toEqual(expect.any(String));
    expect(friendRequest.requesterId).toEqual(userId);
    expect(friendRequest.requesteeId).toEqual(friendId);
    expect(friendRequest.status).toEqual(FriendRequestStatus.pending);
    expect(friendRequest.createdAt).toEqual(expect.any(String));
    expect(friendRequest.updatedAt).toEqual(expect.any(String));
    expect(Object.keys(friendRequest).sort()).toEqual(
      [
        "_id",
        "requesterId",
        "requesteeId",
        "status",
        "createdAt",
        "updatedAt",
        "__v"
      ].sort()
    );
  });
});
