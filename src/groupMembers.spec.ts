import axios from "axios";
import { streakoidFactory } from "./streakoid";

describe("SDK groupMembers", () => {
  const APPLICATION_URL = "streakoid.com";
  const streakoid = streakoidFactory(APPLICATION_URL);

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("create", () => {
    test("calls POST with correct URL and  parmaters", async () => {
      expect.assertions(1);

      axios.post = jest.fn().mockResolvedValue(true);

      const friendId = "friendId";
      const groupStreakId = "groupStreakId";
      const timezone = "timezone";

      await streakoid.groupStreaks.groupMembers.create({
        friendId,
        groupStreakId,
        timezone
      });

      expect(axios.post).toBeCalledWith(
        `${APPLICATION_URL}/v1/group-streaks/groupStreakId/members`,
        {
          friendId
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

      await streakoid.groupStreaks.groupMembers.deleteOne({
        groupStreakId: "groupStreakId",
        memberId: "memberId"
      });

      expect(axios.delete).toBeCalledWith(
        `${APPLICATION_URL}/v1/group-streaks/groupStreakId/members/memberId`
      );
    });
  });
});
