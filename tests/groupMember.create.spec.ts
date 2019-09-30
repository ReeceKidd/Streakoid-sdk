import { streakoid, londonTimezone } from "../src/streakoid";
import StreakStatus from "../src/StreakStatus";

const registeredEmail = "create-groupMember-user@gmail.com";
const registeredUsername = "create-groupmember-user";

const friendEmail = "friend@gmail.com";
const friendUsername = "frienduser";

jest.setTimeout(120000);

describe("POST /group-streaks/:id/members", () => {
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
  });

  afterAll(async () => {
    await streakoid.users.deleteOne(registeredUserId);
    await streakoid.users.deleteOne(friendId);
    await streakoid.groupStreaks.deleteOne(createdGroupStreakId);
  });

  test(`adds friend to group streak`, async () => {
    expect.assertions(48);

    const members = await streakoid.groupStreaks.groupMembers.create({
      friendId,
      groupStreakId: createdGroupStreakId
    });

    expect(members.length).toEqual(2);

    const currentUser = members[0];
    expect(currentUser.memberId).toEqual(registeredUserId);
    expect(currentUser.groupMemberStreakId).toEqual(expect.any(String));
    expect(Object.keys(currentUser).sort()).toEqual(
      ["memberId", "groupMemberStreakId"].sort()
    );

    const friend = members[1];
    expect(friend.memberId).toEqual(friendId);
    expect(friend.groupMemberStreakId).toEqual(expect.any(String));
    expect(Object.keys(currentUser).sort()).toEqual(
      ["memberId", "groupMemberStreakId"].sort()
    );

    const updatedGroupStreak = await streakoid.groupStreaks.getOne(
      createdGroupStreakId
    );

    expect(updatedGroupStreak._id).toEqual(expect.any(String));
    expect(updatedGroupStreak.creatorId).toEqual(registeredUserId);
    expect(updatedGroupStreak.streakName).toEqual(streakName);
    expect(updatedGroupStreak.status).toEqual(StreakStatus.live);
    expect(updatedGroupStreak.streakDescription).toEqual(streakDescription);
    expect(updatedGroupStreak.timezone).toEqual(londonTimezone);
    expect(updatedGroupStreak.createdAt).toEqual(expect.any(String));
    expect(updatedGroupStreak.updatedAt).toEqual(expect.any(String));

    expect(Object.keys(updatedGroupStreak.creator).sort()).toEqual(
      ["_id", "username"].sort()
    );
    expect(updatedGroupStreak.creator._id).toEqual(registeredUserId);
    expect(updatedGroupStreak.creator.username).toEqual(registeredUsername);

    expect(Object.keys(updatedGroupStreak).sort()).toEqual(
      [
        "_id",
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

    expect(updatedGroupStreak.members.length).toEqual(2);

    const member = updatedGroupStreak.members[0];
    expect(member._id).toEqual(registeredUserId);
    expect(member.username).toEqual(registeredUsername);
    expect(Object.keys(member).sort()).toEqual(
      ["_id", "username", "groupMemberStreak"].sort()
    );

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
    expect(Object.keys(member.groupMemberStreak).sort()).toEqual(
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

    const friendMember = updatedGroupStreak.members[1];
    expect(friendMember._id).toEqual(friendId);
    expect(friendMember.username).toEqual(friendUsername);
    expect(Object.keys(friendMember).sort()).toEqual(
      ["_id", "username", "groupMemberStreak"].sort()
    );

    expect(friendMember.groupMemberStreak._id).toEqual(expect.any(String));
    expect(friendMember.groupMemberStreak.completedToday).toEqual(false);
    expect(friendMember.groupMemberStreak.active).toEqual(false);
    expect(friendMember.groupMemberStreak.activity).toEqual([]);
    expect(friendMember.groupMemberStreak.pastStreaks).toEqual([]);
    expect(friendMember.groupMemberStreak.userId).toEqual(friendId);
    expect(friendMember.groupMemberStreak.groupStreakId).toEqual(
      createdGroupStreakId
    );
    expect(friendMember.groupMemberStreak.timezone).toEqual(londonTimezone);
    expect(friendMember.groupMemberStreak.createdAt).toEqual(
      expect.any(String)
    );
    expect(friendMember.groupMemberStreak.updatedAt).toEqual(
      expect.any(String)
    );
    expect(Object.keys(friendMember.groupMemberStreak).sort()).toEqual(
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
