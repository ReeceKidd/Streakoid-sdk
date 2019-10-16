import { StreakoidFactory } from '../src/streakoid';
import { getUser, streakoidTest } from './setup/streakoidTest';

const streakName = '10 minutes journaling';

jest.setTimeout(120000);

describe('GET /complete-team-member-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let teamStreakId: string;
    let teamMemberStreakId: string;
    let completeTeamMemberStreakTaskId: string;

    beforeAll(async () => {
        const user = await getUser();
        userId = user._id;
        streakoid = await streakoidTest();
        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            members,
        });
        teamStreakId = teamStreak._id;

        const teamMemberStreak = await streakoid.teamMemberStreaks.create({
            userId,
            teamStreakId,
        });
        teamMemberStreakId = teamMemberStreak._id;

        const teamMemberStreakTaskComplete = await streakoid.completeTeamMemberStreakTasks.create({
            userId,
            teamStreakId,
            teamMemberStreakId,
        });
        completeTeamMemberStreakTaskId = teamMemberStreakTaskComplete._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.teamStreaks.deleteOne(teamStreakId);
        await streakoid.teamMemberStreaks.deleteOne(teamMemberStreakId);
        await streakoid.completeTeamMemberStreakTasks.deleteOne(completeTeamMemberStreakTaskId);
    });

    test(`completeTeamMemberStreakTasks can be retreived`, async () => {
        expect.assertions(10);

        const completeTeamMemberStreakTasks = await streakoid.completeTeamMemberStreakTasks.getAll({
            userId,
            teamStreakId,
            teamMemberStreakId,
        });

        expect(completeTeamMemberStreakTasks.length).toBeGreaterThanOrEqual(1);

        const completeTeamMemberStreakTask = completeTeamMemberStreakTasks[0];

        expect(completeTeamMemberStreakTask._id).toEqual(expect.any(String));
        expect(completeTeamMemberStreakTask.userId).toEqual(userId);
        expect(completeTeamMemberStreakTask.teamStreakId).toEqual(teamStreakId);
        expect(completeTeamMemberStreakTask.teamMemberStreakId).toEqual(teamMemberStreakId);
        expect(completeTeamMemberStreakTask.taskCompleteTime).toEqual(expect.any(String));
        expect(completeTeamMemberStreakTask.taskCompleteDay).toEqual(expect.any(String));
        expect(completeTeamMemberStreakTask.createdAt).toBeDefined();
        expect(completeTeamMemberStreakTask.updatedAt).toBeDefined();
        expect(Object.keys(completeTeamMemberStreakTask).sort()).toEqual(
            [
                '_id',
                'userId',
                'teamStreakId',
                'teamMemberStreakId',
                'taskCompleteTime',
                'taskCompleteDay',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });
});
