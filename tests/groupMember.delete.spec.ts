import { streakoid, londonTimezone } from "../src/streakoid";

const registeredEmail = "create-groupmember-user@gmail.com";
const registeredUsername = "create-groupmember-user";

const friendEmail = "friend@gmail.com";
const friendUsername = "friendUser";

jest.setTimeout(120000);

describe("DELETE /group-streaks/:id/members/:id", () => {
  let registeredUserId: string;
  let friendId: string;
  let createdGroupStreakId: string;

  const streakName = "Drink water";
  const streakDescription = "Everyday I must drink two litres of water";

  beforeAll(async () => {
    const registrationResponse = await streakoid.users.create({
      username: registeredUsername,
      email: registeredEmail
    });
    registeredUserId = registrationResponse._id;

    const friendRegistrationResponse = await streakoid.users.create({
      username: friendUsername,
      email: friendEmail
    });

    friendId = friendRegistrationResponse._id;

    const members = [{ memberId: registeredUserId }];

    const createGroupStreakResponse = await streakoid.groupStreaks.create({
      creatorId: registeredUserId,
      streakName,
      streakDescription,
      members
    });
    createdGroupStreakId = createGroupStreakResponse._id;

    await streakoid.groupStreaks.groupMembers.create({
      friendId,
      groupStreakId: createdGroupStreakId
    });
  });

  afterAll(async () => {
    await streakoid.users.deleteOne(registeredUserId);
    await streakoid.users.deleteOne(friendId);
    await streakoid.groupStreaks.deleteOne(createdGroupStreakId);
  });

  test(`deletes member from group streak`, async () => {
    expect.assertions(27);

    const { status } = await streakoid.groupStreaks.groupMembers.deleteOne({
      groupStreakId: createdGroupStreakId,
      memberId: friendId
    });

    expect(status).toEqual(204);

    const updatedGroupStreak = await streakoid.groupStreaks.getOne(
      createdGroupStreakId
    );

    expect(updatedGroupStreak._id).toEqual(expect.any(String));
    expect(updatedGroupStreak.creatorId).toEqual(registeredUserId);
    expect(updatedGroupStreak.streakName).toEqual(streakName);
    expect(updatedGroupStreak.streakDescription).toEqual(streakDescription);
    expect(updatedGroupStreak.timezone).toEqual(londonTimezone);
    expect(updatedGroupStreak.createdAt).toEqual(expect.any(String));
    expect(updatedGroupStreak.updatedAt).toEqual(expect.any(String));

    expect(Object.keys(updatedGroupStreak.creator)).toEqual([
      "_id",
      "username"
    ]);
    expect(updatedGroupStreak.creator._id).toEqual(registeredUserId);
    expect(updatedGroupStreak.creator.username).toEqual(registeredUsername);

    expect(Object.keys(updatedGroupStreak)).toEqual([
      "_id",
      "members",
      "creatorId",
      "streakName",
      "streakDescription",
      "timezone",
      "createdAt",
      "updatedAt",
      "__v",
      "creator"
    ]);

    expect(updatedGroupStreak.members.length).toEqual(1);

    const member = updatedGroupStreak.members[0];
    expect(member._id).toEqual(registeredUserId);
    expect(member.username).toEqual(registeredUsername);
    expect(Object.keys(member)).toEqual([
      "_id",
      "username",
      "groupMemberStreak"
    ]);

    expect(member.groupMemberStreak._id).toEqual(expect.any(String));
    expect(member.groupMemberStreak.completedToday).toEqual(false);
    expect(member.groupMemberStreak.active).toEqual(false);
    expect(member.groupMemberStreak.activity).toEqual([]);
    expect(member.groupMemberStreak.pastStreaks).toEqual([]);
    expect(member.groupMemberStreak.userId).toEqual(registeredUserId);
    expect(member.groupMemberStreak.groupStreakId).toEqual(
      createdGroupStreakId
    );
    expect(member.groupMemberStreak.timezone).toEqual(londonTimezone);
    expect(member.groupMemberStreak.createdAt).toEqual(expect.any(String));
    expect(member.groupMemberStreak.updatedAt).toEqual(expect.any(String));
    expect(Object.keys(member.groupMemberStreak)).toEqual([
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
    ]);
  });
});
