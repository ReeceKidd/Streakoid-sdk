import axios from "axios";
import { streakoidFactory } from "./streakoid";

describe("SDK streakTrackingEvents", () => {
  const APPLICATION_URL = "streakoid.com";
  const streakoid = streakoidFactory(APPLICATION_URL);

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getAll", () => {
    test("calls GET with correct URL when no query paramters are passed", async () => {
      expect.assertions(1);

      axios.get = jest.fn().mockResolvedValue(true);

      await streakoid.streakTrackingEvents.getAll({});

      expect(axios.get).toBeCalledWith(
        `${APPLICATION_URL}/v1/streak-tracking-events?`
      );
    });

    test("calls GET with correct URL when type query paramater is passed", async () => {
      expect.assertions(1);

      axios.get = jest.fn().mockResolvedValue(true);

      const type = "typeId";

      await streakoid.streakTrackingEvents.getAll({ type });

      expect(axios.get).toBeCalledWith(
        `${APPLICATION_URL}/v1/streak-tracking-events?type=${type}&`
      );
    });

    test("calls GET with correct URL when userId query paramater is passed", async () => {
      expect.assertions(1);

      axios.get = jest.fn().mockResolvedValue(true);

      const userId = "userId";

      await streakoid.streakTrackingEvents.getAll({ userId });

      expect(axios.get).toBeCalledWith(
        `${APPLICATION_URL}/v1/streak-tracking-events?userId=userId&`
      );
    });

    test("calls GET with correct URL when streakId query paramater is passed", async () => {
      expect.assertions(1);

      axios.get = jest.fn().mockResolvedValue(true);

      const streakId = `streakId`;

      await streakoid.streakTrackingEvents.getAll({ streakId });

      expect(axios.get).toBeCalledWith(
        `${APPLICATION_URL}/v1/streak-tracking-events?streakId=${streakId}`
      );
    });
  });

  describe("getOne", () => {
    test("calls GET with correct URL", async () => {
      expect.assertions(1);

      axios.get = jest.fn().mockResolvedValue(true);

      await streakoid.streakTrackingEvents.getOne("id");

      expect(axios.get).toBeCalledWith(
        `${APPLICATION_URL}/v1/streak-tracking-events/id`
      );
    });
  });

  describe("create", () => {
    test("calls POST with correct URL and  parmaters", async () => {
      expect.assertions(1);

      axios.post = jest.fn().mockResolvedValue(true);
      const type = "lost-streak";
      const streakId = "streakId";
      const userId = "userId";

      await streakoid.streakTrackingEvents.create({ type, streakId, userId });

      expect(axios.post).toBeCalledWith(
        `${APPLICATION_URL}/v1/streak-tracking-events`,
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
      axios.delete = jest.fn();

      await streakoid.streakTrackingEvents.deleteOne("id");

      expect(axios.delete).toBeCalledWith(
        `${APPLICATION_URL}/v1/streak-tracking-events/id`
      );
    });
  });
});
