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

    describe('getOne', () => {
        test('calls GET with correct URL', async () => {
            expect.assertions(1);

            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.challenges.getOne('challengeId');

            expect(streakoidClient.get).toBeCalledWith(`/v1/challenges/challengeId`);
        });
    });

    describe('create', () => {
        test('calls POST with correct URL and minimum parmaters', async () => {
            expect.assertions(1);

            streakoidClient.post = jest.fn().mockResolvedValue(true);
            const name = 'Spanish';
            const description = 'Study Spanish everyday';
            const icon = 'faCog';
            const color = 'color';
            const badgeId = 'badgeId';
            const levels = [{ level: 1, badgeId: 'badgeId', criteria: 'criteria' }];

            await streakoid.challenges.create({
                name,
                description,
                icon,
                color,
                badgeId,
                levels,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/challenges`, {
                name,
                description,
                icon,
                color,
                badgeId,
                levels,
            });
        });

        test('calls POST with correct URL and all available parmaters', async () => {
            expect.assertions(1);

            streakoidClient.post = jest.fn().mockResolvedValue(true);
            const name = 'Spanish';
            const description = 'Study Spanish everyday';
            const icon = 'faCog';
            const color = 'color';
            const badgeId = 'badgeId';
            const levels = [{ level: 1, criteria: 'criteria' }];
            const numberOfMinutes = 30;

            await streakoid.challenges.create({
                name,
                description,
                icon,
                color,
                badgeId,
                levels,
                numberOfMinutes,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/challenges`, {
                name,
                description,
                icon,
                color,
                badgeId,
                levels,
                numberOfMinutes,
            });
        });
    });
});
