import { streakoidFactory, streakoidClient } from "./streakoid";
import StreakStatus from "./StreakStatus";

describe("SDK groupStreaks", () => {
  const streakoid = streakoidFactory(streakoidClient);

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getAll", () => {
    test("calls GET with correct URL when no query paramters are passed", async () => {
      expect.assertions(1);

      streakoidClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.groupStreaks.getAll({});

      expect(streakoidClient.get).toBeCalledWith(`/v1/group-streaks?`);
    });

    test("calls GET with correct URL when creatorId query paramater is passed", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      const creatorId = "memberId";

      await streakoid.groupStreaks.getAll({ creatorId });

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/group-streaks?creatorId=${creatorId}&`
      );
    });

    test("calls GET with correct URL when memberId query paramater is passed", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      const memberId = "memberId";

      await streakoid.groupStreaks.getAll({ memberId });

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/group-streaks?memberId=${memberId}&`
      );
    });

    test("calls GET with correct URL when timezone query paramater is passed", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      const timezone = `Europe/London`;

      await streakoid.groupStreaks.getAll({ timezone });

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/group-streaks?timezone=${timezone}&`
      );
    });

    test("calls GET with correct URL when status query paramater is passed", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      const status = StreakStatus.live;

      await streakoid.groupStreaks.getAll({ status });

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/group-streaks?status=${status}&`
      );
    });
  });

  describe("getOne", () => {
    test("calls GET with correct URL", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.groupStreaks.getOne("id");

      expect(streakoidClient.get).toBeCalledWith(`/v1/group-streaks/id`);
    });
  });

  describe("create", () => {
    test("calls POST with correct URL and  parmaters", async () => {
      expect.assertions(1);
      streakoidClient.post = jest.fn().mockResolvedValue(true);

      const creatorId = "abcdefgh";
      const streakName = "Followed our calorie level";
      const streakDescription = "Stuck to our recommended calorie level";

      const members: [] = [];

      await streakoid.groupStreaks.create({
        creatorId,
        streakName,
        streakDescription,
        members
      });

      expect(streakoidClient.post).toBeCalledWith(`/v1/group-streaks`, {
        creatorId,
        streakName,
        streakDescription,
        members
      });
    });
  });

  describe("update", () => {
    test("calls PATCH with correct URL and  parmaters", async () => {
      expect.assertions(1);
      streakoidClient.patch = jest.fn().mockResolvedValue(true);
      const streakName = "streakName";
      const streakDescription = "streakDescription";
      const numberOfMinutes = 30;
      const timezone = "Europe/London";
      const status = StreakStatus.archived;

      const updateData = {
        streakName,
        streakDescription,
        numberOfMinutes,
        timezone,
        status
      };

      await streakoid.groupStreaks.update({
        groupStreakId: "id",
        updateData
      });

      expect(streakoidClient.patch).toBeCalledWith(`/v1/group-streaks/id`, {
        ...updateData
      });
    });
  });

  describe("deleteOne", () => {
    test("calls DELETE correct URL ", async () => {
      expect.assertions(1);
      streakoidClient.delete = jest.fn();

      await streakoid.groupStreaks.deleteOne("id");

      expect(streakoidClient.delete).toBeCalledWith(`/v1/group-streaks/id`);
    });
  });
});
