import { streakoidFactory, streakoidClient } from "./streakoid";

describe("SDK completeSoloStreakTasks", () => {
  const APPLICATION_URL = "streakoid.com";
  const streakoid = streakoidFactory(streakoidClient);

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getAll", () => {
    test("calls GET with correct URL when just userId is passed", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.completeSoloStreakTasks.getAll({ userId: "userId" });

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/complete-solo-streak-tasks?userId=userId&`
      );
    });

    test("calls GET with correct URL when just streakId is passed", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.completeSoloStreakTasks.getAll({ streakId: "streakId" });

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/complete-solo-streak-tasks?streakId=streakId`
      );
    });

    test("calls GET with correct URL when both userId and streakId is passed", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.completeSoloStreakTasks.getAll({
        userId: "userId",
        streakId: "streakId"
      });

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/complete-solo-streak-tasks?userId=userId&streakId=streakId`
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
      const soloStreakId = "soloStreakId";
      const timezone = "timezone";

      await streakoid.completeSoloStreakTasks.create({
        userId,
        soloStreakId,
        timezone
      });

      expect(streakoidClient.post).toBeCalledWith(
        `/v1/complete-solo-streak-tasks`,
        {
          userId,
          soloStreakId
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
      streakoidClient.delete = jest.fn().mockResolvedValue(true);

      await streakoid.completeSoloStreakTasks.deleteOne("id");

      expect(streakoidClient.delete).toBeCalledWith(
        `/v1/complete-solo-streak-tasks/id`
      );
    });
  });
});
