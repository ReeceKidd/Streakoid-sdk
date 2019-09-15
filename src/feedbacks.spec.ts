import { streakoidFactory } from "./streakoid";
import axiosClient from "./axiosClient";

describe("SDK completeSoloStreakTasks", () => {
  const APPLICATION_URL = "streakoid.com";
  const streakoid = streakoidFactory(APPLICATION_URL);

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("create", () => {
    test("calls POST with correct URL and  parmaters", async () => {
      expect.assertions(1);
      axiosClient.post = jest.fn().mockResolvedValue(true);

      const userId = "12345678";
      const pageUrl = "/solo-streaks";
      const username = "username";
      const userEmail = "userEmail";
      const feedbackText = "feedback";

      await streakoid.feedbacks.create({
        userId,
        pageUrl,
        username,
        userEmail,
        feedbackText
      });

      expect(axiosClient.post).toBeCalledWith(`/v1/feedbacks`, {
        userId,
        pageUrl,
        username,
        userEmail,
        feedbackText
      });
    });
  });

  describe("deleteOne", () => {
    test("calls DELETE correct URL ", async () => {
      expect.assertions(1);
      axiosClient.delete = jest.fn();

      await streakoid.feedbacks.deleteOne("id");

      expect(axiosClient.delete).toBeCalledWith(`/v1/feedbacks/id`);
    });
  });
});
