import { streakoidFactory } from "./streakoid";
import axiosClient from "./axiosClient";

describe("SDK groupStreaks", () => {
  const APPLICATION_URL = "streakoid.com";
  const streakoid = streakoidFactory(APPLICATION_URL);

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getAll", () => {
    test("calls GET with correct URL when no query paramters are passed", async () => {
      expect.assertions(1);

      axiosClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.groupStreaks.getAll({});

      expect(axiosClient.get).toBeCalledWith(`/v1/group-streaks?`);
    });

    test("calls GET with correct URL when creatorId query paramater is passed", async () => {
      expect.assertions(1);
      axiosClient.get = jest.fn().mockResolvedValue(true);

      const creatorId = "memberId";

      await streakoid.groupStreaks.getAll({ creatorId });

      expect(axiosClient.get).toBeCalledWith(
        `/v1/group-streaks?creatorId=${creatorId}&`
      );
    });

    test("calls GET with correct URL when memberId query paramater is passed", async () => {
      expect.assertions(1);
      axiosClient.get = jest.fn().mockResolvedValue(true);

      const memberId = "memberId";

      await streakoid.groupStreaks.getAll({ memberId });

      expect(axiosClient.get).toBeCalledWith(
        `/v1/group-streaks?memberId=${memberId}&`
      );
    });

    test("calls GET with correct URL when timezone query paramater is passed", async () => {
      expect.assertions(1);
      axiosClient.get = jest.fn().mockResolvedValue(true);

      const timezone = `Europe/London`;

      await streakoid.groupStreaks.getAll({ timezone });

      expect(axiosClient.get).toBeCalledWith(
        `/v1/group-streaks?timezone=${timezone}`
      );
    });
  });

  describe("getOne", () => {
    test("calls GET with correct URL", async () => {
      expect.assertions(1);
      axiosClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.groupStreaks.getOne("id");

      expect(axiosClient.get).toBeCalledWith(`/v1/group-streaks/id`);
    });
  });

  describe("create", () => {
    test("calls POST with correct URL and  parmaters", async () => {
      expect.assertions(1);
      axiosClient.post = jest.fn().mockResolvedValue(true);

      const creatorId = "abcdefgh";
      const streakName = "Followed our calorie level";
      const streakDescription = "Stuck to our recommended calorie level";

      const members: [] = [];
      const timezone = "Europe/London";

      await streakoid.groupStreaks.create({
        creatorId,
        streakName,
        timezone,
        streakDescription,
        members
      });

      expect(axiosClient.post).toBeCalledWith(
        `/v1/group-streaks`,
        {
          creatorId,
          streakName,
          streakDescription,
          members
        },
        {
          headers: {
            "x-timezone": timezone
          }
        }
      );
    });
  });

  describe("update", () => {
    test("calls PATCH with correct URL and  parmaters", async () => {
      expect.assertions(1);
      axiosClient.patch = jest.fn().mockResolvedValue(true);
      const streakName = "streakName";
      const streakDescription = "streakDescription";
      const numberOfMinutes = 30;
      const timezone = "timezone";

      const updateData = {
        streakName,
        streakDescription,
        numberOfMinutes
      };

      await streakoid.groupStreaks.update({
        groupStreakId: "id",
        timezone,
        updateData
      });

      expect(axiosClient.patch).toBeCalledWith(
        `/v1/group-streaks/id`,
        {
          ...updateData
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

      await streakoid.groupStreaks.deleteOne("id");

      expect(axiosClient.delete).toBeCalledWith(`/v1/group-streaks/id`);
    });
  });
});
