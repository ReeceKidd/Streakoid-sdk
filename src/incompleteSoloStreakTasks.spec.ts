import { streakoidFactory, streakoidClient } from './streakoid';

describe('SDK IncompleteSoloStreakTasks', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        test('calls GET with correct URL when just userId is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.incompleteSoloStreakTasks.getAll({ userId: 'userId' });

            expect(streakoidClient.get).toBeCalledWith(`/v1/incomplete-solo-streak-tasks?userId=userId&`);
        });

        test('calls GET with correct URL when just streakId is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.incompleteSoloStreakTasks.getAll({ streakId: 'streakId' });

            expect(streakoidClient.get).toBeCalledWith(`/v1/incomplete-solo-streak-tasks?streakId=streakId`);
        });

        test('calls GET with correct URL when both userId and streakId is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.incompleteSoloStreakTasks.getAll({
                userId: 'userId',
                streakId: 'streakId',
            });

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/incomplete-solo-streak-tasks?userId=userId&streakId=streakId`,
            );
        });

        test('calls GET with correct URL when no query paramaters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.incompleteSoloStreakTasks.getAll({});

            expect(streakoidClient.get).toBeCalledWith(`/v1/incomplete-solo-streak-tasks?`);
        });
    });

    describe('create', () => {
        test('calls POST with correct URL and  parmaters', async () => {
            expect.assertions(1);
            streakoidClient.post = jest.fn().mockResolvedValue(true);
            const userId = 'userId';
            const soloStreakId = 'soloStreakId';

            await streakoid.incompleteSoloStreakTasks.create({
                userId,
                soloStreakId,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/incomplete-solo-streak-tasks`, {
                userId,
                soloStreakId,
            });
        });
    });

    describe('deleteOne', () => {
        test('calls DELETE correct URL ', async () => {
            expect.assertions(1);
            streakoidClient.delete = jest.fn().mockResolvedValue(true);

            await streakoid.incompleteSoloStreakTasks.deleteOne('id');

            expect(streakoidClient.delete).toBeCalledWith(`/v1/incomplete-solo-streak-tasks/id`);
        });
    });
});
