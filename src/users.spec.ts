import { streakoidFactory } from "./streakoid";
import axiosClient from "./axiosClient";
jest.genMockFromModule("./streakoid");

describe("SDK users", () => {
  const APPLICATION_URL = "streakoid.com";
  const streakoid = streakoidFactory(APPLICATION_URL);

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getAll", () => {
    test("calls GET with correct URL and searchQuery paramater", async () => {
      expect.assertions(1);

      axiosClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.users.getAll("searchQuery");

      expect(axiosClient.get).toBeCalledWith(
        `/v1/users?searchQuery=searchQuery`
      );
    });

    test("calls GET with correct URL without searchQuery paramater", async () => {
      expect.assertions(1);

      axiosClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.users.getAll();

      expect(axiosClient.get).toBeCalledWith(`/v1/users?`);
    });
  });

  describe("getOne", () => {
    test("calls GET with correct URL", async () => {
      expect.assertions(1);

      axiosClient.get = jest.fn().mockResolvedValue(true);

      await streakoid.users.getOne("userId");

      expect(axiosClient.get).toBeCalledWith(`/v1/users/userId`);
    });
  });

  describe("create", () => {
    test("calls POST with correct URL and  parmaters", async () => {
      expect.assertions(1);

      axiosClient.post = jest.fn().mockResolvedValue(true);
      const username = "username";
      const email = "email@gmail.com";

      await streakoid.users.create({ username, email });

      expect(axiosClient.post).toBeCalledWith(`/v1/users`, {
        username,
        email
      });
    });
  });

  describe("deleteOne", () => {
    test("calls DELETE correct URL ", async () => {
      expect.assertions(1);

      axiosClient.delete = jest.fn().mockResolvedValue(true);

      await streakoid.users.deleteOne("userId");

      expect(axiosClient.delete).toBeCalledWith(`/v1/users/userId`);
    });
  });
});
