import axios from "axios";
import { streakoidFactory } from "./streakoid";
import axiosClient from "./axiosClient";

describe("SDK groupMemberStreaks", () => {
  const APPLICATION_URL = "streakoid.com";
  const streakoid = streakoidFactory(APPLICATION_URL);

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getOne", () => {
    test("calls GET with correct URL", async () => {
      expect.assertions(1);

      axiosClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.groupMemberStreaks.getOne("id");

      expect(axiosClient.get).toBeCalledWith(`/v1/group-member-streaks/id`);
    });
  });

  describe("create", () => {
    test("calls POST with correct URL and  parmaters", async () => {
      expect.assertions(1);

      axiosClient.post = jest.fn().mockResolvedValue(true);

      const userId = "userId";
      const groupStreakId = "groupStreakId";
      const timezone = "timezone";

      await streakoid.groupMemberStreaks.create({
        userId,
        groupStreakId,
        timezone
      });

      expect(axiosClient.post).toBeCalledWith(
        `/v1/group-member-streaks`,
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
      axiosClient.delete = jest.fn();

      await streakoid.groupMemberStreaks.deleteOne("id");

      expect(axiosClient.delete).toBeCalledWith(`/v1/group-member-streaks/id`);
    });
  });
});
