import { streakoidFactory, streakoidClient, londonTimezone } from "./streakoid";

describe("SDK groupMemberStreaks", () => {
  const streakoid = streakoidFactory(streakoidClient);

  afterEach(() => {
    jest.resetAllMocks();
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
