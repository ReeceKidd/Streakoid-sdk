import axios from "axios";
import streakoidFactory from "./streakoid";

describe("SDK groupMemberStreaks", () => {

  const APPLICATION_URL = "streakoid.com"
  const streakoid = streakoidFactory(APPLICATION_URL)

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getOne", () => {
    test("calls GET with correct URL", async () => {
      expect.assertions(1);
      axios.get = jest.fn();

      await streakoid.groupMemberStreaks.getOne("id");

      expect(axios.get).toBeCalledWith(
        `${APPLICATION_URL}/v1/group-member-streaks/id`
      );
    });
  });

  describe("create", () => {
    test("calls POST with correct URL and  parmaters", async () => {
      expect.assertions(1);
      axios.post = jest.fn();
      const userId = "userId";
      const groupStreakId = "groupStreakId";
      const timezone = "timezone";

      await streakoid.groupMemberStreaks.create(
        userId,
        groupStreakId,
        timezone
      );

      expect(axios.post).toBeCalledWith(
        `${APPLICATION_URL}/v1/group-member-streaks`,
        {
          userId,
          groupStreakId
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

      await streakoid.groupMemberStreaks.deleteOne("id");

      expect(axios.delete).toBeCalledWith(
        `${APPLICATION_URL}/v1/group-member-streaks/id`
      );
    });
  });
});
