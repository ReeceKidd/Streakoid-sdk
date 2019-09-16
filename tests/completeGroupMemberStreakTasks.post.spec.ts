import { streakoid } from "../src/streakoid";
import StreakTypes from "../src/streakTypes";

const registeredEmail =
  "create-complete-group-member-streak-tasks-user@gmail.com";
const registeredUsername = "create-complete-group-member-streak-tasks-user";

jest.setTimeout(120000);

describe("POST /complete-group-member-streak-tasks", () => {
  let userId: string;
  let groupStreakId: string;
  let groupMemberStreakId: string;
  let secondGroupMemberStreakId: string;

  const streakName = "Intermittent fasting";
  const streakDescription = "I will not eat until 1pm everyday";

  beforeAll(async () => {
    const registrationResponse = await streakoid.users.create({
      username: registeredUsername,
      email: registeredEmail
    });
    userId = registrationResponse._id;
    const members = [{ memberId: userId }];

    const createGroupStreakResponse = await streakoid.groupStreaks.create({
      creatorId: userId,
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
  });

  afterAll(async () => {
    await streakoid.users.deleteOne(userId);
    await streakoid.groupStreaks.deleteOne(groupStreakId);
  });

  describe("POST /v1/complete-group-member-streak-tasks", () => {
    test("user can say that a group streak member task has been completed for the day", async () => {
      expect.assertions(15);

      const completeGroupMemberStreakTask = await streakoid.completeGroupMemberStreakTasks.create(
        {
          userId,
          groupStreakId,
          groupMemberStreakId
        }
      );

      expect(completeGroupMemberStreakTask._id).toEqual(expect.any(String));
      expect(completeGroupMemberStreakTask.userId).toEqual(userId);
      expect(completeGroupMemberStreakTask.groupStreakId).toEqual(
        groupStreakId
      );
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
        StreakTypes.groupMemberStreak
      );
      expect(completeGroupMemberStreakTask.createdAt).toEqual(
        expect.any(String)
      );
      expect(completeGroupMemberStreakTask.updatedAt).toEqual(
        expect.any(String)
      );
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

      const groupMemberStreak = await streakoid.groupMemberStreaks.getOne(
        groupMemberStreakId
      );

      expect(groupMemberStreak.currentStreak.startDate).toBeDefined();
      expect(groupMemberStreak.currentStreak.numberOfDaysInARow).toEqual(1);
      expect(Object.keys(groupMemberStreak.currentStreak).sort()).toEqual(
        ["startDate", "numberOfDaysInARow"].sort()
      );
      expect(groupMemberStreak.completedToday).toEqual(true);
      expect(groupMemberStreak.active).toEqual(true);
    });

    test("user cannot complete the same group streak member task in the same day", async () => {
      expect.assertions(3);

      const secondGroupMemberStreakResponse = await streakoid.groupMemberStreaks.create(
        {
          userId,
          groupStreakId
        }
      );
      secondGroupMemberStreakId = secondGroupMemberStreakResponse._id;

      try {
        await streakoid.completeGroupMemberStreakTasks.create({
          userId,
          groupStreakId,
          groupMemberStreakId: secondGroupMemberStreakId
        });
        await streakoid.completeGroupMemberStreakTasks.create({
          userId,
          groupStreakId,
          groupMemberStreakId: secondGroupMemberStreakId
        });
      } catch (err) {
        expect(err.response.status).toEqual(422);
        expect(err.response.data.message).toEqual(
          "Task already completed today."
        );
        expect(err.response.data.code).toEqual("422-02");
      }
    });
  });
});
