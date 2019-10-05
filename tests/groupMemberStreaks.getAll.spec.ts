import { streakoid, londonTimezone } from "../src/streakoid";
import { GroupStreakType } from "../src";

const email = "get-group-member-streaks@gmail.com";
const username = "get-group-member-streaks-user";

const streakName = "Daily Italian";

jest.setTimeout(120000);

describe("GET /group-member-streaks", () => {
  let userId: string;
  let groupStreakId: string;
  let groupMemberStreakId: string;
  let secondGroupStreakId: string;
  let secondGroupMemberStreakId: string;
  let completedGroupMemberStreakTaskId: string;

  beforeAll(async () => {
    const user = await streakoid.users.create({
      username,
      email
    });
    userId = user._id;
    const members = [{ memberId: userId }];

    const groupStreak = await streakoid.groupStreaks.create({
      creatorId: userId,
      type: GroupStreakType.team,
      streakName,
      members
    });
    groupStreakId = groupStreak._id;

    const groupMemberStreak = await streakoid.groupMemberStreaks.create({
      userId,
      groupStreakId
    });
    groupMemberStreakId = groupMemberStreak._id;
  });

  afterAll(async () => {
    await streakoid.users.deleteOne(userId);
    await streakoid.groupStreaks.deleteOne(groupStreakId);
    await streakoid.groupStreaks.deleteOne(secondGroupStreakId);
    await streakoid.groupMemberStreaks.deleteOne(groupMemberStreakId);
    await streakoid.groupMemberStreaks.deleteOne(secondGroupMemberStreakId);
    await streakoid.completeGroupMemberStreakTasks.deleteOne(
      completedGroupMemberStreakTaskId
    );
  });

  test(`group member streaks can be retreived with user query parameter`, async () => {
    expect.assertions(14);

    const groupMemberStreaks = await streakoid.groupMemberStreaks.getAll({
      userId
    });
    expect(groupMemberStreaks.length).toBeGreaterThanOrEqual(1);

    const groupMemberStreak = groupMemberStreaks[0];

    expect(groupMemberStreak._id).toEqual(expect.any(String));
    expect(groupMemberStreak.currentStreak.numberOfDaysInARow).toEqual(0);
    expect(Object.keys(groupMemberStreak.currentStreak).sort()).toEqual(
      ["numberOfDaysInARow"].sort()
    );
    expect(groupMemberStreak.completedToday).toEqual(false);
    expect(groupMemberStreak.active).toEqual(false);
    expect(groupMemberStreak.activity).toEqual([]);
    expect(groupMemberStreak.pastStreaks).toEqual([]);
    expect(groupMemberStreak.userId).toEqual(expect.any(String));
    expect(groupMemberStreak.groupStreakId).toEqual(expect.any(String));
    expect(groupMemberStreak.timezone).toEqual(londonTimezone);
    expect(groupMemberStreak.createdAt).toEqual(expect.any(String));
    expect(groupMemberStreak.updatedAt).toEqual(expect.any(String));
    expect(Object.keys(groupMemberStreak).sort()).toEqual(
      [
        "_id",
        "currentStreak",
        "completedToday",
        "active",
        "activity",
        "pastStreaks",
        "userId",
        "groupStreakId",
        "timezone",
        "createdAt",
        "updatedAt",
        "__v"
      ].sort()
    );
  });

  test(`group member streaks can be retreieved with timezone query parameter`, async () => {
    expect.assertions(14);

    const groupMemberStreaks = await streakoid.groupMemberStreaks.getAll({
      timezone: londonTimezone
    });
    expect(groupMemberStreaks.length).toBeGreaterThanOrEqual(1);

    const groupMemberStreak = groupMemberStreaks[0];

    expect(groupMemberStreak._id).toEqual(expect.any(String));
    expect(groupMemberStreak.currentStreak.numberOfDaysInARow).toEqual(0);
    expect(Object.keys(groupMemberStreak.currentStreak).sort()).toEqual(
      ["numberOfDaysInARow"].sort()
    );
    expect(groupMemberStreak.completedToday).toEqual(false);
    expect(groupMemberStreak.active).toEqual(false);
    expect(groupMemberStreak.activity).toEqual([]);
    expect(groupMemberStreak.pastStreaks).toEqual([]);
    expect(groupMemberStreak.userId).toEqual(expect.any(String));
    expect(groupMemberStreak.groupStreakId).toEqual(expect.any(String));
    expect(groupMemberStreak.timezone).toEqual(londonTimezone);
    expect(groupMemberStreak.createdAt).toEqual(expect.any(String));
    expect(groupMemberStreak.updatedAt).toEqual(expect.any(String));
    expect(Object.keys(groupMemberStreak).sort()).toEqual(
      [
        "_id",
        "currentStreak",
        "completedToday",
        "active",
        "activity",
        "pastStreaks",
        "userId",
        "groupStreakId",
        "timezone",
        "createdAt",
        "updatedAt",
        "__v"
      ].sort()
    );
  });

  test("group member streaks not completed today can be retreived", async () => {
    expect.assertions(14);

    const groupMemberStreaks = await streakoid.groupMemberStreaks.getAll({
      completedToday: false,
      active: false
    });
    expect(groupMemberStreaks.length).toBeGreaterThanOrEqual(1);

    const groupMemberStreak = groupMemberStreaks[0];

    expect(groupMemberStreak._id).toEqual(expect.any(String));
    expect(groupMemberStreak.currentStreak.numberOfDaysInARow).toEqual(0);
    expect(Object.keys(groupMemberStreak.currentStreak).sort()).toEqual(
      ["numberOfDaysInARow"].sort()
    );
    expect(groupMemberStreak.completedToday).toEqual(false);
    expect(groupMemberStreak.active).toEqual(false);
    expect(groupMemberStreak.activity).toEqual([]);
    expect(groupMemberStreak.pastStreaks).toEqual([]);
    expect(groupMemberStreak.userId).toEqual(expect.any(String));
    expect(groupMemberStreak.groupStreakId).toEqual(expect.any(String));
    expect(groupMemberStreak.timezone).toEqual(londonTimezone);
    expect(groupMemberStreak.createdAt).toEqual(expect.any(String));
    expect(groupMemberStreak.updatedAt).toEqual(expect.any(String));
    expect(Object.keys(groupMemberStreak).sort()).toEqual(
      [
        "_id",
        "currentStreak",
        "completedToday",
        "active",
        "activity",
        "pastStreaks",
        "userId",
        "groupStreakId",
        "timezone",
        "createdAt",
        "updatedAt",
        "__v"
      ].sort()
    );
  });

  test("group member streaks that have been completed today can be retreived", async () => {
    expect.assertions(15);

    const streakName = "30 minutes of reading";

    const members = [{ memberId: userId }];

    const createdGroupStreak = await streakoid.groupStreaks.create({
      creatorId: userId,
      type: GroupStreakType.team,
      streakName,
      members
    });
    secondGroupStreakId = createdGroupStreak._id;

    const createdGroupMemberStreak = await streakoid.groupMemberStreaks.create({
      userId,
      groupStreakId
    });
    secondGroupMemberStreakId = createdGroupMemberStreak._id;

    const completedGroupMemberStreakTask = await streakoid.completeGroupMemberStreakTasks.create(
      {
        userId,
        groupStreakId: secondGroupStreakId,
        groupMemberStreakId: secondGroupMemberStreakId
      }
    );
    completedGroupMemberStreakTaskId = completedGroupMemberStreakTask._id;

    const groupMemberStreaks = await streakoid.groupMemberStreaks.getAll({
      completedToday: true
    });
    expect(groupMemberStreaks.length).toBeGreaterThanOrEqual(1);

    const groupMemberStreak = groupMemberStreaks[0];

    expect(groupMemberStreak._id).toEqual(expect.any(String));
    expect(groupMemberStreak.currentStreak.numberOfDaysInARow).toEqual(1);
    expect(groupMemberStreak.currentStreak.startDate).toEqual(
      expect.any(String)
    );
    expect(Object.keys(groupMemberStreak.currentStreak).sort()).toEqual(
      ["numberOfDaysInARow", "startDate"].sort()
    );
    expect(groupMemberStreak.completedToday).toEqual(true);
    expect(groupMemberStreak.active).toEqual(true);
    expect(groupMemberStreak.activity).toEqual([]);
    expect(groupMemberStreak.pastStreaks).toEqual([]);
    expect(groupMemberStreak.userId).toEqual(expect.any(String));
    expect(groupMemberStreak.groupStreakId).toEqual(expect.any(String));
    expect(groupMemberStreak.timezone).toEqual(londonTimezone);
    expect(groupMemberStreak.createdAt).toEqual(expect.any(String));
    expect(groupMemberStreak.updatedAt).toEqual(expect.any(String));
    expect(Object.keys(groupMemberStreak).sort()).toEqual(
      [
        "_id",
        "currentStreak",
        "completedToday",
        "active",
        "activity",
        "pastStreaks",
        "userId",
        "groupStreakId",
        "timezone",
        "createdAt",
        "updatedAt",
        "__v"
      ].sort()
    );
  });
});
