import { streakoid } from '../src/streakoid';
import { StreakTypes } from '../src';

const email = 'delete-incomplete-group-member-streak-tasks-user@gmail.com';
const username = 'delete-incomplete-group-member-streak-tasks-user';

jest.setTimeout(120000);

describe('DELETE /incomplete-solo-streak-tasks', () => {
    let userId: string;
    let teamStreakId: string;
    let groupMemberStreakId: string;
    let incompleteGroupMemberStreakTaskId: string;

    const streakName = 'Intermittent fasting';

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
    });

    describe('DELETE /v1/incomplete-solo-streak-tasks', () => {
        test('deletes incomplete-solo-streak-tasks', async () => {
            expect.assertions(1);

            const response = await streakoid.incompleteGroupMemberStreakTasks.deleteOne(
                incompleteGroupMemberStreakTaskId,
            );

            expect(response.status).toEqual(204);
        });
    });
});
