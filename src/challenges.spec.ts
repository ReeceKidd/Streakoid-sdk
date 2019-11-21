import { streakoidFactory, streakoidClient } from './streakoid';

describe('SDK challenges', () => {
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

            await streakoid.challenges.getAll({});

            expect(streakoidClient.get).toBeCalledWith(`/v1/challenges?`);
        });

        test('calls GET with correct URL when all query paramters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.challenges.getAll(query);

            expect(streakoidClient.get).toBeCalledWith(`/v1/challenges?name=${name}&`);
        });
    });

    describe('create', () => {
        test('calls POST with correct URL and  parmaters', async () => {
            expect.assertions(1);

            streakoidClient.post = jest.fn().mockResolvedValue(true);
            const name = 'Spanish';
            const description = 'Study Spanish everyday';
            const icon = 'faCog';
            const color = 'color';

            await streakoid.challenges.create({
                name,
                description,
                icon,
                color,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/challenges`, {
                name,
                description,
                icon,
                color,
            });
        });
    });
});
