import { streakoidFactory, streakoidClient, londonTimezone } from "./streakoid";

describe("SDK groupMemberStreaks", () => {
  const streakoid = streakoidFactory(streakoidClient);

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getAll", () => {
    test("calls GET with correct URL when no query paramters are passed", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.groupMemberStreaks.getAll({});

      expect(streakoidClient.get).toBeCalledWith(`/v1/group-member-streaks?`);
    });

    test("calls GET with correct URL when userId query paramater is passed", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      const userId = "userId";

      await streakoid.groupMemberStreaks.getAll({ userId });

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/group-member-streaks?userId=${userId}&`
      );
    });

    test("calls GET with correct URL when completedToday query paramater is passed", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      const completedToday = true;

      await streakoid.groupMemberStreaks.getAll({ completedToday });

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/group-member-streaks?completedToday=true&`
      );
    });

    test("calls GET with correct URL when timezone query paramater is passed", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      const timezone = `Europe/London`;

      await streakoid.groupMemberStreaks.getAll({ timezone });

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/group-member-streaks?timezone=${timezone}&`
      );
    });

    test("calls GET with correct URL when active query paramater is passed", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      const active = true;

      await streakoid.groupMemberStreaks.getAll({ active });

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/group-member-streaks?active=${active}`
      );
    });
  });

  describe("getOne", () => {
    test("calls GET with correct URL", async () => {
      expect.assertions(1);

      streakoidClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.groupMemberStreaks.getOne("id");

      expect(streakoidClient.get).toBeCalledWith(`/v1/group-member-streaks/id`);
    });
  });

  describe("create", () => {
    test("calls POST with correct URL and  parmaters", async () => {
      expect.assertions(1);

      streakoidClient.post = jest.fn().mockResolvedValue(true);

      const userId = "userId";
      const groupStreakId = "groupStreakId";

      await streakoid.groupMemberStreaks.create({
        userId,
        groupStreakId
      });

      expect(streakoidClient.post).toBeCalledWith(`/v1/group-member-streaks`, {
        userId,
        groupStreakId
      });
    });
  });

  describe("deleteOne", () => {
    test("calls DELETE correct URL ", async () => {
      expect.assertions(1);
      streakoidClient.delete = jest.fn();

      await streakoid.groupMemberStreaks.deleteOne("id");

      expect(streakoidClient.delete).toBeCalledWith(
        `/v1/group-member-streaks/id`
      );
    });
  });
});
