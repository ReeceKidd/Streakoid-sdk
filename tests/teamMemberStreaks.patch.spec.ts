import { StreakoidFactory } from '../src/streakoid';
import { PastStreak } from '../src';
import { getUser, streakoidTest } from './setup/streakoidTest';

const streakName = 'Daily Italian';

jest.setTimeout(120000);

describe('GET /team-member-streaks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let teamStreakId: string;
    let teamMemberStreakId: string;
    let secondteamStreakId: string;
    let secondTeamMemberStreakId: string;
    let completedTeamMemberStreakTaskId: string;

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

        const teamMemberStreak = await streakoid.teamMemberStreaks.create({
            userId,
            teamStreakId,
        });
        teamMemberStreakId = teamMemberStreak._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.teamStreaks.deleteOne(teamStreakId);
        await streakoid.teamStreaks.deleteOne(secondteamStreakId);
        await streakoid.teamMemberStreaks.deleteOne(teamMemberStreakId);
        await streakoid.teamMemberStreaks.deleteOne(secondTeamMemberStreakId);
        await streakoid.completeTeamMemberStreakTasks.deleteOne(completedTeamMemberStreakTaskId);
    });

    test(`request passes when team member streak is patched with correct keys`, async () => {
        expect.assertions(13);

        const timezone = 'Europe/Paris';
        const completedToday = false;
        const active = false;
        const currentStreak = {
            numberOfDaysInARow: 10,
            startDate: new Date().toString(),
        };
        const pastStreaks: PastStreak[] = [];

        const updatedTeamMemberStreak = await streakoid.teamMemberStreaks.update({
            teamMemberStreakId,
            updateData: {
                timezone,
                completedToday,
                active,
                currentStreak,
                pastStreaks,
            },
        });

        expect(updatedTeamMemberStreak._id).toEqual(expect.any(String));
        expect(updatedTeamMemberStreak.currentStreak.numberOfDaysInARow).toEqual(10);
        expect(updatedTeamMemberStreak.currentStreak.startDate).toEqual(expect.any(String));
        expect(Object.keys(updatedTeamMemberStreak.currentStreak).sort()).toEqual(
            ['startDate', 'numberOfDaysInARow'].sort(),
        );
        expect(updatedTeamMemberStreak.completedToday).toEqual(false);
        expect(updatedTeamMemberStreak.active).toEqual(false);
        expect(updatedTeamMemberStreak.pastStreaks).toEqual([]);
        expect(updatedTeamMemberStreak.userId).toEqual(expect.any(String));
        expect(updatedTeamMemberStreak.teamStreakId).toEqual(expect.any(String));
        expect(updatedTeamMemberStreak.timezone).toEqual(timezone);
        expect(updatedTeamMemberStreak.createdAt).toEqual(expect.any(String));
        expect(updatedTeamMemberStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(updatedTeamMemberStreak).sort()).toEqual(
            [
                '_id',
                'currentStreak',
                'completedToday',
                'active',
                'pastStreaks',
                'userId',
                'teamStreakId',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });
});
