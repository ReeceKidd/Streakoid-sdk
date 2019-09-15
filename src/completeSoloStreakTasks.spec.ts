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

      await streakoid.completeSoloStreakTasks.getAll({ userId: "userId" });

      expect(axiosClient.get).toBeCalledWith(
        `/v1/complete-solo-streak-tasks?userId=userId&`
      );
    });

    test("calls GET with correct URL when just streakId is passed", async () => {
      expect.assertions(1);
      axiosClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.completeSoloStreakTasks.getAll({ streakId: "streakId" });

      expect(axiosClient.get).toBeCalledWith(
        `/v1/complete-solo-streak-tasks?streakId=streakId`
      );
    });

    test("calls GET with correct URL when both userId and streakId is passed", async () => {
      expect.assertions(1);
      axiosClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.completeSoloStreakTasks.getAll({
        userId: "userId",
        streakId: "streakId"
      });

      expect(axiosClient.get).toBeCalledWith(
        `/v1/complete-solo-streak-tasks?userId=userId&streakId=streakId`
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
      const soloStreakId = "soloStreakId";
      const timezone = "timezone";

      await streakoid.completeSoloStreakTasks.create({
        userId,
        soloStreakId,
        timezone
      });

      expect(axiosClient.post).toBeCalledWith(
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
      axiosClient.delete = jest.fn().mockResolvedValue(true);

      await streakoid.completeSoloStreakTasks.deleteOne("id");

      expect(axiosClient.delete).toBeCalledWith(
        `/v1/complete-solo-streak-tasks/id`
      );
    });
  });
});
