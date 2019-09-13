import axios from "axios";
import streakoidFactory from "./streakoid";

describe("SDK friends", () => {

  const APPLICATION_URL = "streakoid.com"
  const streakoid = streakoidFactory(APPLICATION_URL)

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getAll", () => {
    test("calls GET with correct URL and userId", async () => {
      expect.assertions(1);
      axios.get = jest.fn().mockResolvedValue(true)

      await streakoid.users.friends.getAll("userId");

      expect(axios.get).toBeCalledWith(
        `${APPLICATION_URL}/v1/users/userId/friends`
      );
    });
  });

  describe("addFriend", () => {
    test("calls POST with correct URL and  parmaters", async () => {
      expect.assertions(1);
      axios.post = jest.fn().mockResolvedValue(true)

      const userId = "userId";
      const friendId = "friendId";

      await streakoid.users.friends.addFriend({ userId, friendId });

      expect(axios.post).toBeCalledWith(
        `${APPLICATION_URL}/v1/users/userId/friends`,
        {
          friendId
        }
      );
    });
  });

  describe("deleteOne", () => {
    test("calls DELETE correct URL ", async () => {
      expect.assertions(1);
      axios.delete = jest.fn();

      await streakoid.users.friends.deleteOne("userId", "friendId");

      expect(axios.delete).toBeCalledWith(
        `${APPLICATION_URL}/v1/users/userId/friends/friendId`
      );
    });
  });
});
