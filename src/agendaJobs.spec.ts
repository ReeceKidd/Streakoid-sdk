import { streakoidFactory, streakoidClient } from "./streakoid";

describe("SDK agendaJobs", () => {
  const applicationUrl = `streakoid.com`;
  const streakoid = streakoidFactory(streakoidClient, applicationUrl);

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("deleteOne", () => {
    test("calls DELETE correct URL ", async () => {
      expect.assertions(1);
      streakoidClient.delete = jest.fn();

      await streakoid.agendaJobs.deleteOne("id");

      expect(streakoidClient.delete).toBeCalledWith(`/v1/agenda-jobs/id`);
    });
  });
});
