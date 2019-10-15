import { StreakTypes } from '../src';
import { StreakoidFactory } from '../src/streakoid';
import { getUser, streakoidTest } from './setup/streakoidTest';

jest.setTimeout(120000);

describe('DELETE /complete-group-member-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let teamStreakId: string;
    let teamMemberStreakId: string;
    let completeTeamMemberStreakTaskId: string;

    const streakName = 'Intermittent fasting';
    const streakDescription = 'I will not eat until 1pm everyday';

    beforeAll(async () => {
        const user = await getUser();
        userId = user._id;
        streakoid = await streakoidTest();
        userId = user._id;
        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            streakDescription,
            members,
        });
        teamStreakId = teamStreak._id;

        const teamMemberStreak = await streakoid.teamMemberStreaks.create({
            userId,
            teamStreakId,
        });
        teamMemberStreakId = teamMemberStreak._id;

        const completeTeamMemberStreakTask = await streakoid.completeTeamMemberStreakTasks.create({
            userId,
            teamStreakId,
            teamMemberStreakId,
            streakType: StreakTypes.teamMember,
        });
        completeTeamMemberStreakTaskId = completeTeamMemberStreakTask._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.teamStreaks.deleteOne(teamStreakId);
    });

    describe('DELETE /v1/complete-group-member-streak-tasks', () => {
        test('deletes complete-group-member-streak-tasks', async () => {
            expect.assertions(1);

            const response = await streakoid.completeTeamMemberStreakTasks.deleteOne(completeTeamMemberStreakTaskId);

            expect(response.status).toEqual(204);
        });
    });
});
