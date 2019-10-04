import { streakoidFactory, streakoidClient } from "./streakoid";

describe("SDK streakTrackingEvents", () => {
  const streakoid = streakoidFactory(streakoidClient);

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getAll", () => {
    test("calls GET with correct URL when no query paramters are passed", async () => {
      expect.assertions(1);

      streakoidClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.streakTrackingEvents.getAll({});

      expect(streakoidClient.get).toBeCalledWith(`/v1/streak-tracking-events?`);
    });

    test("calls GET with correct URL when type query paramater is passed", async () => {
      expect.assertions(1);

      streakoidClient.get = jest.fn().mockResolvedValue(true);

      const type = "typeId";

      await streakoid.streakTrackingEvents.getAll({ type });

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/streak-tracking-events?type=${type}&`
      );
    });

    test("calls GET with correct URL when userId query paramater is passed", async () => {
      expect.assertions(1);

      streakoidClient.get = jest.fn().mockResolvedValue(true);

      const userId = "userId";

      await streakoid.streakTrackingEvents.getAll({ userId });

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/streak-tracking-events?userId=userId&`
      );
    });

    test("calls GET with correct URL when streakId query paramater is passed", async () => {
      expect.assertions(1);

      streakoidClient.get = jest.fn().mockResolvedValue(true);

      const streakId = `streakId`;

      await streakoid.streakTrackingEvents.getAll({ streakId });

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/streak-tracking-events?streakId=${streakId}`
      );
    });
  });

  describe("getOne", () => {
    test("calls GET with correct URL", async () => {
      expect.assertions(1);

      streakoidClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.streakTrackingEvents.getOne("id");

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/streak-tracking-events/id`
      );
    });
  });

  describe("create", () => {
    test("calls POST with correct URL and  parmaters", async () => {
      expect.assertions(1);

      streakoidClient.post = jest.fn().mockResolvedValue(true);
      const type = "lost-streak";
      const streakId = "streakId";
      const userId = "userId";

      await streakoid.streakTrackingEvents.create({ type, streakId, userId });

      expect(streakoidClient.post).toBeCalledWith(
        `/v1/streak-tracking-events`,
        {
          type,
          streakId,
          userId
        }
      );
    });
  });

  describe("deleteOne", () => {
    test("calls DELETE correct URL ", async () => {
      expect.assertions(1);
      streakoidClient.delete = jest.fn();

      await streakoid.streakTrackingEvents.deleteOne("id");

      expect(streakoidClient.delete).toBeCalledWith(
        `/v1/streak-tracking-events/id`
      );
    });
  });
});
