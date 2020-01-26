import { streakoidFactory, streakoidClient } from './streakoid';

describe('SDK activities', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        const userId = 'userId';
        const streakId = 'streakId';

        const query = {
            userId,
            streakId,
        };

        test('calls GET with correct URL when no query paramters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.activities.getAll({});

            expect(streakoidClient.get).toBeCalledWith(`/v1/activities?`);
        });

        test('calls GET with correct URL when all query paramters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.activities.getAll(query);

            expect(streakoidClient.get).toBeCalledWith(`/v1/activities?userId=${userId}&streakId=${streakId}&`);
        });
    });
});
