import { streakoidFactory, streakoidClient } from './streakoid';

describe('SDK badges', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        const name = 'Yoga';

        const query = {
            name,
        };

        test('calls GET with correct URL when no query paramters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.badges.getAll({});

            expect(streakoidClient.get).toBeCalledWith(`/v1/badges?`);
        });

        test('calls GET with correct URL when all query paramters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.badges.getAll(query);

            expect(streakoidClient.get).toBeCalledWith(`/v1/badges?name=${name}&`);
        });
    });
});
