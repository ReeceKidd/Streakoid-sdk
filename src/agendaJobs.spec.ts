import { streakoidFactory, streakoidClient } from "./streakoid";

describe("SDK agendaJobs", () => {
  const streakoid = streakoidFactory(streakoidClient);

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
