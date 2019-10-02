import { streakoid, londonTimezone } from "../src/streakoid";
import StreakStatus from "../src/StreakStatus";
import { FriendRequestStatus } from "../src";

const email = "friend-request-patch@gmail.com";
const username = "friend-request-patch";

const friendEmail = "friend-friend-patch@gmail.com";
const friendUsername = "friend-friend-request-patch@gmail.com";

jest.setTimeout(120000);

describe(`PATCH /friend-requests`, () => {
  let userId: string;
  let friendId: string;
  let friendRequestId: string;

  beforeAll(async () => {
    const user = await streakoid.users.create({
      username,
      email
    });
    userId = user._id;

    const friend = await streakoid.users.create({
      username: friendUsername,
      email: friendEmail
    });
    friendId = friend._id;

    const friendRequest = await streakoid.friendRequests.create({
      requesteeId: userId,
      requesterId: friendId
    });

    friendRequestId = friendRequest._id;
  });

  afterAll(async () => {
    await streakoid.users.deleteOne(userId);
    await streakoid.users.deleteOne(friendId);
    await streakoid.friendRequests.deleteOne(friendRequestId);
  });

  test(`friend request can be rejected.s`, async () => {
    expect.assertions(7);

    const rejectedFriendRequest = await streakoid.friendRequests.update({
      friendRequestId,
      updateData: { status: FriendRequestStatus.rejected }
    });

    expect(rejectedFriendRequest._id).toEqual(expect.any(String));
    expect(rejectedFriendRequest.requesteeId).toEqual(userId);
    expect(rejectedFriendRequest.requesterId).toEqual(friendId);
    expect(rejectedFriendRequest.status).toEqual(FriendRequestStatus.rejected);
    expect(rejectedFriendRequest.createdAt).toEqual(expect.any(String));
    expect(rejectedFriendRequest.updatedAt).toEqual(expect.any(String));
    expect(Object.keys(rejectedFriendRequest).sort()).toEqual(
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
