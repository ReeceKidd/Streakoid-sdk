import { StreakoidFactory } from '../src/streakoid';
import { getUser, streakoidTest } from './setup/streakoidTest';
import { StreakTypes } from '../src';

jest.setTimeout(120000);

describe('DELETE /complete-team-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let teamStreakId: string;
    let completeTeamStreakId: string;
    let teamMemberStreakId: string;
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

        const teamMemberStreaks = await streakoid.teamMemberStreaks.getAll({ userId });
        const teamMemberStreak = teamMemberStreaks[0];
        teamMemberStreakId = teamMemberStreak._id;

        await streakoid.completeTeamMemberStreakTasks.create({
            userId,
            teamMemberStreakId,
            teamStreakId,
            streakType: StreakTypes.teamMember,
        });
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.teamStreaks.deleteOne(teamStreakId);
    });

    describe('DELETE /v1/complete-team-streak-tasks', () => {
        test('deletes complete-team-streak-tasks', async () => {
            expect.assertions(1);

            const completeTeamStreaks = await streakoid.completeTeamStreaks.getAll({ teamStreakId });
            const completeTeamStreak = completeTeamStreaks[0];
            completeTeamStreakId = completeTeamStreak._id;

            const response = await streakoid.completeTeamStreaks.deleteOne(completeTeamStreakId);

            expect(response.status).toEqual(204);
        });
    });
});
