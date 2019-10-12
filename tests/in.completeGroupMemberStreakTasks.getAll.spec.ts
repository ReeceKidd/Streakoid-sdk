import { streakoid } from '../src/streakoid';
import { StreakTypes } from '../src';

const email = 'get-incomplete-group-member-streaks-task@gmail.com';
const username = 'get-incomplete-group-member-streak-task';

const streakName = '10 minutes journaling';

jest.setTimeout(120000);

describe('GET /incomplete-solo-streak-tasks', () => {
    let userId: string;
    let teamStreakId: string;
    let groupMemberStreakId: string;
    let incompleteGroupMemberStreakTaskId: string;

    beforeAll(async () => {
        const user = await streakoid.users.create({
            email,
            username,
        });
        userId = user._id;
        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            members,
        });
        teamStreakId = teamStreak._id;

        const groupMemberStreak = await streakoid.groupMemberStreaks.create({
            userId,
            teamStreakId,
        });
        groupMemberStreakId = groupMemberStreak._id;

        // Group member streaks tasks must be completed before they can be incompleted.
        await streakoid.completeGroupMemberStreakTasks.create({
            userId,
            teamStreakId,
            groupMemberStreakId,
            streakType: StreakTypes.team,
        });

        const incompleteGroupMemberStreakTask = await streakoid.incompleteGroupMemberStreakTasks.create({
            userId,
            teamStreakId,
            groupMemberStreakId,
            streakType: StreakTypes.team,
        });

        incompleteGroupMemberStreakTaskId = incompleteGroupMemberStreakTask._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.groupMemberStreaks.deleteOne(groupMemberStreakId);
        await streakoid.incompleteGroupMemberStreakTasks.deleteOne(incompleteGroupMemberStreakTaskId);
    });

    test(`IncompleteGroupMemberStreakTasks can be retreived`, async () => {
        expect.assertions(10);

        const incompleteGroupMemberStreakTasks = await streakoid.incompleteGroupMemberStreakTasks.getAll({
            userId,
            teamStreakId,
            groupMemberStreakId,
            streakType: StreakTypes.team,
        });

        const incompleteGroupMemberStreakTask = incompleteGroupMemberStreakTasks[0];

        expect(incompleteGroupMemberStreakTask._id).toBeDefined();
        expect(incompleteGroupMemberStreakTask.userId).toEqual(userId);
        expect(incompleteGroupMemberStreakTask.groupMemberStreakId).toEqual(groupMemberStreakId);
        expect(incompleteGroupMemberStreakTask.streakType).toEqual(StreakTypes.team);
        expect(incompleteGroupMemberStreakTask.teamStreakId).toEqual(teamStreakId);
        expect(incompleteGroupMemberStreakTask.taskIncompleteTime).toEqual(expect.any(String));
        expect(incompleteGroupMemberStreakTask.taskIncompleteDay).toEqual(expect.any(String));
        expect(incompleteGroupMemberStreakTask.createdAt).toEqual(expect.any(String));
        expect(incompleteGroupMemberStreakTask.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(incompleteGroupMemberStreakTask).sort()).toEqual(
            [
                '_id',
                'userId',
                'groupMemberStreakId',
                'streakType',
                'teamStreakId',
                'taskIncompleteTime',
                'taskIncompleteDay',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });
});
