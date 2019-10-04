import { streakoidFactory, streakoidClient } from "./streakoid";

describe("SDK friends", () => {
  const streakoid = streakoidFactory(streakoidClient);

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getAll", () => {
    test("calls GET with correct URL and userId", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.users.friends.getAll("userId");

      expect(streakoidClient.get).toBeCalledWith(`/v1/users/userId/friends`);
    });
  });

  describe("addFriend", () => {
    test("calls POST with correct URL and  parmaters", async () => {
      expect.assertions(1);
      streakoidClient.post = jest.fn().mockResolvedValue(true);

      const userId = "userId";
      const friendId = "friendId";

      await streakoid.users.friends.addFriend({ userId, friendId });

      expect(streakoidClient.post).toBeCalledWith(`/v1/users/userId/friends`, {
        friendId
      });
    });
  });

  describe("deleteOne", () => {
    test("calls PATCH with correct URL ", async () => {
      expect.assertions(1);
      streakoidClient.patch = jest.fn().mockResolvedValue(true);

      await streakoid.users.friends.deleteOne("userId", "friendId");

      expect(streakoidClient.patch).toBeCalledWith(
        `/v1/users/userId/friends/friendId`
      );
    });
  });
});
