import { streakoidFactory, streakoidClient } from './streakoid';

describe('SDK incompleteTeamStreaks', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        test('calls GET with correct URL when just teamStreakId is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.incompleteTeamStreaks.getAll({ teamStreakId: 'teamStreakId' });

            expect(streakoidClient.get).toBeCalledWith(`/v1/incomplete-team-streaks?teamStreakId=teamStreakId`);
        });

        test('calls GET with correct URL when no query paramaters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.incompleteTeamStreaks.getAll({});

            expect(streakoidClient.get).toBeCalledWith(`/v1/incomplete-team-streaks?`);
        });
    });
});
