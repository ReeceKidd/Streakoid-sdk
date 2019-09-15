import axios from "axios";
import { streakoidFactory } from "./streakoid";
import axiosClient from "./axiosClient";

describe("SDK groupMembers", () => {
  const APPLICATION_URL = "streakoid.com";
  const streakoid = streakoidFactory(APPLICATION_URL);

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("create", () => {
    test("calls POST with correct URL and  parmaters", async () => {
      expect.assertions(1);

      axiosClient.post = jest.fn().mockResolvedValue(true);

      const friendId = "friendId";
      const groupStreakId = "groupStreakId";
      const timezone = "timezone";

      await streakoid.groupStreaks.groupMembers.create({
        friendId,
        groupStreakId,
        timezone
      });

      expect(axiosClient.post).toBeCalledWith(
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
      axiosClient.delete = jest.fn();

      await streakoid.groupStreaks.groupMembers.deleteOne({
        groupStreakId: "groupStreakId",
        memberId: "memberId"
      });

      expect(axiosClient.delete).toBeCalledWith(
        `/v1/group-streaks/groupStreakId/members/memberId`
      );
    });
  });
});
