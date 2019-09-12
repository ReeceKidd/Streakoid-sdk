import axios from "axios";
import streakoidFactory from "./streakoid";

describe("SDK stripe", () => {

  const APPLICATION_URL = "streakoid.com"
  const streakoid = streakoidFactory(APPLICATION_URL)

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("createSubscription", () => {
    test("calls POST with correct URL and data properties", async () => {
      expect.assertions(1);
      axios.post = jest.fn();

      const token = "token";
      const id = "id";

      await streakoid.stripe.createSubscription(token, id);

      expect(axios.post).toBeCalledWith(
        `${APPLICATION_URL}/v1/stripe/subscriptions`,
        { token, id }
      );
    });
  });

  describe("deleteSubscription", () => {
    test("calls POST with correct URL and data properties", async () => {
      expect.assertions(1);
      axios.post = jest.fn();

      const subscription = "subscription";
      const id = "id";

      await streakoid.stripe.deleteSubscription(subscription, id);

      expect(axios.post).toBeCalledWith(
        `${APPLICATION_URL}/v1/stripe/delete-subscriptions`,
        { subscription, id }
      );
    });
  });
});
