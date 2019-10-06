import { streakoid } from '../src/streakoid';

const email = 'get-complete-group-member-task@gmail.com';
const username = 'get-complete-group-member-task';

const streakName = '10 minutes journaling';

jest.setTimeout(120000);

describe('GET /complete-group-member-streak-tasks', () => {
    let userId: string;
    let teamStreakId: string;
    let groupMemberStreakId: string;
    let completeGroupMemberStreakTaskId: string;

    beforeAll(async () => {
        const registrationResponse = await streakoid.users.create({
            username,
            email,
        });
        userId = registrationResponse._id;
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

        const groupMemberStreakTaskComplete = await streakoid.completeGroupMemberStreakTasks.create({
            userId,
            teamStreakId,
            groupMemberStreakId,
        });
        completeGroupMemberStreakTaskId = groupMemberStreakTaskComplete._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.teamStreaks.deleteOne(teamStreakId);
        await streakoid.groupMemberStreaks.deleteOne(groupMemberStreakId);
        await streakoid.completeGroupMemberStreakTasks.deleteOne(completeGroupMemberStreakTaskId);
    });

    test(`completeGroupMemberStreakTasks can be retreived`, async () => {
        expect.assertions(11);

        const completeGroupMemberStreakTasks = await streakoid.completeGroupMemberStreakTasks.getAll({
            userId,
            teamStreakId,
            groupMemberStreakId,
        });

        expect(completeGroupMemberStreakTasks.length).toBeGreaterThanOrEqual(1);

        const completeGroupMemberStreakTask = completeGroupMemberStreakTasks[0];

        expect(completeGroupMemberStreakTask._id).toEqual(expect.any(String));
        expect(completeGroupMemberStreakTask.userId).toEqual(userId);
        expect(completeGroupMemberStreakTask.teamStreakId).toEqual(teamStreakId);
        expect(completeGroupMemberStreakTask.groupMemberStreakId).toEqual(groupMemberStreakId);
        expect(completeGroupMemberStreakTask.taskCompleteTime).toEqual(expect.any(String));
        expect(completeGroupMemberStreakTask.taskCompleteDay).toEqual(expect.any(String));
        expect(completeGroupMemberStreakTask.streakType).toEqual('group-member-streak');
        expect(completeGroupMemberStreakTask.createdAt).toBeDefined();
        expect(completeGroupMemberStreakTask.updatedAt).toBeDefined();
        expect(Object.keys(completeGroupMemberStreakTask).sort()).toEqual(
            [
                '_id',
                'userId',
                'teamStreakId',
                'groupMemberStreakId',
                'taskCompleteTime',
                'taskCompleteDay',
                'streakType',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });
});
