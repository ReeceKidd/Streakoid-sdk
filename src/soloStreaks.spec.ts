import { streakoidFactory, streakoidClient, londonTimezone } from "./streakoid";

describe("SDK soloStreaks", () => {
  const streakoid = streakoidFactory(streakoidClient);

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getAll", () => {
    test("calls GET with correct URL when no query paramters are passed", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.soloStreaks.getAll({});

      expect(streakoidClient.get).toBeCalledWith(`/v1/solo-streaks?`);
    });

    test("calls GET with correct URL when userId query paramater is passed", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      const userId = "userId";

      await streakoid.soloStreaks.getAll({ userId });

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/solo-streaks?userId=${userId}&`
      );
    });

    test("calls GET with correct URL when completedToday query paramater is passed", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      const completedToday = true;

      await streakoid.soloStreaks.getAll({ completedToday });

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/solo-streaks?completedToday=true&`
      );
    });

    test("calls GET with correct URL when timezone query paramater is passed", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      const timezone = `Europe/London`;

      await streakoid.soloStreaks.getAll({ timezone });

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/solo-streaks?timezone=${timezone}&`
      );
    });

    test("calls GET with correct URL when active query paramater is passed", async () => {
      expect.assertions(1);
      streakoidClient.get = jest.fn().mockResolvedValue(true);

      const active = true;

      await streakoid.soloStreaks.getAll({ active });

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/solo-streaks?active=${active}`
      );
    });
  });

  describe("getOne", () => {
    test("calls GET with correct URL", async () => {
      expect.assertions(1);

      streakoidClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.soloStreaks.getOne("id");

      expect(streakoidClient.get).toBeCalledWith(`/v1/solo-streaks/id`);
    });
  });

  describe("create", () => {
    test("calls POST with correct URL and  parmaters", async () => {
      expect.assertions(1);

      streakoidClient.post = jest.fn().mockResolvedValue(true);
      const userId = "userId";
      const streakName = "streakName";
      const streakDescription = "streakDescription";

      await streakoid.soloStreaks.create({
        userId,
        streakName,
        streakDescription
      });

      expect(streakoidClient.post).toBeCalledWith(`/v1/solo-streaks`, {
        userId,
        streakName,
        streakDescription
      });
    });
  });

  describe("update", () => {
    test("calls PATCH with correct URL and  parmaters", async () => {
      expect.assertions(1);

      streakoidClient.patch = jest.fn().mockResolvedValue(true);
      const streakName = "name";
      const streakDescription = "description";
      const updateData = {
        streakName,
        streakDescription
      };

      await streakoid.soloStreaks.update({
        soloStreakId: "id",
        updateData
      });

      expect(streakoidClient.patch).toBeCalledWith(`/v1/solo-streaks/id`, {
        ...updateData
      });
    });
  });

  describe("deleteOne", () => {
    test("calls DELETE correct URL ", async () => {
      expect.assertions(1);
      streakoidClient.delete = jest.fn();

      await streakoid.soloStreaks.deleteOne("id");

      expect(streakoidClient.delete).toBeCalledWith(`/v1/solo-streaks/id`);
    });
  });
});
