import { streakoidFactory, streakoidClient } from "./streakoid";

describe("SDK stripe", () => {
  const streakoid = streakoidFactory(streakoidClient);

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("createSubscription", () => {
    test("calls POST with correct URL and  properties", async () => {
      expect.assertions(1);

      streakoidClient.post = jest.fn().mockResolvedValue(true);

      const token = "token";
      const id = "id";

      await streakoid.stripe.createSubscription({ token, id });

      expect(streakoidClient.post).toBeCalledWith(`/v1/stripe/subscriptions`, {
        token,
        id
      });
    });
  });

  describe("deleteSubscription", () => {
    test("calls POST with correct URL and  properties", async () => {
      expect.assertions(1);

      streakoidClient.post = jest.fn().mockResolvedValue(true);

      const subscription = "subscription";
      const userId = "id";

      await streakoid.stripe.deleteSubscription({ subscription, userId });

      expect(streakoidClient.post).toBeCalledWith(
        `/v1/stripe/delete-subscriptions`,
        { subscription, userId }
      );
    });
  });
});
