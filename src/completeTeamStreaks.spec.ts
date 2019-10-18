import { streakoidFactory, streakoidClient } from './streakoid';

describe('SDK completeTeamStreaks', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        test('calls GET with correct URL when just teamStreakId is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.completeTeamStreaks.getAll({ teamStreakId: 'teamStreakId' });

            expect(streakoidClient.get).toBeCalledWith(`/v1/complete-team-streak-tasks?teamStreakId=teamStreakId`);
        });

        test('calls GET with correct URL when no query paramaters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.completeTeamStreaks.getAll({});

            expect(streakoidClient.get).toBeCalledWith(`/v1/complete-team-streak-tasks?`);
        });
    });
});
