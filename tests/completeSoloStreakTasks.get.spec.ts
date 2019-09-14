import { streakoid } from "../src/streakoid";
import { StreakTypes } from "../src/types";

const email = "get-complete-solo-streak-task@gmail.com";
const username = "get-complete-solo-streak-task";

const streakName = "10 minutes journaling";

const timezone = "Europe/London";

jest.setTimeout(120000);

describe("GET /complete-solo-streak-tasks", () => {
  let userId: string;
  let soloStreakId: string;
  let completeSoloStreakTaskId: string;

  beforeAll(async () => {
    const registrationResponse = await streakoid.users.create({
      username,
      email
    });
    userId = registrationResponse._id;

    const createSoloStreakResponse = await streakoid.soloStreaks.create({
      userId,
      streakName,
      timezone
    });

    soloStreakId = createSoloStreakResponse._id;

    const createSoloStreakTaskCompleteResponse = await streakoid.completeSoloStreakTasks.create(
      {
        userId,
        soloStreakId,
        timezone
      }
    );
    completeSoloStreakTaskId = createSoloStreakTaskCompleteResponse._id;
  });

  afterAll(async () => {
    await streakoid.users.deleteOne(userId);
    await streakoid.soloStreaks.deleteOne(soloStreakId);
    await streakoid.completeSoloStreakTasks.deleteOne(completeSoloStreakTaskId);
  });

  test(`completeSoloStreakTasks can be retreived`, async () => {
    expect.assertions(9);

    const completeSoloStreakTasks = await streakoid.completeSoloStreakTasks.getAll(
      {
        userId,
        streakId: soloStreakId
      }
    );

    const completeSoloStreakTask = completeSoloStreakTasks[0];

    expect(completeSoloStreakTask._id).toEqual(expect.any(String));
    expect(completeSoloStreakTask.userId).toEqual(userId);
    expect(completeSoloStreakTask.streakId).toEqual(soloStreakId);
    expect(completeSoloStreakTask.taskCompleteTime).toEqual(expect.any(String));
    expect(completeSoloStreakTask.taskCompleteDay).toEqual(expect.any(String));
    expect(completeSoloStreakTask.streakType).toEqual(StreakTypes.soloStreak);
    expect(completeSoloStreakTask.createdAt).toEqual(expect.any(String));
    expect(completeSoloStreakTask.updatedAt).toEqual(expect.any(String));
    expect(Object.keys(completeSoloStreakTask).sort()).toEqual(
      [
        "_id",
        "userId",
        "streakId",
        "taskCompleteTime",
        "taskCompleteDay",
        "streakType",
        "createdAt",
        "updatedAt",
        "__v"
      ].sort()
    );
  });
});
