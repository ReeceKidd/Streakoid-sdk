import axios from "axios";
import { streakoidFactory, streakoidClient, londonTimezone } from "./streakoid";

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

      await streakoid.groupStreaks.groupMembers.create({
        friendId,
        groupStreakId
      });

      expect(streakoidClient.post).toBeCalledWith(
        `/v1/group-streaks/groupStreakId/members`,
        {
          friendId
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
