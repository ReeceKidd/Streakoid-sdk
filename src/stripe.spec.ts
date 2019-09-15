import { streakoidFactory } from "./streakoid";
import axiosClient from "./axiosClient";

describe("SDK stripe", () => {
  const APPLICATION_URL = "streakoid.com";
  const streakoid = streakoidFactory(APPLICATION_URL);

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("createSubscription", () => {
    test("calls POST with correct URL and  properties", async () => {
      expect.assertions(1);

      axiosClient.post = jest.fn().mockResolvedValue(true);

      const token = "token";
      const id = "id";

      await streakoid.stripe.createSubscription({ token, id });

      expect(axiosClient.post).toBeCalledWith(`/v1/stripe/subscriptions`, {
        token,
        id
      });
    });
  });

  describe("deleteSubscription", () => {
    test("calls POST with correct URL and  properties", async () => {
      expect.assertions(1);

      axiosClient.post = jest.fn().mockResolvedValue(true);

      const subscription = "subscription";
      const userId = "id";

      await streakoid.stripe.deleteSubscription({ subscription, userId });

      expect(axiosClient.post).toBeCalledWith(
        `/v1/stripe/delete-subscriptions`,
        { subscription, userId }
      );
    });
  });
});
