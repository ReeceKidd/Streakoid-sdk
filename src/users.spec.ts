import axios from "axios";
import { streakoidFactory } from "./streakoid";
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

      axios.get = jest.fn().mockResolvedValue(true);

      await streakoid.users.getAll("searchQuery");

      expect(axios.get).toBeCalledWith(
        `${APPLICATION_URL}/v1/users?searchQuery=searchQuery`
      );
    });

    test("calls GET with correct URL without searchQuery paramater", async () => {
      expect.assertions(1);

      axios.get = jest.fn().mockResolvedValue(true);

      await streakoid.users.getAll();

      expect(axios.get).toBeCalledWith(`${APPLICATION_URL}/v1/users?`);
    });
  });

  describe("getOne", () => {
    test("calls GET with correct URL", async () => {
      expect.assertions(1);

      axios.get = jest.fn().mockResolvedValue(true);

      await streakoid.users.getOne("userId");

      expect(axios.get).toBeCalledWith(`${APPLICATION_URL}/v1/users/userId`);
    });
  });

  describe("create", () => {
    test("calls POST with correct URL and  parmaters", async () => {
      expect.assertions(1);

      axios.post = jest.fn().mockResolvedValue(true);
      const username = "username";
      const email = "email@gmail.com";

      await streakoid.users.create({ username, email });

      expect(axios.post).toBeCalledWith(`${APPLICATION_URL}/v1/users`, {
        username,
        email
      });
    });
  });

  describe("deleteOne", () => {
    test("calls DELETE correct URL ", async () => {
      expect.assertions(1);

      axios.delete = jest.fn().mockResolvedValue(true);

      await streakoid.users.deleteOne("userId");

      expect(axios.delete).toBeCalledWith(`${APPLICATION_URL}/v1/users/userId`);
    });
  });
});
