import { streakoidFactory } from "./streakoid";
import axiosClient from "./axiosClient";

describe("SDK completeSoloStreakTasks", () => {
  const APPLICATION_URL = "streakoid.com";
  const streakoid = streakoidFactory(APPLICATION_URL);

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getAll", () => {
    test("calls GET with correct URL when just userId is passed", async () => {
      expect.assertions(1);
      axiosClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.completeGroupMemberStreakTasks.getAll({
        userId: "userId"
      });

      expect(axiosClient.get).toBeCalledWith(
        `/v1/complete-group-member-streak-tasks?userId=userId&`
      );
    });

    test("calls GET with correct URL when just groupStreakId is passed", async () => {
      expect.assertions(1);
      axiosClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.completeGroupMemberStreakTasks.getAll({
        groupStreakId: "groupStreakId"
      });

      expect(axiosClient.get).toBeCalledWith(
        `/v1/complete-group-member-streak-tasks?groupStreakId=groupStreakId&`
      );
    });

    test("calls GET with correct URL when just groupMemberStreakId is passed", async () => {
      expect.assertions(1);
      axiosClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.completeGroupMemberStreakTasks.getAll({
        groupMemberStreakId: "groupMemberStreakId"
      });

      expect(axiosClient.get).toBeCalledWith(
        `/v1/complete-group-member-streak-tasks?groupMemberStreakId=groupMemberStreakId`
      );
    });

    test("calls GET with correct URL when all query paramaters are passed", async () => {
      expect.assertions(1);
      axiosClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.completeGroupMemberStreakTasks.getAll({
        userId: "userId",
        groupStreakId: "groupStreakId",
        groupMemberStreakId: "groupMemberStreakId"
      });

      expect(axiosClient.get).toBeCalledWith(
        `/v1/complete-group-member-streak-tasks?userId=userId&groupStreakId=groupStreakId&groupMemberStreakId=groupMemberStreakId`
      );
    });

    test("calls GET with correct URL when no query paramaters are passed", async () => {
      expect.assertions(1);
      axiosClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.completeSoloStreakTasks.getAll({});

      expect(axiosClient.get).toBeCalledWith(`/v1/complete-solo-streak-tasks?`);
    });
  });

  describe("create", () => {
    test("calls POST with correct URL and  parmaters", async () => {
      expect.assertions(1);
      axiosClient.post = jest.fn().mockResolvedValue(true);
      const userId = "userId";
      const groupStreakId = "groupStreakId";
      const groupMemberStreakId = "groupMemberStreakId";
      const timezone = "timezone";

      await streakoid.completeGroupMemberStreakTasks.create({
        userId,
        groupStreakId,
        groupMemberStreakId,
        timezone
      });

      expect(axiosClient.post).toBeCalledWith(
        `/v1/complete-group-member-streak-tasks`,
        {
          userId,
          groupStreakId,
          groupMemberStreakId
        },
        {
          headers: {
            "x-timezone": timezone
          }
        }
      );
    });
  });

  describe("deleteOne", () => {
    test("calls DELETE correct URL ", async () => {
      expect.assertions(1);
      axiosClient.delete = jest.fn();

      await streakoid.completeGroupMemberStreakTasks.deleteOne("id");

      expect(axiosClient.delete).toBeCalledWith(
        `/v1/complete-group-member-streak-tasks/id`
      );
    });
  });
});
