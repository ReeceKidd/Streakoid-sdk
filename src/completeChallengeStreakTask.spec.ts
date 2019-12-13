import { streakoidFactory, streakoidClient } from './streakoid';

describe('SDK completeChallengeStreakTasks', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        test('calls GET with correct URL when just userId is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.completeChallengeStreakTasks.getAll({ userId: 'userId' });

            expect(streakoidClient.get).toBeCalledWith(`/v1/complete-challenge-streak-tasks?userId=userId&`);
        });

        test('calls GET with correct URL when just streakId is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.completeChallengeStreakTasks.getAll({ challengeStreakId: 'challengeStreakId' });

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/complete-challenge-streak-tasks?challengeStreakId=challengeStreakId`,
            );
        });

        test('calls GET with correct URL when both userId and streakId is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.completeChallengeStreakTasks.getAll({
                userId: 'userId',
                challengeStreakId: 'challengeStreakId',
            });

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/complete-challenge-streak-tasks?userId=userId&challengeStreakId=challengeStreakId`,
            );
        });

        test('calls GET with correct URL when no query paramaters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.completeChallengeStreakTasks.getAll({});

            expect(streakoidClient.get).toBeCalledWith(`/v1/complete-challenge-streak-tasks?`);
        });
    });

    describe('create', () => {
        test('calls POST with correct URL and  parmaters', async () => {
            expect.assertions(1);
            streakoidClient.post = jest.fn().mockResolvedValue(true);
            const userId = 'userId';
            const challengeStreakId = 'challengeStreakId';

            await streakoid.completeChallengeStreakTasks.create({
                userId,
                challengeStreakId,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/complete-challenge-streak-tasks`, {
                userId,
                challengeStreakId,
            });
        });
    });
});
