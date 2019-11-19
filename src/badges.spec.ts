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

    describe('create', () => {
        test('calls POST with correct URL and  parmaters', async () => {
            expect.assertions(1);

            streakoidClient.post = jest.fn().mockResolvedValue(true);
            const name = 'Spanish';
            const description = 'Study Spanish everyday';
            const icon = 'spain-flag';
            const levels = [{ level: 0, color: 'blue', criteria: 'Must complete lesson on Duolingo' }];

            await streakoid.badges.create({
                name,
                description,
                icon,
                levels,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/badges`, {
                name,
                description,
                icon,
                levels,
            });
        });
    });
});