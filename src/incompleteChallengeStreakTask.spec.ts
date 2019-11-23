import { streakoidFactory, streakoidClient } from './streakoid';

describe('SDK IncompleteChallengeStreakTasks', () => {
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

            await streakoid.incompleteChallengeStreakTasks.create({
                userId,
                challengeStreakId,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/incomplete-challenge-streak-tasks`, {
                userId,
                challengeStreakId,
            });
        });
    });
});
