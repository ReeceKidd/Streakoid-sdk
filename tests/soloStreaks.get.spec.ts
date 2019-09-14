import { streakoid } from "../src/streakoid";

const email = "get-solo-streaks@gmail.com";
const username = "get-solo-streaks-user";

const soloStreakName = "Daily Spanish";
const soloStreakDescription =
  "Each day I must do the insame amount 50xp of Duolingo";

const timezone = "Europe/Paris";

jest.setTimeout(120000);

describe("GET /solo-streaks", () => {
  let userId: string;
  let soloStreakId: string;
  let secondSoloStreakId: string;
  let completedTaskResponseId: string;

  beforeAll(async () => {
    const registrationResponse = await streakoid.users.create({
      email,
      username
    });
    userId = registrationResponse._id;

    const createSoloStreakResponse = await streakoid.soloStreaks.create({
      userId,
      streakName: soloStreakName,
      streakDescription: soloStreakDescription,
      timezone
    });
    soloStreakId = createSoloStreakResponse._id;
  });

  afterAll(async () => {
    await streakoid.users.deleteOne(userId);
    await streakoid.soloStreaks.deleteOne(soloStreakId);
    await streakoid.soloStreaks.deleteOne(secondSoloStreakId);
    await streakoid.completeSoloStreakTasks.deleteOne(completedTaskResponseId);
  });

  test(`solo streaks can be retreived with user query parameter`, async () => {
    expect.assertions(15);

    const soloStreaks = await streakoid.soloStreaks.getAll({ userId });
    expect(soloStreaks.length).toBeGreaterThanOrEqual(1);

    const soloStreak = soloStreaks[0];

    expect(soloStreak.currentStreak).toEqual({ numberOfDaysInARow: 0 });
    expect(Object.keys(soloStreak.currentStreak)).toEqual([
      "numberOfDaysInARow"
    ]);
    expect(soloStreak.completedToday).toEqual(false);
    expect(soloStreak.active).toEqual(false);
    expect(soloStreak.activity).toEqual([]);
    expect(soloStreak.pastStreaks).toEqual([]);
    expect(soloStreak._id).toEqual(expect.any(String));
    expect(soloStreak.streakName).toEqual(soloStreakName);
    expect(soloStreak.streakDescription).toEqual(soloStreakDescription);
    expect(soloStreak.userId).toEqual(userId);
    expect(soloStreak.timezone).toEqual(timezone);
    expect(soloStreak.createdAt).toEqual(expect.any(String));
    expect(soloStreak.updatedAt).toEqual(expect.any(String));
    expect(Object.keys(soloStreak).sort()).toEqual(
      [
        "currentStreak",
        "completedToday",
        "active",
        "activity",
        "pastStreaks",
        "_id",
        "streakName",
        "streakDescription",
        "userId",
        "timezone",
        "createdAt",
        "updatedAt",
        "__v"
      ].sort()
    );
  });

  test(`that solo streaks can be retreieved with timezone query parameter`, async () => {
    expect.assertions(15);

    const soloStreaks = await streakoid.soloStreaks.getAll({
      timezone
    });
    expect(soloStreaks.length).toBeGreaterThanOrEqual(1);

    const soloStreak = soloStreaks[0];

    expect(soloStreak.currentStreak).toEqual({ numberOfDaysInARow: 0 });
    expect(Object.keys(soloStreak.currentStreak)).toEqual([
      "numberOfDaysInARow"
    ]);
    expect(soloStreak.completedToday).toEqual(false);
    expect(soloStreak.active).toEqual(false);
    expect(soloStreak.activity).toEqual([]);
    expect(soloStreak.pastStreaks).toEqual([]);
    expect(soloStreak._id).toEqual(expect.any(String));
    expect(soloStreak.streakName).toEqual(soloStreakName);
    expect(soloStreak.streakDescription).toEqual(soloStreakDescription);
    expect(soloStreak.userId).toEqual(userId);
    expect(soloStreak.timezone).toEqual(timezone);
    expect(soloStreak.createdAt).toEqual(expect.any(String));
    expect(soloStreak.updatedAt).toEqual(expect.any(String));
    expect(Object.keys(soloStreak).sort()).toEqual(
      [
        "currentStreak",
        "completedToday",
        "active",
        "activity",
        "pastStreaks",
        "_id",
        "streakName",
        "streakDescription",
        "userId",
        "timezone",
        "createdAt",
        "updatedAt",
        "__v"
      ].sort()
    );
  });

  test("solo streaks not completed today can be retreived", async () => {
    expect.assertions(15);

    const soloStreaks = await streakoid.soloStreaks.getAll({
      completedToday: false,
      active: false
    });
    expect(soloStreaks.length).toBeGreaterThanOrEqual(1);

    const soloStreak = soloStreaks[0];

    expect(soloStreak.currentStreak.numberOfDaysInARow).toEqual(0);
    expect(Object.keys(soloStreak.currentStreak)).toEqual([
      "numberOfDaysInARow"
    ]);
    expect(soloStreak.completedToday).toEqual(false);
    expect(soloStreak.active).toEqual(false);
    expect(soloStreak.activity).toEqual([]);
    expect(soloStreak.pastStreaks).toEqual([]);
    expect(soloStreak._id).toEqual(expect.any(String));
    expect(soloStreak.streakName).toEqual(expect.any(String));
    expect(soloStreak.streakDescription).toEqual(expect.any(String));
    expect(soloStreak.userId).toEqual(expect.any(String));
    expect(soloStreak.timezone).toEqual(expect.any(String));
    expect(soloStreak.createdAt).toEqual(expect.any(String));
    expect(soloStreak.updatedAt).toEqual(expect.any(String));
    expect(Object.keys(soloStreak).sort()).toEqual(
      [
        "currentStreak",
        "completedToday",
        "active",
        "activity",
        "pastStreaks",
        "_id",
        "streakName",
        "streakDescription",
        "userId",
        "timezone",
        "createdAt",
        "updatedAt",
        "__v"
      ].sort()
    );
  });

  test("solo streaks that have been completed today can be retreived", async () => {
    expect.assertions(16);

    const streakName = "30 minutes of reading";
    const streakDescription = "Every day I must do 30 minutes of reading";

    const createdSoloStreakResponse = await streakoid.soloStreaks.create({
      userId,
      streakName,
      streakDescription,
      timezone
    });
    secondSoloStreakId = createdSoloStreakResponse._id;

    const completedTaskResponse = await streakoid.completeSoloStreakTasks.create(
      {
        userId,
        soloStreakId: secondSoloStreakId,
        timezone
      }
    );
    completedTaskResponseId = completedTaskResponse._id;

    const soloStreaks = await streakoid.soloStreaks.getAll({
      completedToday: true
    });
    expect(soloStreaks.length).toEqual(1);

    const soloStreak = soloStreaks[0];

    expect(soloStreak.currentStreak.numberOfDaysInARow).toEqual(1);
    expect(soloStreak.currentStreak.startDate).toEqual(expect.any(String));
    expect(Object.keys(soloStreak.currentStreak).sort()).toEqual(
      ["numberOfDaysInARow", "startDate"].sort()
    );
    expect(soloStreak.completedToday).toEqual(true);
    expect(soloStreak.active).toEqual(true);
    expect(soloStreak.activity).toEqual([]);
    expect(soloStreak.pastStreaks).toEqual([]);
    expect(soloStreak._id).toEqual(expect.any(String));
    expect(soloStreak.streakName).toEqual(streakName);
    expect(soloStreak.streakDescription).toEqual(streakDescription);
    expect(soloStreak.userId).toEqual(expect.any(String));
    expect(soloStreak.timezone).toEqual(expect.any(String));
    expect(soloStreak.createdAt).toEqual(expect.any(String));
    expect(soloStreak.updatedAt).toEqual(expect.any(String));
    expect(Object.keys(soloStreak).sort()).toEqual(
      [
        "currentStreak",
        "completedToday",
        "active",
        "activity",
        "pastStreaks",
        "_id",
        "streakName",
        "streakDescription",
        "userId",
        "timezone",
        "createdAt",
        "updatedAt",
        "__v"
      ].sort()
    );
  });
});
