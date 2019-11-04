import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';

jest.setTimeout(120000);

describe('GET /complete-solo-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            const user = await getPayingUser();
            userId = user._id;
            streakoid = await streakoidTest();
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`completeTeamMemberStreakTasks can be retreived`, async () => {
        expect.assertions(10);

        const streakName = 'Daily Spanish';

        const creatorId = userId;
        const members = [{ memberId: userId }];
        const teamStreak = await streakoid.teamStreaks.create({ creatorId, streakName, members });
        const teamStreakId = teamStreak._id;

        const teamMemberStreaks = await streakoid.teamMemberStreaks.getAll({
            userId,
            teamStreakId,
        });
        const teamMemberStreak = teamMemberStreaks[0];
        const teamMemberStreakId = teamMemberStreak._id;

        await streakoid.completeTeamMemberStreakTasks.create({ userId, teamMemberStreakId, teamStreakId });

        const completeTeamMemberStreakTasks = await streakoid.completeTeamMemberStreakTasks.getAll({
            userId,
            teamStreakId,
            teamMemberStreakId,
        });

        expect(completeTeamMemberStreakTasks.length).toBeGreaterThanOrEqual(1);

        const completeTeamMemberStreakTask = completeTeamMemberStreakTasks[0];

        expect(completeTeamMemberStreakTask._id).toEqual(expect.any(String));
        expect(completeTeamMemberStreakTask.userId).toBeDefined();
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
