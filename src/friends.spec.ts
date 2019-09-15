import { streakoidFactory } from "./streakoid";
import axiosClient from "./axiosClient";

describe("SDK friends", () => {
  const APPLICATION_URL = "streakoid.com";
  const streakoid = streakoidFactory(APPLICATION_URL);

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getAll", () => {
    test("calls GET with correct URL and userId", async () => {
      expect.assertions(1);
      axiosClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.users.friends.getAll("userId");

      expect(axiosClient.get).toBeCalledWith(`/v1/users/userId/friends`);
    });
  });

  describe("addFriend", () => {
    test("calls POST with correct URL and  parmaters", async () => {
      expect.assertions(1);
      axiosClient.post = jest.fn().mockResolvedValue(true);

      const userId = "userId";
      const friendId = "friendId";

      await streakoid.users.friends.addFriend({ userId, friendId });

      expect(axiosClient.post).toBeCalledWith(`/v1/users/userId/friends`, {
        friendId
      });
    });
  });

  describe("deleteOne", () => {
    test("calls DELETE correct URL ", async () => {
      expect.assertions(1);
      axiosClient.delete = jest.fn();

      await streakoid.users.friends.deleteOne("userId", "friendId");

      expect(axiosClient.delete).toBeCalledWith(
        `/v1/users/userId/friends/friendId`
      );
    });
  });
});
