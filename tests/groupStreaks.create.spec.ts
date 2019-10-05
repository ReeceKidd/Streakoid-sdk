import { streakoid, londonTimezone } from "../src/streakoid";
import StreakStatus from "../src/StreakStatus";
import { GroupStreakType } from "../src";

const registeredEmail = "create-group-streak-user@gmail.com";
const registeredUsername = "create-group-streak-user";

jest.setTimeout(120000);

describe("POST /group-streaks", () => {
  let userId: string;
  let groupStreakId: string;
  let secondGroupStreakId: string;

  beforeAll(async () => {
    const registrationResponse = await streakoid.users.create({
      username: registeredUsername,
      email: registeredEmail
    });
    userId = registrationResponse._id;
  });

  afterAll(async () => {
    await streakoid.users.deleteOne(userId);
    await streakoid.groupStreaks.deleteOne(groupStreakId);
    await streakoid.groupStreaks.deleteOne(secondGroupStreakId);
  });

  test(`group streak can be created with description and numberOfMinutes`, async () => {
    expect.assertions(15);

    const streakName = "Reading";
    const streakDescription = "Everyday I must do 30 minutes of reading";
    const numberOfMinutes = 30;
    const members: { memberId: string; groupMemberStreakId?: string }[] = [
      { memberId: userId }
    ];

    const groupStreak = await streakoid.groupStreaks.create({
      creatorId: userId,
      type: GroupStreakType.team,
      streakName,
      streakDescription,
      numberOfMinutes,
      members
    });

    expect(groupStreak.members.length).toEqual(1);
    const member = groupStreak.members[0];
    expect(member._id).toBeDefined();
    expect(member.username).toEqual(expect.any(String));
    expect(Object.keys(member).sort()).toEqual(
      ["_id", "username", "groupMemberStreak"].sort()
    );

    const { groupMemberStreak } = member;
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

    expect(groupStreak.streakName).toEqual(streakName);
    expect(groupStreak.streakDescription).toEqual(streakDescription);
    expect(groupStreak.numberOfMinutes).toEqual(numberOfMinutes);
    expect(groupStreak.status).toEqual(StreakStatus.live);
    expect(groupStreak.creatorId).toEqual(userId);
    expect(groupStreak.timezone).toEqual(londonTimezone);
    expect(Object.keys(groupStreak).sort()).toEqual(
      [
        "_id",
        "type",
        "status",
        "members",
        "creatorId",
        "streakName",
        "streakDescription",
        "numberOfMinutes",
        "timezone",
        "createdAt",
        "updatedAt",
        "__v",
        "creator"
      ].sort()
    );

    const { creator } = groupStreak;
    expect(creator._id).toBeDefined();
    expect(creator.username).toEqual(expect.any(String));
    expect(Object.keys(creator).sort()).toEqual(["_id", "username"].sort());

    groupStreakId = groupStreak._id;
  });

  test(`group streak can be created without description or numberOfMinutes`, async () => {
    expect.assertions(14);

    const streakName = "meditation";
    const members: { memberId: string; groupMemberStreakId?: string }[] = [
      { memberId: userId }
    ];

    const groupStreak = await streakoid.groupStreaks.create({
      creatorId: userId,
      type: GroupStreakType.team,
      streakName,
      members
    });

    expect(groupStreak.members.length).toEqual(1);
    const member = groupStreak.members[0];
    expect(member._id).toBeDefined();
    expect(member.username).toEqual(expect.any(String));
    expect(Object.keys(member).sort()).toEqual(
      ["_id", "username", "groupMemberStreak"].sort()
    );

    const { groupMemberStreak } = member;
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

    expect(groupStreak.streakName).toEqual(streakName);
    expect(groupStreak.type).toEqual(GroupStreakType.team);
    expect(groupStreak.status).toEqual(StreakStatus.live);
    expect(groupStreak.creatorId).toEqual(userId);
    expect(groupStreak.timezone).toEqual(londonTimezone);
    expect(Object.keys(groupStreak).sort()).toEqual(
      [
        "_id",
        "type",
        "status",
        "members",
        "creatorId",
        "streakName",
        "timezone",
        "createdAt",
        "updatedAt",
        "__v",
        "creator"
      ].sort()
    );

    const { creator } = groupStreak;
    expect(creator._id).toBeDefined();
    expect(creator.username).toEqual(expect.any(String));
    expect(Object.keys(creator).sort()).toEqual(["_id", "username"].sort());

    secondGroupStreakId = groupStreak._id;
  });
});
