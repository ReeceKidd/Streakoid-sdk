import { streakoidFactory, streakoidClient } from './streakoid';

describe('SDK streakRecommendations', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        test('calls GET with correct URL when all query parameters are used', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.streakRecommendations.getAll({ random: true, limit: 5, sortedByNumberOfMembers: true });

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/streak-recommendations?random=true&limit=5&sortedByNumberOfMembers=true&`,
            );
        });
    });
});
