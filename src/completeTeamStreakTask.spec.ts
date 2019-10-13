import { streakoidFactory, streakoidClient } from './streakoid';

describe('SDK completeTeamStreakTasks', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        test('calls GET with correct URL when just teamStreakId is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.completeTeamStreakTasks.getAll({ teamStreakId: 'teamStreakId' });

            expect(streakoidClient.get).toBeCalledWith(`/v1/complete-team-streak-tasks?teamStreakId=teamStreakId`);
        });

        test('calls GET with correct URL when no query paramaters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.completeTeamStreakTasks.getAll({});

            expect(streakoidClient.get).toBeCalledWith(`/v1/complete-team-streak-tasks?`);
        });
    });

    describe('create', () => {
        test('calls POST with correct URL and  parmaters', async () => {
            expect.assertions(1);
            streakoidClient.post = jest.fn().mockResolvedValue(true);
            const teamStreakId = 'teamStreakId';

            await streakoid.completeTeamStreakTasks.create({
                teamStreakId,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/complete-team-streak-tasks`, {
                teamStreakId,
            });
        });
    });

    describe('deleteOne', () => {
        test('calls DELETE correct URL ', async () => {
            expect.assertions(1);
            streakoidClient.delete = jest.fn().mockResolvedValue(true);

            await streakoid.completeTeamStreakTasks.deleteOne('id');

            expect(streakoidClient.delete).toBeCalledWith(`/v1/complete-team-streak-tasks/id`);
        });
    });
});
