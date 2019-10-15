import { StreakoidFactory } from '../src/streakoid';
import { getUser, streakoidTest } from './setup/streakoidTest';

jest.setTimeout(120000);

describe('DELETE /complete-team-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let teamStreakId: string;
    let completeTeamStreakTaskId: string;

    const streakName = 'Intermittent fasting';

    beforeAll(async () => {
        const user = await getUser();
        userId = user._id;
        streakoid = await streakoidTest();
        userId = user._id;

        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            members,
        });
        teamStreakId = teamStreak._id;

        const completeTeamStreakTask = await streakoid.completeTeamStreakTasks.create({
            teamStreakId,
        });
        completeTeamStreakTaskId = completeTeamStreakTask._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.teamStreaks.deleteOne(teamStreakId);
    });

    describe('DELETE /v1/complete-team-streak-tasks', () => {
        test('deletes complete-team-streak-tasks', async () => {
            expect.assertions(1);

            const response = await streakoid.completeTeamStreakTasks.deleteOne(completeTeamStreakTaskId);

            expect(response.status).toEqual(204);
        });
    });
});
