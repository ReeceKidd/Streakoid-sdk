import { StreakoidFactory } from '../src/streakoid';
import { getUser, streakoidTest } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { connectToDatabase } from './setup/connectToDatabase';
import { disconnectFromDatabase } from './setup/disconnectFromDatabase';

jest.setTimeout(120000);

describe('GET /complete-solo-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;

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

    test(`completeTeamStreaks can be retreived`, async () => {
        expect.assertions(7);

        const creatorId = userId;
        const members = [{ memberId: userId }];

        const streakName = 'Daily Spanish';

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId,
            streakName,
            members,
        });
        const teamStreakId = teamStreak._id;

        const teamMemberStreaks = await streakoid.teamMemberStreaks.getAll({
            userId: userId,
            teamStreakId: teamStreak._id,
        });
        const teamMemberStreak = teamMemberStreaks[0];

        await streakoid.completeTeamMemberStreakTasks.create({
            userId,
            teamMemberStreakId: teamMemberStreak._id,
            teamStreakId,
        });

        const completeTeamStreaks = await streakoid.completeTeamStreaks.getAll({ teamStreakId });
        const completeTeamStreak = completeTeamStreaks[0];

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