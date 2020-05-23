import { streakoidFactory, streakoidClient } from './streakoid';

describe('SDK stats', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('get', () => {
        test('calls GET with correct URL when no query parameters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.databaseStats.get();

            expect(streakoidClient.get).toBeCalledWith(`/v1/database-stats`);
        });
    });
});
