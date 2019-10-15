import { londonTimezone, StreakoidFactory } from '../src/streakoid';
import { StreakTypes } from '../src';
import { getUser, streakoidTest } from './setup/streakoidTest';

const streakName = 'Daily Italian';

jest.setTimeout(120000);

describe('GET /group-member-streaks', () => {
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

    test(`team member streaks can be retreived with userId query parameter`, async () => {
        expect.assertions(13);

        const teamMemberStreaks = await streakoid.teamMemberStreaks.getAll({
            userId,
        });
        expect(teamMemberStreaks.length).toBeGreaterThanOrEqual(1);

        const teamMemberStreak = teamMemberStreaks[0];

        expect(teamMemberStreak._id).toEqual(expect.any(String));
        expect(teamMemberStreak.currentStreak.numberOfDaysInARow).toEqual(0);
        expect(Object.keys(teamMemberStreak.currentStreak).sort()).toEqual(['numberOfDaysInARow'].sort());
        expect(teamMemberStreak.completedToday).toEqual(false);
        expect(teamMemberStreak.active).toEqual(false);
        expect(teamMemberStreak.pastStreaks).toEqual([]);
        expect(teamMemberStreak.userId).toEqual(expect.any(String));
        expect(teamMemberStreak.teamStreakId).toEqual(expect.any(String));
        expect(teamMemberStreak.timezone).toEqual(londonTimezone);
        expect(teamMemberStreak.createdAt).toEqual(expect.any(String));
        expect(teamMemberStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(teamMemberStreak).sort()).toEqual(
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

    test(`team member streaks can be retreieved with timezone query parameter`, async () => {
        expect.assertions(13);

        const teamMemberStreaks = await streakoid.teamMemberStreaks.getAll({
            timezone: londonTimezone,
        });
        expect(teamMemberStreaks.length).toBeGreaterThanOrEqual(1);

        const teamMemberStreak = teamMemberStreaks[0];

        expect(teamMemberStreak._id).toEqual(expect.any(String));
        expect(teamMemberStreak.currentStreak.numberOfDaysInARow).toEqual(0);
        expect(Object.keys(teamMemberStreak.currentStreak).sort()).toEqual(['numberOfDaysInARow'].sort());
        expect(teamMemberStreak.completedToday).toEqual(false);
        expect(teamMemberStreak.active).toEqual(false);
        expect(teamMemberStreak.pastStreaks).toEqual([]);
        expect(teamMemberStreak.userId).toEqual(expect.any(String));
        expect(teamMemberStreak.teamStreakId).toEqual(expect.any(String));
        expect(teamMemberStreak.timezone).toEqual(londonTimezone);
        expect(teamMemberStreak.createdAt).toEqual(expect.any(String));
        expect(teamMemberStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(teamMemberStreak).sort()).toEqual(
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

    test('team member streaks not completed today can be retreived', async () => {
        expect.assertions(13);

        const teamMemberStreaks = await streakoid.teamMemberStreaks.getAll({
            completedToday: false,
            active: false,
        });
        expect(teamMemberStreaks.length).toBeGreaterThanOrEqual(1);

        const teamMemberStreak = teamMemberStreaks[0];

        expect(teamMemberStreak._id).toEqual(expect.any(String));
        expect(teamMemberStreak.currentStreak.numberOfDaysInARow).toEqual(0);
        expect(Object.keys(teamMemberStreak.currentStreak).sort()).toEqual(['numberOfDaysInARow'].sort());
        expect(teamMemberStreak.completedToday).toEqual(false);
        expect(teamMemberStreak.active).toEqual(false);
        expect(teamMemberStreak.pastStreaks).toEqual([]);
        expect(teamMemberStreak.userId).toEqual(expect.any(String));
        expect(teamMemberStreak.teamStreakId).toEqual(expect.any(String));
        expect(teamMemberStreak.timezone).toEqual(londonTimezone);
        expect(teamMemberStreak.createdAt).toEqual(expect.any(String));
        expect(teamMemberStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(teamMemberStreak).sort()).toEqual(
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

    test('team member streaks that have been completed today can be retreived', async () => {
        expect.assertions(14);

        const streakName = '30 minutes of reading';

        const members = [{ memberId: userId }];

        const createdteamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            members,
        });
        secondteamStreakId = createdteamStreak._id;

        const createdTeamMemberStreak = await streakoid.teamMemberStreaks.create({
            userId,
            teamStreakId,
        });
        secondTeamMemberStreakId = createdTeamMemberStreak._id;

        const completedTeamMemberStreakTask = await streakoid.completeTeamMemberStreakTasks.create({
            userId,
            teamStreakId: secondteamStreakId,
            teamMemberStreakId: secondTeamMemberStreakId,
            streakType: StreakTypes.teamMember,
        });
        completedTeamMemberStreakTaskId = completedTeamMemberStreakTask._id;

        const teamMemberStreaks = await streakoid.teamMemberStreaks.getAll({
            completedToday: true,
        });
        expect(teamMemberStreaks.length).toBeGreaterThanOrEqual(1);

        const teamMemberStreak = teamMemberStreaks[0];

        expect(teamMemberStreak._id).toEqual(expect.any(String));
        expect(teamMemberStreak.currentStreak.numberOfDaysInARow).toEqual(1);
        expect(teamMemberStreak.currentStreak.startDate).toEqual(expect.any(String));
        expect(Object.keys(teamMemberStreak.currentStreak).sort()).toEqual(['numberOfDaysInARow', 'startDate'].sort());
        expect(teamMemberStreak.completedToday).toEqual(true);
        expect(teamMemberStreak.active).toEqual(true);
        expect(teamMemberStreak.pastStreaks).toEqual([]);
        expect(teamMemberStreak.userId).toEqual(expect.any(String));
        expect(teamMemberStreak.teamStreakId).toEqual(expect.any(String));
        expect(teamMemberStreak.timezone).toEqual(londonTimezone);
        expect(teamMemberStreak.createdAt).toEqual(expect.any(String));
        expect(teamMemberStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(teamMemberStreak).sort()).toEqual(
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
