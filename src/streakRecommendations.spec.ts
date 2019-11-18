import { streakoidFactory, streakoidClient } from './streakoid';

describe('SDK streakRecommendations', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        test('calls GET with correct URL when random query paramter is true', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.streakRecommendations.getAll({ random: true, limit: 5 });

            expect(streakoidClient.get).toBeCalledWith(`/v1/streak-recommendations?random=true&limit=5&`);
        });

        test('calls GET with correct URL when random query paramter is false', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.streakRecommendations.getAll({ random: false, limit: 5 });

            expect(streakoidClient.get).toBeCalledWith(`/v1/streak-recommendations?limit=5&`);
        });
    });

    describe('create', () => {
        test('calls POST with correct URL and  parmaters', async () => {
            expect.assertions(1);

            streakoidClient.post = jest.fn().mockResolvedValue(true);
            const streakName = 'streakName';
            const streakDescription = 'streakDescription';
            const numberOfMinutes = 30;

            await streakoid.streakRecommendations.create({
                streakName,
                streakDescription,
                numberOfMinutes,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/streak-recommendations`, {
                streakName,
                streakDescription,
                numberOfMinutes,
            });
        });
    });
});
