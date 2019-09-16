import { streakoid, londonTimezone } from "../src/streakoid";

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
    expect.assertions(13);

    const streakName = "Reading";
    const streakDescription = "Everyday I must do 30 minutes of reading";
    const numberOfMinutes = 30;
    const members: { memberId: string; groupMemberStreakId?: string }[] = [
      { memberId: userId }
    ];

    const groupStreak = await streakoid.groupStreaks.create({
      creatorId: userId,
      streakName,
      streakDescription,
      numberOfMinutes,
      members
    });

    expect(groupStreak._id).toEqual(expect.any(String));
    expect(groupStreak.creatorId).toEqual(userId);
    expect(groupStreak.streakName).toEqual(streakName);
    expect(groupStreak.streakDescription).toEqual(streakDescription);
    expect(groupStreak.numberOfMinutes).toEqual(numberOfMinutes);
    expect(groupStreak.timezone).toEqual(londonTimezone);
    expect(groupStreak.createdAt).toEqual(expect.any(String));
    expect(groupStreak.updatedAt).toEqual(expect.any(String));

    expect(Object.keys(groupStreak).sort()).toEqual(
      [
        "_id",
        "members",
        "creatorId",
        "streakName",
        "streakDescription",
        "numberOfMinutes",
        "timezone",
        "createdAt",
        "updatedAt",
        "__v"
      ].sort()
    );

    expect(groupStreak.members.length).toEqual(1);
    const member = groupStreak.members[0];
    expect(member.groupMemberStreakId).toEqual(expect.any(String));
    expect(member.memberId).toEqual(userId);
    expect(Object.keys(groupStreak.members[0]).sort()).toEqual(
      ["memberId", "groupMemberStreakId"].sort()
    );

    groupStreakId = groupStreak._id;
  });

  test(`group streak can be created without description or numberOfMinutes`, async () => {
    expect.assertions(11);

    const streakName = "meditation";
    const members: { memberId: string; groupMemberStreakId?: string }[] = [
      { memberId: userId }
    ];

    const groupStreak = await streakoid.groupStreaks.create({
      creatorId: userId,
      streakName,
      members
    });

    expect(groupStreak._id).toEqual(expect.any(String));
    expect(groupStreak.creatorId).toEqual(userId);
    expect(groupStreak.streakName).toEqual(streakName);
    expect(groupStreak.timezone).toEqual(londonTimezone);
    expect(groupStreak.createdAt).toEqual(expect.any(String));
    expect(groupStreak.updatedAt).toEqual(expect.any(String));

    expect(Object.keys(groupStreak).sort()).toEqual(
      [
        "_id",
        "members",
        "creatorId",
        "streakName",
        "timezone",
        "createdAt",
        "updatedAt",
        "__v"
      ].sort()
    );

    expect(groupStreak.members.length).toEqual(1);
    const member = groupStreak.members[0];
    expect(member.groupMemberStreakId).toEqual(expect.any(String));
    expect(member.memberId).toEqual(userId);
    expect(Object.keys(groupStreak.members[0]).sort()).toEqual(
      ["memberId", "groupMemberStreakId"].sort()
    );

    secondGroupStreakId = groupStreak._id;
  });
});
