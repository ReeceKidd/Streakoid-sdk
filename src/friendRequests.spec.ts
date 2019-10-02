import { streakoidFactory, streakoidClient } from "./streakoid";
import StreakStatus from "./StreakStatus";
import { FriendRequestStatus } from ".";

describe("SDK friendRequests", () => {
  const streakoid = streakoidFactory(streakoidClient);

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getAll", () => {
    test("calls GET with correct URL when no query paramters are passed", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.friendRequests.getAll({});

      expect(streakoidClient.get).toBeCalledWith(`/v1/friend-requests?`);
    });

    test("calls GET with correct URL when requesterId query paramater is passed", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      const requesterId = "requesterId";

      await streakoid.friendRequests.getAll({ requesterId });

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/friend-requests?requesterId=${requesterId}&`
      );
    });

    test("calls GET with correct URL when requesteeId query paramater is passed", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      const requesteeId = "requesteeId";

      await streakoid.friendRequests.getAll({ requesteeId });

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/friend-requests?requesteeId=requesteeId&`
      );
    });

    test("calls GET with correct URL when status query paramater is passed", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      const status = FriendRequestStatus.pending;

      await streakoid.friendRequests.getAll({ status });

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/friend-requests?status=${status}&`
      );
    });
  });

  describe("create", () => {
    test("calls POST with correct URL and  parmaters", async () => {
      expect.assertions(1);

      streakoidClient.post = jest.fn().mockResolvedValue(true);
      const requesteeId = "userId";
      const requesterId = "streakName";

      await streakoid.friendRequests.create({
        requesteeId,
        requesterId
      });

      expect(streakoidClient.post).toBeCalledWith(`/v1/friend-requests`, {
        requesterId,
        requesteeId
      });
    });
  });

  describe("deleteOne", () => {
    test("calls DELETE correct URL ", async () => {
      expect.assertions(1);
      streakoidClient.delete = jest.fn();

      await streakoid.friendRequests.deleteOne("id");

      expect(streakoidClient.delete).toBeCalledWith(`/v1/friend-requests/id`);
    });
  });
});
