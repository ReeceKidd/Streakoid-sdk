import { streakoid, londonTimezone } from "../src/streakoid";
import StreakStatus from "../src/StreakStatus";
import { GroupStreakType } from "../src";

const email = "get--one-group-streak@gmail.com";
const username = "get-one-group-streak-user";

const streakName = "Daily Meditation";
const streakDescription = "Each day I must meditate at ";

jest.setTimeout(120000);

describe("GET /group-streaks/:groupStreakId", () => {
  let userId: string;

  let groupStreakId: string;

  beforeAll(async () => {
    const registrationResponse = await streakoid.users.create({
      username,
      email
    });
    userId = registrationResponse._id;

    const members = [{ memberId: userId }];

    const createGroupStreakResponse = await streakoid.groupStreaks.create({
      creatorId: userId,
      type: GroupStreakType.team,
      streakName,
      streakDescription,
      members
    });
    groupStreakId = createGroupStreakResponse._id;
  });

  afterAll(async () => {
    await streakoid.users.deleteOne(userId);
    await streakoid.groupStreaks.deleteOne(groupStreakId);
  });

  test(`group streak can be retreived with populated member information`, async () => {
    expect.assertions(15);

    const groupStreak = await streakoid.groupStreaks.getOne(groupStreakId);

    expect(groupStreak.members.length).toEqual(1);
    const member = groupStreak.members[0];
    expect(member._id).toBeDefined();
    expect(member.username).toEqual(username);
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

    expect(groupStreak.type).toEqual(GroupStreakType.team);
    expect(groupStreak.streakName).toEqual(streakName);
    expect(groupStreak.status).toEqual(StreakStatus.live);
    expect(groupStreak.streakDescription).toEqual(streakDescription);
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
        "timezone",
        "createdAt",
        "updatedAt",
        "__v",
        "creator"
      ].sort()
    );

    const { creator } = groupStreak;
    expect(creator._id).toBeDefined();
    expect(creator.username).toEqual(username);
    expect(Object.keys(creator).sort()).toEqual(["_id", "username"].sort());
  });

  test(`sends group streak does not exist error when solo streak doesn't exist`, async () => {
    expect.assertions(5);

    try {
      await streakoid.groupStreaks.getOne("5d54487483233622e43270f9");
    } catch (err) {
      const { data } = err.response;
      const { code, message, httpStatusCode } = data;
      expect(err.response.status).toEqual(400);
      expect(code).toEqual("400-25");
      expect(message).toEqual("Group streak does not exist.");
      expect(httpStatusCode).toEqual(400);
      expect(Object.keys(data).sort()).toEqual(
        ["code", "message", "httpStatusCode"].sort()
      );
    }
  });
});
