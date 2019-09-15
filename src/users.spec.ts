import { streakoidFactory, streakoidClient } from "./streakoid";
jest.genMockFromModule("./streakoid");

describe("SDK users", () => {
  const streakoid = streakoidFactory(streakoidClient);

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getAll", () => {
    test("calls GET with correct URL and searchQuery paramater", async () => {
      expect.assertions(1);

      streakoidClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.users.getAll("searchQuery");

      expect(streakoidClient.get).toBeCalledWith(
        `/v1/users?searchQuery=searchQuery`
      );
    });

    test("calls GET with correct URL without searchQuery paramater", async () => {
      expect.assertions(1);

      streakoidClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.users.getAll();

      expect(streakoidClient.get).toBeCalledWith(`/v1/users?`);
    });
  });

  describe("getOne", () => {
    test("calls GET with correct URL", async () => {
      expect.assertions(1);

      streakoidClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.users.getOne("userId");

      expect(streakoidClient.get).toBeCalledWith(`/v1/users/userId`);
    });
  });

  describe("create", () => {
    test("calls POST with correct URL and  parmaters", async () => {
      expect.assertions(1);

      streakoidClient.post = jest.fn().mockResolvedValue(true);
      const username = "username";
      const email = "email@gmail.com";

      await streakoid.users.create({ username, email });

      expect(streakoidClient.post).toBeCalledWith(`/v1/users`, {
        username,
        email
      });
    });
  });

  describe("deleteOne", () => {
    test("calls DELETE correct URL ", async () => {
      expect.assertions(1);

      streakoidClient.delete = jest.fn().mockResolvedValue(true);

      await streakoid.users.deleteOne("userId");

      expect(streakoidClient.delete).toBeCalledWith(`/v1/users/userId`);
    });
  });
});
