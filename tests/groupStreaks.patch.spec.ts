import { streakoid } from "../src/streakoid";
import StreakStatus from "../src/StreakStatus";
import { GroupStreakType } from "../src";

const registeredEmail = "patch-group-streak-user@gmail.com";
const registeredUsername = "patch-group-streak-user";

jest.setTimeout(120000);

describe(`PATCH /group-streaks`, () => {
  let userId: string;
  let groupStreakId: string;

  const streakName = "Paleo";
  const streakDescription = "I will follow the paleo diet every day";

  beforeAll(async () => {
    const registrationResponse = await streakoid.users.create({
      username: registeredUsername,
      email: registeredEmail
    });
    userId = registrationResponse._id;

    const members = [{ memberId: userId }];

    const createGroupStreakResponse = await streakoid.groupStreaks.create({
      creatorId: userId,
      groupStreakType: GroupStreakType.team,
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

  test(`that request passes when group streak is patched with correct keys`, async () => {
    expect.assertions(15);

    const updatedName = "Intermittent fasting";
    const updatedDescription = "Cannot eat till 1pm everyday";
    const numberOfMinutes = 30;
    const updatedTimezone = "Europe/Rome";

    const groupStreak = await streakoid.groupStreaks.update({
      groupStreakId,
      updateData: {
        streakName: updatedName,
        streakDescription: updatedDescription,
        numberOfMinutes,
        timezone: updatedTimezone
      }
    });

    expect(groupStreak._id).toEqual(expect.any(String));
    expect(groupStreak.groupStreakType).toEqual(GroupStreakType.team);
    expect(groupStreak.creatorId).toEqual(userId);
    expect(groupStreak.streakName).toEqual(updatedName);
    expect(groupStreak.status).toEqual(StreakStatus.live);
    expect(groupStreak.streakDescription).toEqual(updatedDescription);
    expect(groupStreak.timezone).toEqual(updatedTimezone);
    expect(groupStreak.numberOfMinutes).toEqual(numberOfMinutes);
    expect(groupStreak.createdAt).toEqual(expect.any(String));
    expect(groupStreak.updatedAt).toEqual(expect.any(String));

    expect(Object.keys(groupStreak).sort()).toEqual(
      [
        "members",
        "_id",
        "groupStreakType",
        "creatorId",
        "streakName",
        "status",
        "streakDescription",
        "timezone",
        "createdAt",
        "updatedAt",
        "__v",
        "numberOfMinutes"
      ].sort()
    );

    expect(groupStreak.members.length).toEqual(1);
    const member = groupStreak.members[0];
    expect(member.groupMemberStreakId).toEqual(expect.any(String));
    expect(member.memberId).toEqual(userId);
    expect(Object.keys(groupStreak.members[0]).sort()).toEqual(
      ["memberId", "groupMemberStreakId"].sort()
    );
  });
});
