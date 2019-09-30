import { streakoid } from "../src/streakoid";
import StreakStatus from "../src/StreakStatus";

const email = "create-solo-streak-user@gmail.com";
const username = "create-solo-streak-user";

jest.setTimeout(120000);

describe("POST /solo-streaks", () => {
  let registeredUserId: string;
  let soloStreakId: string;
  let soloStreakNoDescriptionId: string;

  const name = "Daily Spanish";
  const description = "Everyday I must do Spanish on Duolingo";
  const streakNumberOfMinutes = 30;

  beforeAll(async () => {
    const registrationResponse = await streakoid.users.create({
      email,
      username
    });
    registeredUserId = registrationResponse._id;
  });

  afterAll(async () => {
    await streakoid.users.deleteOne(registeredUserId);
    await streakoid.soloStreaks.deleteOne(soloStreakId);
    await streakoid.soloStreaks.deleteOne(soloStreakNoDescriptionId);
  });

  test(`creates solo streak with a description and numberOfMinutes`, async () => {
    expect.assertions(15);

    const soloStreak = await streakoid.soloStreaks.create({
      userId: registeredUserId,
      streakName: name,
      streakDescription: description,
      numberOfMinutes: streakNumberOfMinutes
    });

    const {
      streakName,
      status,
      streakDescription,
      numberOfMinutes,
      userId,
      _id,
      currentStreak,
      completedToday,
      active,
      activity,
      pastStreaks,
      createdAt,
      updatedAt
    } = soloStreak;

    soloStreakId = _id;

    expect(streakName).toEqual(streakName);
    expect(status).toEqual(StreakStatus.active);
    expect(streakDescription).toEqual(streakDescription);
    expect(numberOfMinutes).toEqual(streakNumberOfMinutes);
    expect(userId).toEqual(registeredUserId);
    expect(_id).toBeDefined();
    expect(Object.keys(currentStreak)).toEqual(["numberOfDaysInARow"]);
    expect(currentStreak.numberOfDaysInARow).toEqual(0);
    expect(completedToday).toEqual(false);
    expect(active).toEqual(false);
    expect(activity).toEqual([]);
    expect(pastStreaks).toEqual([]);
    expect(createdAt).toBeDefined();
    expect(updatedAt).toBeDefined();
    expect(Object.keys(soloStreak).sort()).toEqual(
      [
        "currentStreak",
        "status",
        "completedToday",
        "active",
        "activity",
        "pastStreaks",
        "_id",
        "streakName",
        "streakDescription",
        "userId",
        "timezone",
        "numberOfMinutes",
        "createdAt",
        "updatedAt",
        "__v"
      ].sort()
    );
  });

  test(`creates solo streak without a description or number of minutes`, async () => {
    expect.assertions(15);

    const soloStreak = await streakoid.soloStreaks.create({
      userId: registeredUserId,
      streakName: name
    });

    const {
      streakName,
      status,
      streakDescription,
      numberOfMinutes,
      userId,
      _id,
      currentStreak,
      completedToday,
      active,
      activity,
      pastStreaks,
      createdAt,
      updatedAt
    } = soloStreak;

    expect(streakName).toEqual(streakName);
    expect(status).toEqual(StreakStatus.active);
    expect(numberOfMinutes).toEqual(undefined);
    expect(streakDescription).toEqual("");
    expect(userId).toEqual(registeredUserId);
    expect(_id).toBeDefined();
    expect(Object.keys(currentStreak)).toEqual(["numberOfDaysInARow"]);
    expect(currentStreak.numberOfDaysInARow).toEqual(0);
    expect(completedToday).toEqual(false);
    expect(active).toEqual(false);
    expect(activity).toEqual([]);
    expect(pastStreaks).toEqual([]);
    expect(createdAt).toBeDefined();
    expect(updatedAt).toBeDefined();
    expect(Object.keys(soloStreak).sort()).toEqual(
      [
        "status",
        "currentStreak",
        "streakDescription",
        "completedToday",
        "active",
        "activity",
        "pastStreaks",
        "_id",
        "streakName",
        "userId",
        "timezone",
        "createdAt",
        "updatedAt",
        "__v"
      ].sort()
    );

    soloStreakNoDescriptionId = soloStreak._id;
  });
});
