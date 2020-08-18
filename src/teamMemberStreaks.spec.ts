import { teamMemberStreaks as teamMemberStreaksImport, GetAllTeamMemberStreaksSortFields } from './teamMemberStreaks';
import { CurrentStreak } from '@streakoid/streakoid-models/lib/Models/CurrentStreak';
import VisibilityTypes from '@streakoid/streakoid-models/lib/Types/VisibilityTypes';
import { PastStreak } from '@streakoid/streakoid-models/lib/Models/PastStreak';
describe('SDK teamMemberStreaks', () => {
    const getRequest = jest.fn().mockResolvedValue(true);
    const postRequest = jest.fn().mockResolvedValue(true);
    const patchRequest = jest.fn().mockResolvedValue(true);
    const teamMemberStreaks = teamMemberStreaksImport({
        getRequest,
        postRequest,
        patchRequest,
    });

    describe('getAll', () => {
        const userId = 'userId';
        const teamStreakId = 'teamStreakId';
        const completedToday = true;
        const timezone = 'Europe/London';
        const active = true;
        const sortField = GetAllTeamMemberStreaksSortFields.currentStreak;
        const limit = 20;

        const query = {
            userId,
            teamStreakId,
            completedToday,
            timezone,
            active,
            sortField,
            limit,
        };

        test('calls GET with correct URL when no query parameters are passed', async () => {
            expect.assertions(1);

            await teamMemberStreaks.getAll({});

            expect(getRequest).toBeCalledWith({ route: `/v1/team-member-streaks?` });
        });

        test('calls GET with correct URL when userId query paramter is passed', async () => {
            expect.assertions(1);

            await teamMemberStreaks.getAll({ userId });

            expect(getRequest).toBeCalledWith({ route: `/v1/team-member-streaks?userId=${userId}&` });
        });

        test('calls GET with correct URL when teamStreakId query paramter is passed', async () => {
            expect.assertions(1);

            await teamMemberStreaks.getAll({ teamStreakId });

            expect(getRequest).toBeCalledWith({ route: `/v1/team-member-streaks?teamStreakId=${teamStreakId}&` });
        });

        test('calls GET with correct URL when completedToday query paramter is passed', async () => {
            expect.assertions(1);

            await teamMemberStreaks.getAll({ completedToday });

            expect(getRequest).toBeCalledWith({ route: `/v1/team-member-streaks?completedToday=true&` });
        });

        test('calls GET with correct URL when timezone query paramter is passed', async () => {
            expect.assertions(1);

            await teamMemberStreaks.getAll({ timezone });

            expect(getRequest).toBeCalledWith({ route: `/v1/team-member-streaks?timezone=${timezone}&` });
        });

        test('calls GET with correct URL when active query paramter is passed', async () => {
            expect.assertions(1);

            await teamMemberStreaks.getAll({ active });

            expect(getRequest).toBeCalledWith({ route: `/v1/team-member-streaks?active=${active}&` });
        });

        test('calls GET with correct URL when active sort paramter is passed', async () => {
            expect.assertions(1);

            await teamMemberStreaks.getAll({ sortField });

            expect(getRequest).toBeCalledWith({
                route: `/v1/team-member-streaks?sortField=${sortField}&`,
            });
        });

        test('calls GET with correct URL when limit paramter is passed', async () => {
            expect.assertions(1);

            await teamMemberStreaks.getAll({ limit });

            expect(getRequest).toBeCalledWith({
                route: `/v1/team-member-streaks?limit=${limit}&`,
            });
        });

        test('calls GET with correct URL when all query parameters are passed', async () => {
            expect.assertions(1);

            await teamMemberStreaks.getAll(query);

            expect(getRequest).toBeCalledWith({
                route: `/v1/team-member-streaks?userId=${userId}&teamStreakId=${teamStreakId}&completedToday=${completedToday}&timezone=${timezone}&active=${active}&sortField=${sortField}&limit=${limit}&`,
            });
        });
    });

    describe('getOne', () => {
        test('calls GET with correct URL', async () => {
            expect.assertions(1);

            await teamMemberStreaks.getOne('id');

            expect(getRequest).toBeCalledWith({ route: `/v1/team-member-streaks/id` });
        });
    });

    describe('create', () => {
        test('calls POST with correct URL and  parameters', async () => {
            expect.assertions(1);

            const userId = 'userId';
            const teamStreakId = 'teamStreakId';

            await teamMemberStreaks.create({
                userId,
                teamStreakId,
            });

            expect(postRequest).toBeCalledWith({
                route: `/v1/team-member-streaks`,
                params: {
                    userId,
                    teamStreakId,
                },
            });
        });
    });

    describe('update', () => {
        test('calls PATCH with correct URL and  parameters', async () => {
            expect.assertions(1);

            const completedToday = false;
            const active = true;
            const currentStreak: CurrentStreak = {
                numberOfDaysInARow: 10,
                startDate: new Date().toString(),
                endDate: new Date().toString(),
            };
            const pastStreaks: PastStreak[] = [];
            const visibility = VisibilityTypes.onlyMe;

            const timezone = 'Europe/Paris';
            const updateData = {
                timezone,
                completedToday,
                active,
                currentStreak,
                pastStreaks,
                visibility,
            };

            await teamMemberStreaks.update({
                teamMemberStreakId: 'id',
                updateData,
            });

            expect(patchRequest).toBeCalledWith({
                route: `/v1/team-member-streaks/id`,
                params: updateData,
            });
        });
    });

    describe('recover', () => {
        test('calls POST with correct URL', async () => {
            expect.assertions(1);

            await teamMemberStreaks.recover({
                teamMemberStreakId: 'id',
            });

            expect(postRequest).toBeCalledWith({
                route: `/v1/team-member-streaks/id/recover`,
                params: {},
            });
        });
    });
});
