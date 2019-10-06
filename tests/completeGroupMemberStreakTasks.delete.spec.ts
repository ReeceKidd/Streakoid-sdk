import { streakoid } from "../src/streakoid";

const email = "delete-complete-group-member-streak-tasks-user@gmail.com";
const username = "delete-complete-group-member-streak-tasks-user";

jest.setTimeout(120000);

describe("DELETE /complete-group-member-streak-tasks", () => {
  let userId: string;
  let teamStreakId: string;
  let groupMemberStreakId: string;
  let completeGroupMemberStreakTaskId: string;

  const streakName = "Intermittent fasting";
  const streakDescription = "I will not eat until 1pm everyday";

  beforeAll(async () => {
    const registrationResponse = await streakoid.users.create({
      username,
      email
    });
    userId = registrationResponse._id;
    const members = [{ memberId: userId }];

    const teamStreak = await streakoid.teamStreaks.create({
      creatorId: userId,
      streakName,
      streakDescription,
      members
    });
    teamStreakId = teamStreak._id;

    const groupMemberStreak = await streakoid.groupMemberStreaks.create({
      userId,
      teamStreakId
    });
    groupMemberStreakId = groupMemberStreak._id;

    const completeGroupMemberStreakTask = await streakoid.completeGroupMemberStreakTasks.create(
      {
        userId,
        teamStreakId,
        groupMemberStreakId
      }
    );
    completeGroupMemberStreakTaskId = completeGroupMemberStreakTask._id;
  });

  afterAll(async () => {
    await streakoid.users.deleteOne(userId);
    await streakoid.teamStreaks.deleteOne(teamStreakId);
  });

  describe("DELETE /v1/complete-group-member-streak-tasks", () => {
    test("deletes complete-group-member-streak-tasks", async () => {
      expect.assertions(1);

      const response = await streakoid.completeGroupMemberStreakTasks.deleteOne(
        completeGroupMemberStreakTaskId
      );

      expect(response.status).toEqual(204);
    });
  });
});
