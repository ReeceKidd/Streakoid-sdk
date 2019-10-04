import { streakoidFactory, streakoidClient } from "./streakoid";

describe("SDK completeSoloStreakTasks", () => {
  const applicationUrl = `streakoid.com`;
  const streakoid = streakoidFactory(streakoidClient, applicationUrl);

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getAll", () => {
    test("calls GET with correct URL when just userId is passed", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.completeGroupMemberStreakTasks.getAll({
        userId: "userId"
      });

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/complete-group-member-streak-tasks?userId=userId&`
      );
    });

    test("calls GET with correct URL when just groupStreakId is passed", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.completeGroupMemberStreakTasks.getAll({
        groupStreakId: "groupStreakId"
      });

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/complete-group-member-streak-tasks?groupStreakId=groupStreakId&`
      );
    });

    test("calls GET with correct URL when just groupMemberStreakId is passed", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.completeGroupMemberStreakTasks.getAll({
        groupMemberStreakId: "groupMemberStreakId"
      });

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/complete-group-member-streak-tasks?groupMemberStreakId=groupMemberStreakId`
      );
    });

    test("calls GET with correct URL when all query paramaters are passed", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.completeGroupMemberStreakTasks.getAll({
        userId: "userId",
        groupStreakId: "groupStreakId",
        groupMemberStreakId: "groupMemberStreakId"
      });

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/complete-group-member-streak-tasks?userId=userId&groupStreakId=groupStreakId&groupMemberStreakId=groupMemberStreakId`
      );
    });

    test("calls GET with correct URL when no query paramaters are passed", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.completeSoloStreakTasks.getAll({});

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/complete-solo-streak-tasks?`
      );
    });
  });

  describe("create", () => {
    test("calls POST with correct URL and  parmaters", async () => {
      expect.assertions(1);
      streakoidClient.post = jest.fn().mockResolvedValue(true);
      const userId = "userId";
      const groupStreakId = "groupStreakId";
      const groupMemberStreakId = "groupMemberStreakId";

      await streakoid.completeGroupMemberStreakTasks.create({
        userId,
        groupStreakId,
        groupMemberStreakId
      });

      expect(streakoidClient.post).toBeCalledWith(
        `/v1/complete-group-member-streak-tasks`,
        {
          userId,
          groupStreakId,
          groupMemberStreakId
        }
      );
    });
  });

  describe("deleteOne", () => {
    test("calls DELETE correct URL ", async () => {
      expect.assertions(1);
      streakoidClient.delete = jest.fn();

      await streakoid.completeGroupMemberStreakTasks.deleteOne("id");

      expect(streakoidClient.delete).toBeCalledWith(
        `/v1/complete-group-member-streak-tasks/id`
      );
    });
  });
});
