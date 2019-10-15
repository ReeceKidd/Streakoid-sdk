import { StreakTypes } from '../src';
import { StreakoidFactory } from '../src/streakoid';
import { getUser, streakoidTest } from './setup/streakoidTest';

const streakName = '10 minutes journaling';

jest.setTimeout(120000);

describe('GET /incomplete-solo-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let teamStreakId: string;
    let teamMemberStreakId: string;
    let incompleteTeamMemberStreakTaskId: string;

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

        // Group member streaks tasks must be completed before they can be incompleted.
        await streakoid.completeTeamMemberStreakTasks.create({
            userId,
            teamStreakId,
            teamMemberStreakId,
            streakType: StreakTypes.teamMember,
        });

        const incompleteTeamMemberStreakTask = await streakoid.incompleteTeamMemberStreakTasks.create({
            userId,
            teamStreakId,
            teamMemberStreakId,
            streakType: StreakTypes.teamMember,
        });

        incompleteTeamMemberStreakTaskId = incompleteTeamMemberStreakTask._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.teamMemberStreaks.deleteOne(teamMemberStreakId);
        await streakoid.incompleteTeamMemberStreakTasks.deleteOne(incompleteTeamMemberStreakTaskId);
    });

    test(`IncompleteTeamMemberStreakTasks can be retreived`, async () => {
        expect.assertions(10);

        const incompleteTeamMemberStreakTasks = await streakoid.incompleteTeamMemberStreakTasks.getAll({
            userId,
            teamStreakId,
            teamMemberStreakId,
            streakType: StreakTypes.teamMember,
        });

        const incompleteTeamMemberStreakTask = incompleteTeamMemberStreakTasks[0];

        expect(incompleteTeamMemberStreakTask._id).toBeDefined();
        expect(incompleteTeamMemberStreakTask.userId).toEqual(userId);
        expect(incompleteTeamMemberStreakTask.teamMemberStreakId).toEqual(teamMemberStreakId);
        expect(incompleteTeamMemberStreakTask.streakType).toEqual(StreakTypes.teamMember);
        expect(incompleteTeamMemberStreakTask.teamStreakId).toEqual(teamStreakId);
        expect(incompleteTeamMemberStreakTask.taskIncompleteTime).toEqual(expect.any(String));
        expect(incompleteTeamMemberStreakTask.taskIncompleteDay).toEqual(expect.any(String));
        expect(incompleteTeamMemberStreakTask.createdAt).toEqual(expect.any(String));
        expect(incompleteTeamMemberStreakTask.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(incompleteTeamMemberStreakTask).sort()).toEqual(
            [
                '_id',
                'userId',
                'teamMemberStreakId',
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
