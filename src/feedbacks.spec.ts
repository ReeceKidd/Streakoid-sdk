import { streakoidFactory, streakoidClient } from './streakoid';

describe('SDK completeSoloStreakTasks', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('create', () => {
        test('calls POST with correct URL and  parmaters', async () => {
            expect.assertions(1);
            streakoidClient.post = jest.fn().mockResolvedValue(true);

            const userId = '12345678';
            const pageUrl = '/solo-streaks';
            const userEmail = 'userEmail';
            const username = 'username';
            const feedbackText = 'feedback';

            await streakoid.feedbacks.create({
                userId,
                pageUrl,
                username,
                userEmail,
                feedbackText,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/feedbacks`, {
                userId,
                pageUrl,
                username,
                userEmail,
                feedbackText,
            });
        });
    });
});
