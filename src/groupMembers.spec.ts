import axios from "axios";
import { streakoidFactory, streakoidClient } from "./streakoid";

describe("SDK groupMembers", () => {
  const streakoid = streakoidFactory(streakoidClient);

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("create", () => {
    test("calls POST with correct URL and  parmaters", async () => {
      expect.assertions(1);

      streakoidClient.post = jest.fn().mockResolvedValue(true);

      const friendId = "friendId";
      const groupStreakId = "groupStreakId";
      const timezone = "timezone";

      await streakoid.groupStreaks.groupMembers.create({
        friendId,
        groupStreakId,
        timezone
      });

      expect(streakoidClient.post).toBeCalledWith(
        `/v1/group-streaks/groupStreakId/members`,
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
      streakoidClient.delete = jest.fn();

      await streakoid.groupStreaks.groupMembers.deleteOne({
        groupStreakId: "groupStreakId",
        memberId: "memberId"
      });

      expect(streakoidClient.delete).toBeCalledWith(
        `/v1/group-streaks/groupStreakId/members/memberId`
      );
    });
  });
});
