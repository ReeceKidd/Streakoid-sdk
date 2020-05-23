import { streakoidFactory, streakoidClient } from './streakoid';

describe('SDK teamMemberStreaks', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        const userId = 'userId';
        const teamStreakId = 'teamStreakId';
        const completedToday = true;
        const timezone = 'Europe/London';
        const active = true;

        const query = {
            userId,
            teamStreakId,
            completedToday,
            timezone,
            active,
        };

        test('calls GET with correct URL when no query parameters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.teamMemberStreaks.getAll({});

            expect(streakoidClient.get).toBeCalledWith(`/v1/team-member-streaks?`);
        });

        test('calls GET with correct URL when userId query paramter is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.teamMemberStreaks.getAll({ userId });

            expect(streakoidClient.get).toBeCalledWith(`/v1/team-member-streaks?userId=${userId}&`);
        });

        test('calls GET with correct URL when teamStreakId query paramter is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.teamMemberStreaks.getAll({ teamStreakId });

            expect(streakoidClient.get).toBeCalledWith(`/v1/team-member-streaks?teamStreakId=${teamStreakId}&`);
        });

        test('calls GET with correct URL when completedToday query paramter is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.teamMemberStreaks.getAll({ completedToday });

            expect(streakoidClient.get).toBeCalledWith(`/v1/team-member-streaks?completedToday=true&`);
        });

        test('calls GET with correct URL when timezone query paramter is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.teamMemberStreaks.getAll({ timezone });

            expect(streakoidClient.get).toBeCalledWith(`/v1/team-member-streaks?timezone=${timezone}&`);
        });

        test('calls GET with correct URL when active query paramter is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.teamMemberStreaks.getAll({ active });

            expect(streakoidClient.get).toBeCalledWith(`/v1/team-member-streaks?active=${active}`);
        });

        test('calls GET with correct URL when all query paramaters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.teamMemberStreaks.getAll(query);

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/team-member-streaks?userId=${userId}&teamStreakId=${teamStreakId}&completedToday=${completedToday}&timezone=${timezone}&active=${active}`,
            );
        });
    });

    describe('getOne', () => {
        test('calls GET with correct URL', async () => {
            expect.assertions(1);

            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.teamMemberStreaks.getOne('id');

            expect(streakoidClient.get).toBeCalledWith(`/v1/team-member-streaks/id`);
        });
    });

    describe('create', () => {
        test('calls POST with correct URL and  parmaters', async () => {
            expect.assertions(1);

            streakoidClient.post = jest.fn().mockResolvedValue(true);

            const userId = 'userId';
            const teamStreakId = 'teamStreakId';

            await streakoid.teamMemberStreaks.create({
                userId,
                teamStreakId,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/team-member-streaks`, {
                userId,
                teamStreakId,
            });
        });
    });

    describe('update', () => {
        test('calls PATCH with correct URL and  parmaters', async () => {
            expect.assertions(1);

            streakoidClient.patch = jest.fn().mockResolvedValue(true);
            const timezone = 'Europe/Paris';
            const updateData = {
                timezone,
            };

            await streakoid.teamMemberStreaks.update({
                teamMemberStreakId: 'id',
                updateData,
            });

            expect(streakoidClient.patch).toBeCalledWith(`/v1/team-member-streaks/id`, {
                ...updateData,
            });
        });
    });
});
