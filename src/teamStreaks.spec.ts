import { streakoidFactory, streakoidClient } from "./streakoid";
import StreakStatus from "./StreakStatus";

describe("SDK TeamStreaks", () => {
  const streakoid = streakoidFactory(streakoidClient);

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getAll", () => {
    test("calls GET with correct URL when no query paramters are passed", async () => {
      expect.assertions(1);

      streakoidClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.teamStreaks.getAll({});

      expect(streakoidClient.get).toBeCalledWith(`/v1/team-streaks?`);
    });

    test("calls GET with correct URL when creatorId query paramater is passed", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      const creatorId = "memberId";

      await streakoid.teamStreaks.getAll({ creatorId });

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/team-streaks?creatorId=${creatorId}&`
      );
    });

    test("calls GET with correct URL when memberId query paramater is passed", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      const memberId = "memberId";

      await streakoid.teamStreaks.getAll({ memberId });

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/team-streaks?memberId=${memberId}&`
      );
    });

    test("calls GET with correct URL when timezone query paramater is passed", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      const timezone = `Europe/London`;

      await streakoid.teamStreaks.getAll({ timezone });

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/team-streaks?timezone=${timezone}&`
      );
    });

    test("calls GET with correct URL when status query paramater is passed", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      const status = StreakStatus.live;

      await streakoid.teamStreaks.getAll({ status });

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/team-streaks?status=${status}&`
      );
    });
  });

  describe("getOne", () => {
    test("calls GET with correct URL", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.teamStreaks.getOne("id");

      expect(streakoidClient.get).toBeCalledWith(`/v1/team-streaks/id`);
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

      await streakoid.teamStreaks.create({
        creatorId,
        streakName,
        streakDescription,
        members
      });

      expect(streakoidClient.post).toBeCalledWith(`/v1/team-streaks`, {
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

      await streakoid.teamStreaks.update({
        teamStreakId: "id",
        updateData
      });

      expect(streakoidClient.patch).toBeCalledWith(`/v1/team-streaks/id`, {
        ...updateData
      });
    });
  });

  describe("deleteOne", () => {
    test("calls DELETE correct URL ", async () => {
      expect.assertions(1);
      streakoidClient.delete = jest.fn();

      await streakoid.teamStreaks.deleteOne("id");

      expect(streakoidClient.delete).toBeCalledWith(`/v1/team-streaks/id`);
    });
  });
});
