import { StreakoidFactory } from '../src/streakoid';
import { getUser, streakoidTest } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { connectToDatabase } from './setup/connectToDatabase';
import { disconnectFromDatabase } from './setup/disconnectFromDatabase';

jest.setTimeout(120000);

describe('GET /complete-solo-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    const streakName = 'Daily Spanish';

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await connectToDatabase();
            const user = await getUser();
            userId = user._id;
            streakoid = await streakoidTest();
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await disconnectFromDatabase();
        }
    });

    test(`incompleteTeamMemberStreakTasks can be retreived`, async () => {
        expect.assertions(9);

        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            members,
        });
        const teamStreakId = teamStreak._id;

        const teamMemberStreak = await streakoid.teamMemberStreaks.create({
            userId,
            teamStreakId,
        });
        const teamMemberStreakId = teamMemberStreak._id;

        // Team member streaks tasks must be completed before they can be incompleted.
        await streakoid.completeTeamMemberStreakTasks.create({
            userId,
            teamStreakId,
            teamMemberStreakId,
        });

        await streakoid.incompleteTeamMemberStreakTasks.create({
            userId,
            teamStreakId,
            teamMemberStreakId,
        });

        const incompleteTeamMemberStreakTasks = await streakoid.incompleteTeamMemberStreakTasks.getAll({
            userId,
            teamStreakId,
            teamMemberStreakId,
        });

        const incompleteTeamMemberStreakTask = incompleteTeamMemberStreakTasks[0];

        expect(incompleteTeamMemberStreakTask._id).toBeDefined();
        expect(incompleteTeamMemberStreakTask.userId).toEqual(userId);
        expect(incompleteTeamMemberStreakTask.teamMemberStreakId).toEqual(teamMemberStreakId);
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
