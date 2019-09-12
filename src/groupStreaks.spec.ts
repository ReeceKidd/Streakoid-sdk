import axios from "axios";
import streakoidFactory from "./streakoid";



describe("SDK groupStreaks", () => {

  const APPLICATION_URL = "streakoid.com"
  const streakoid = streakoidFactory(APPLICATION_URL)

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getAll", () => {
    test("calls GET with correct URL when no query paramters are passed", async () => {
      expect.assertions(1);
      axios.get = jest.fn();

      await streakoid.groupStreaks.getAll({});

      expect(axios.get).toBeCalledWith(`${APPLICATION_URL}/v1/group-streaks?`);
    });

    test("calls GET with correct URL when creatorId query paramater is passed", async () => {
      expect.assertions(1);
      axios.get = jest.fn();

      const creatorId = "memberId";

      await streakoid.groupStreaks.getAll({ creatorId });

      expect(axios.get).toBeCalledWith(
        `${APPLICATION_URL}/v1/group-streaks?creatorId=${creatorId}&`
      );
    });

    test("calls GET with correct URL when memberId query paramater is passed", async () => {
      expect.assertions(1);
      axios.get = jest.fn();

      const memberId = "memberId";

      await streakoid.groupStreaks.getAll({ memberId });

      expect(axios.get).toBeCalledWith(
        `${APPLICATION_URL}/v1/group-streaks?memberId=${memberId}&`
      );
    });

    test("calls GET with correct URL when timezone query paramater is passed", async () => {
      expect.assertions(1);
      axios.get = jest.fn();

      const timezone = `Europe/London`;

      await streakoid.groupStreaks.getAll({ timezone });

      expect(axios.get).toBeCalledWith(
        `${APPLICATION_URL}/v1/group-streaks?timezone=${timezone}`
      );
    });
  });

  describe("getOne", () => {
    test("calls GET with correct URL", async () => {
      expect.assertions(1);
      axios.get = jest.fn();

      await streakoid.groupStreaks.getOne("id");

      expect(axios.get).toBeCalledWith(
        `${APPLICATION_URL}/v1/group-streaks/id`
      );
    });
  });

  describe("create", () => {
    test("calls POST with correct URL and data parmaters", async () => {
      expect.assertions(1);
      axios.post = jest.fn();

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

      expect(axios.post).toBeCalledWith(
        `${APPLICATION_URL}/v1/group-streaks`,
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
    test("calls PATCH with correct URL and data parmaters", async () => {
      expect.assertions(1);
      axios.patch = jest.fn();
      const streakName = "streakName";
      const streakDescription = "streakDescription";
      const numberOfMinutes = 30;
      const timezone = "timezone";

      const data = {
        streakName,
        streakDescription,
        numberOfMinutes
      };

      await streakoid.groupStreaks.update("id", timezone, data);

      expect(axios.patch).toBeCalledWith(
        `${APPLICATION_URL}/v1/group-streaks/id`,
        {
          ...data
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
      axios.delete = jest.fn();

      await streakoid.groupStreaks.deleteOne("id");

      expect(axios.delete).toBeCalledWith(
        `${APPLICATION_URL}/v1/group-streaks/id`
      );
    });
  });
});
