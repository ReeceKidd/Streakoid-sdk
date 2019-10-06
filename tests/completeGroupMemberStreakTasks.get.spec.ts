import { streakoid } from "../src/streakoid";
import { GroupStreakType } from "../src";

const email = "get-complete-group-member-task@gmail.com";
const username = "get-complete-group-member-task";

const streakName = "10 minutes journaling";

jest.setTimeout(120000);

describe("GET /complete-group-member-streak-tasks", () => {
  let userId: string;
  let groupStreakId: string;
  let groupMemberStreakId: string;
  let completeGroupMemberStreakTaskId: string;

  beforeAll(async () => {
    const registrationResponse = await streakoid.users.create({
      username,
      email
    });
    userId = registrationResponse._id;
    const members = [{ memberId: userId }];

    const groupStreak = await streakoid.groupStreaks.create({
      creatorId: userId,
      groupStreakType: GroupStreakType.team,
      streakName,
      members
    });
    groupStreakId = groupStreak._id;

    const createGroupMemberStreakResponse = await streakoid.groupMemberStreaks.create(
      {
        userId,
        groupStreakId
      }
    );
    groupMemberStreakId = createGroupMemberStreakResponse._id;

    const createGroupMemberStreakTaskCompleteResponse = await streakoid.completeGroupMemberStreakTasks.create(
      {
        userId,
        groupStreakId,
        groupMemberStreakId
      }
    );
    completeGroupMemberStreakTaskId =
      createGroupMemberStreakTaskCompleteResponse._id;
  });

  afterAll(async () => {
    await streakoid.users.deleteOne(userId);
    await streakoid.groupStreaks.deleteOne(groupStreakId);
    await streakoid.groupMemberStreaks.deleteOne(groupMemberStreakId);
    await streakoid.completeGroupMemberStreakTasks.deleteOne(
      completeGroupMemberStreakTaskId
    );
  });

  test(`completeGroupMemberStreakTasks can be retreived`, async () => {
    expect.assertions(11);

    const completeGroupMemberStreakTasks = await streakoid.completeGroupMemberStreakTasks.getAll(
      {
        userId,
        groupStreakId,
        groupMemberStreakId
      }
    );

    expect(completeGroupMemberStreakTasks.length).toBeGreaterThanOrEqual(1);

    const completeGroupMemberStreakTask = completeGroupMemberStreakTasks[0];

    expect(completeGroupMemberStreakTask._id).toEqual(expect.any(String));
    expect(completeGroupMemberStreakTask.userId).toEqual(userId);
    expect(completeGroupMemberStreakTask.groupStreakId).toEqual(groupStreakId);
    expect(completeGroupMemberStreakTask.groupMemberStreakId).toEqual(
      groupMemberStreakId
    );
    expect(completeGroupMemberStreakTask.taskCompleteTime).toEqual(
      expect.any(String)
    );
    expect(completeGroupMemberStreakTask.taskCompleteDay).toEqual(
      expect.any(String)
    );
    expect(completeGroupMemberStreakTask.streakType).toEqual(
      "group-member-streak"
    );
    expect(completeGroupMemberStreakTask.createdAt).toBeDefined();
    expect(completeGroupMemberStreakTask.updatedAt).toBeDefined();
    expect(Object.keys(completeGroupMemberStreakTask).sort()).toEqual(
      [
        "_id",
        "userId",
        "groupStreakId",
        "groupMemberStreakId",
        "taskCompleteTime",
        "taskCompleteDay",
        "streakType",
        "createdAt",
        "updatedAt",
        "__v"
      ].sort()
    );
  });
});
