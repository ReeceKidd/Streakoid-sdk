import { streakoidFactory, streakoidClient } from './streakoid';

describe('SDK completeChallengeStreakTasks', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
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
