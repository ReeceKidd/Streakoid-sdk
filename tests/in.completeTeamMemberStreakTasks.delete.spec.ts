import { StreakTypes } from '../src';
import { StreakoidFactory } from '../src/streakoid';
import { getUser, streakoidTest } from './setup/streakoidTest';

jest.setTimeout(120000);

describe('DELETE /incomplete-solo-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let teamStreakId: string;
    let teamMemberStreakId: string;
    let incompleteTeamMemberStreakTaskId: string;

    const streakName = 'Intermittent fasting';

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
    });

    describe('DELETE /v1/incomplete-solo-streak-tasks', () => {
        test('deletes incomplete-solo-streak-tasks', async () => {
            expect.assertions(1);

            const response = await streakoid.incompleteTeamMemberStreakTasks.deleteOne(
                incompleteTeamMemberStreakTaskId,
            );

            expect(response.status).toEqual(204);
        });
    });
});
