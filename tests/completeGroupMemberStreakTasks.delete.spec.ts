import { streakoid } from "../src/streakoid";
import { GroupStreakType } from "../src";

const email = "delete-complete-group-member-streak-tasks-user@gmail.com";
const username = "delete-complete-group-member-streak-tasks-user";

jest.setTimeout(120000);

describe("DELETE /complete-group-member-streak-tasks", () => {
  let userId: string;
  let groupStreakId: string;
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

    const createGroupStreakResponse = await streakoid.groupStreaks.create({
      creatorId: userId,
      type: GroupStreakType.team,
      streakName,
      streakDescription,
      members
    });
    groupStreakId = createGroupStreakResponse._id;

    const createGroupMemberStreakResponse = await streakoid.groupMemberStreaks.create(
      {
        userId,
        groupStreakId
      }
    );
    groupMemberStreakId = createGroupMemberStreakResponse._id;

    const completeGroupMemberStreakTaskResponse = await streakoid.completeGroupMemberStreakTasks.create(
      {
        userId,
        groupStreakId,
        groupMemberStreakId
      }
    );
    completeGroupMemberStreakTaskId = completeGroupMemberStreakTaskResponse._id;
  });

  afterAll(async () => {
    await streakoid.users.deleteOne(userId);
    await streakoid.groupStreaks.deleteOne(groupStreakId);
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
