import { streakoidFactory, streakoidClient } from './streakoid';
import StreakStatus from './StreakStatus';
import { GetAllChallengeStreaksSortFields } from './challengeStreak';

describe('SDK challengeStreaks', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        test('calls GET with correct URL when no query paramters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.challengeStreaks.getAll({});

            expect(streakoidClient.get).toBeCalledWith(`/v1/challenge-streaks?`);
        });

        test('calls GET with correct URL when userId query paramater is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            const userId = 'userId';

            await streakoid.challengeStreaks.getAll({ userId });

            expect(streakoidClient.get).toBeCalledWith(`/v1/challenge-streaks?userId=${userId}&`);
        });

        test('calls GET with correct URL when challengeId query paramater is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            const challengeId = 'challengeId';

            await streakoid.challengeStreaks.getAll({ challengeId });

            expect(streakoidClient.get).toBeCalledWith(`/v1/challenge-streaks?challengeId=${challengeId}&`);
        });

        test('calls GET with correct URL when completedToday query paramater is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            const completedToday = true;

            await streakoid.challengeStreaks.getAll({ completedToday });

            expect(streakoidClient.get).toBeCalledWith(`/v1/challenge-streaks?completedToday=true&`);
        });

        test('calls GET with correct URL when timezone query paramater is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            const timezone = `Europe/London`;

            await streakoid.challengeStreaks.getAll({ timezone });

            expect(streakoidClient.get).toBeCalledWith(`/v1/challenge-streaks?timezone=${timezone}&`);
        });

        test('calls GET with correct URL when active query paramater is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            const active = true;

            await streakoid.challengeStreaks.getAll({ active });

            expect(streakoidClient.get).toBeCalledWith(`/v1/challenge-streaks?active=${active}&`);
        });

        test('calls GET with correct URL when status query paramater is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            const status = StreakStatus.live;

            await streakoid.challengeStreaks.getAll({ status });

            expect(streakoidClient.get).toBeCalledWith(`/v1/challenge-streaks?status=${status}&`);
        });

        test('calls GET with correct URL when sortField query paramater is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            const sortField = GetAllChallengeStreaksSortFields.currentStreak;

            await streakoid.challengeStreaks.getAll({ sortField });

            expect(streakoidClient.get).toBeCalledWith(`/v1/challenge-streaks?sortField=${sortField}&`);
        });
    });

    describe('getOne', () => {
        test('calls GET with correct URL', async () => {
            expect.assertions(1);

            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.challengeStreaks.getOne({ challengeStreakId: 'id' });

            expect(streakoidClient.get).toBeCalledWith(`/v1/challenge-streaks/id`);
        });
    });

    describe('create', () => {
        test('calls POST with correct URL and  parmaters', async () => {
            expect.assertions(1);

            streakoidClient.post = jest.fn().mockResolvedValue(true);
            const userId = 'userId';
            const challengeId = 'challengeId';

            await streakoid.challengeStreaks.create({
                userId,
                challengeId,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/challenge-streaks`, {
                userId,
                challengeId,
            });
        });
    });

    describe('update', () => {
        test('calls PATCH with correct URL and  parmaters', async () => {
            expect.assertions(1);

            const completedToday = true;
            const timezone = 'Europe/London';

            streakoidClient.patch = jest.fn().mockResolvedValue(true);
            const updateData = {
                completedToday,
                timezone,
            };

            await streakoid.challengeStreaks.update({
                challengeStreakId: 'id',
                updateData,
            });

            expect(streakoidClient.patch).toBeCalledWith(`/v1/challenge-streaks/id`, {
                ...updateData,
            });
        });
    });
});
