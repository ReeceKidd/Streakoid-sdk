import { streakoidFactory, streakoidClient } from './streakoid';

describe('SDK teamMemberStreaks', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        test('calls GET with correct URL when no query paramters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.teamMemberStreaks.getAll({});

            expect(streakoidClient.get).toBeCalledWith(`/v1/group-member-streaks?`);
        });

        test('calls GET with correct URL when userId query paramater is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            const userId = 'userId';

            await streakoid.teamMemberStreaks.getAll({ userId });

            expect(streakoidClient.get).toBeCalledWith(`/v1/group-member-streaks?userId=${userId}&`);
        });

        test('calls GET with correct URL when completedToday query paramater is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            const completedToday = true;

            await streakoid.teamMemberStreaks.getAll({ completedToday });

            expect(streakoidClient.get).toBeCalledWith(`/v1/group-member-streaks?completedToday=true&`);
        });

        test('calls GET with correct URL when timezone query paramater is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            const timezone = `Europe/London`;

            await streakoid.teamMemberStreaks.getAll({ timezone });

            expect(streakoidClient.get).toBeCalledWith(`/v1/group-member-streaks?timezone=${timezone}&`);
        });

        test('calls GET with correct URL when active query paramater is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            const active = true;

            await streakoid.teamMemberStreaks.getAll({ active });

            expect(streakoidClient.get).toBeCalledWith(`/v1/group-member-streaks?active=${active}`);
        });
    });

    describe('getOne', () => {
        test('calls GET with correct URL', async () => {
            expect.assertions(1);

            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.teamMemberStreaks.getOne('id');

            expect(streakoidClient.get).toBeCalledWith(`/v1/group-member-streaks/id`);
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

            expect(streakoidClient.post).toBeCalledWith(`/v1/group-member-streaks`, {
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

            expect(streakoidClient.patch).toBeCalledWith(`/v1/group-member-streaks/id`, {
                ...updateData,
            });
        });
    });

    describe('deleteOne', () => {
        test('calls DELETE correct URL ', async () => {
            expect.assertions(1);
            streakoidClient.delete = jest.fn();

            await streakoid.teamMemberStreaks.deleteOne('id');

            expect(streakoidClient.delete).toBeCalledWith(`/v1/group-member-streaks/id`);
        });
    });
});
