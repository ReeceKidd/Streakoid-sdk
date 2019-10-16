import { StreakoidFactory } from '../src/streakoid';
import { getUser, streakoidTest } from './setup/streakoidTest';

const streakName = '10 minutes journaling';

jest.setTimeout(120000);

describe('GET /complete-solo-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let teamStreakId: string;
    let completeTeamStreakId: string;
    let teamMemberStreakId: string;
    let completeTeamMemberStreakTaskId: string;

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
        });
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.teamStreaks.deleteOne(teamStreakId);
        await streakoid.completeTeamStreaks.deleteOne(completeTeamStreakId);
        await streakoid.teamMemberStreaks.deleteOne(teamMemberStreakId);
        await streakoid.completeTeamMemberStreakTasks.deleteOne(completeTeamMemberStreakTaskId);
    });

    test(`completeTeamStreaks can be retreived`, async () => {
        expect.assertions(7);

        const completeTeamStreaks = await streakoid.completeTeamStreaks.getAll({ teamStreakId });
        const completeTeamStreak = completeTeamStreaks[0];
        completeTeamStreakId = completeTeamStreak._id;

        expect(completeTeamStreak._id).toBeDefined();
        expect(completeTeamStreak.teamStreakId).toEqual(teamStreakId);
        expect(completeTeamStreak.taskCompleteTime).toEqual(expect.any(String));
        expect(completeTeamStreak.taskCompleteDay).toEqual(expect.any(String));
        expect(completeTeamStreak.createdAt).toEqual(expect.any(String));
        expect(completeTeamStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(completeTeamStreak).sort()).toEqual(
            ['_id', 'teamStreakId', 'taskCompleteTime', 'taskCompleteDay', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });
});
