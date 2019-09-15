import { streakoidFactory } from "./streakoid";
import axiosClient from "./axiosClient";

describe("SDK agendaJobs", () => {
  const APPLICATION_URL = "streakoid.com";
  const streakoid = streakoidFactory(APPLICATION_URL);

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("deleteOne", () => {
    test("calls DELETE correct URL ", async () => {
      expect.assertions(1);
      axiosClient.delete = jest.fn();

      await streakoid.agendaJobs.deleteOne("id");

      expect(axiosClient.delete).toBeCalledWith(`/v1/agenda-jobs/id`);
    });
  });
});
