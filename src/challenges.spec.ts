import { streakoidFactory, streakoidClient } from './streakoid';

describe('SDK challenges', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        const searchQuery = 'Yoga';
        const limit = 10;
        const random = true;

        const query = {
            searchQuery,
            limit,
            random,
        };

        test('calls GET with correct URL when no query parameters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.challenges.getAll({});

            expect(streakoidClient.get).toBeCalledWith(`/v1/challenges?`);
        });

        test('calls GET with correct URL when all query parameters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.challenges.getAll(query);

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/challenges?searchQuery=${searchQuery}&limit=${limit}&random=${random}&`,
            );
        });
    });

    describe('getOne', () => {
        test('calls GET with correct URL', async () => {
            expect.assertions(1);

            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.challenges.getOne({ challengeId: 'challengeId' });

            expect(streakoidClient.get).toBeCalledWith(`/v1/challenges/challengeId`);
        });
    });

    describe('create', () => {
        test('calls POST with correct URL and minimum parmaters', async () => {
            expect.assertions(1);

            streakoidClient.post = jest.fn().mockResolvedValue(true);
            const name = 'Spanish';
            const description = 'Study Spanish everyday';

            await streakoid.challenges.create({
                name,
                description,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/challenges`, {
                name,
                description,
            });
        });

        test('calls POST with correct URL and all available parmaters', async () => {
            expect.assertions(1);

            streakoidClient.post = jest.fn().mockResolvedValue(true);
            const name = 'Spanish';
            const description = 'Study Spanish everyday';
            const icon = 'faCog';
            const color = 'red';
            const numberOfMinutes = 30;

            await streakoid.challenges.create({
                name,
                description,
                icon,
                color,
                numberOfMinutes,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/challenges`, {
                name,
                description,
                icon,
                color,
                numberOfMinutes,
            });
        });
    });
});
