import axios from "axios";
import streakoidFactory from "./streakoid";

describe("SDK soloStreaks", () => {

  const APPLICATION_URL = "streakoid.com"
  const streakoid = streakoidFactory(APPLICATION_URL)

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getAll", () => {
    test("calls GET with correct URL when no query paramters are passed", async () => {
      expect.assertions(1);
      axios.get = jest.fn().mockResolvedValue(true)

      await streakoid.soloStreaks.getAll({});

      expect(axios.get).toBeCalledWith(`${APPLICATION_URL}/v1/solo-streaks?`);
    });

    test("calls GET with correct URL when userId query paramater is passed", async () => {
      expect.assertions(1);
      axios.get = jest.fn().mockResolvedValue(true)

      const userId = "userId";

      await streakoid.soloStreaks.getAll({ userId });

      expect(axios.get).toBeCalledWith(
        `${APPLICATION_URL}/v1/solo-streaks?userId=${userId}&`
      );
    });

    test("calls GET with correct URL when completedToday query paramater is passed", async () => {
      expect.assertions(1);
      axios.get = jest.fn().mockResolvedValue(true)

      const completedToday = true;

      await streakoid.soloStreaks.getAll({ completedToday });

      expect(axios.get).toBeCalledWith(
        `${APPLICATION_URL}/v1/solo-streaks?completedToday=true&`
      );
    });

    test("calls GET with correct URL when timezone query paramater is passed", async () => {
      expect.assertions(1);
      axios.get = jest.fn().mockResolvedValue(true)

      const timezone = `Europe/London`;

      await streakoid.soloStreaks.getAll({ timezone });

      expect(axios.get).toBeCalledWith(
        `${APPLICATION_URL}/v1/solo-streaks?timezone=${timezone}&`
      );
    });

    test("calls GET with correct URL when active query paramater is passed", async () => {
      expect.assertions(1);
      axios.get = jest.fn().mockResolvedValue(true)

      const active = true;

      await streakoid.soloStreaks.getAll({ active });

      expect(axios.get).toBeCalledWith(
        `${APPLICATION_URL}/v1/solo-streaks?active=${active}`
      );
    });
  });

  describe("getOne", () => {
    test("calls GET with correct URL", async () => {
      expect.assertions(1);

      axios.get = jest.fn().mockResolvedValue(true)

      await streakoid.soloStreaks.getOne("id");

      expect(axios.get).toBeCalledWith(`${APPLICATION_URL}/v1/solo-streaks/id`);
    });
  });

  describe("create", () => {
    test("calls POST with correct URL and  parmaters", async () => {
      expect.assertions(1);

      axios.post = jest.fn().mockResolvedValue(true)
      const userId = "userId";
      const streakName = "streakName";
      const streakDescription = "streakDescription";
      const timezone = "timezone";

      await streakoid.soloStreaks.create({ userId, streakName, timezone, streakDescription });

      expect(axios.post).toBeCalledWith(
        `${APPLICATION_URL}/v1/solo-streaks`,
        {
          userId,
          streakName,
          streakDescription
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

      axios.patch = jest.fn().mockResolvedValue(true)
      const streakName = "name";
      const streakDescription = "description";
      const updateData = {
        streakName,
        streakDescription,
      };
      const timezone = "timezone";

      await streakoid.soloStreaks.update({ soloStreakId: "id", timezone, updateData });

      expect(axios.patch).toBeCalledWith(
        `${APPLICATION_URL}/v1/solo-streaks/id`,
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
      axios.delete = jest.fn();

      await streakoid.soloStreaks.deleteOne("id");

      expect(axios.delete).toBeCalledWith(
        `${APPLICATION_URL}/v1/solo-streaks/id`
      );
    });
  });
});
