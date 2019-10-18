import { streakoidFactory, streakoidClient } from './streakoid';

describe('SDK IncompleteTeamMemberStreakTasks', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        test('calls GET with correct URL when just userId is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.incompleteTeamMemberStreakTasks.getAll({ userId: 'userId' });

            expect(streakoidClient.get).toBeCalledWith(`/v1/incomplete-team-member-streak-tasks?userId=userId&`);
        });

        test('calls GET with correct URL when just teamMemberStreakId is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.incompleteTeamMemberStreakTasks.getAll({ teamMemberStreakId: 'teamMemberStreakId' });

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/incomplete-team-member-streak-tasks?teamMemberStreakId=teamMemberStreakId&`,
            );
        });

        test('calls GET with correct URL when just teamStreakId is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.incompleteTeamMemberStreakTasks.getAll({ teamStreakId: 'teamStreakId' });

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/incomplete-team-member-streak-tasks?teamStreakId=teamStreakId&`,
            );
        });

        test('calls GET with correct URL when both userId and teamMemberStreakId is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.incompleteTeamMemberStreakTasks.getAll({
                userId: 'userId',
                teamMemberStreakId: 'teamMemberStreakId',
            });

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/incomplete-team-member-streak-tasks?userId=userId&teamMemberStreakId=teamMemberStreakId&`,
            );
        });

        test('calls GET with correct URL when no query paramaters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.incompleteTeamMemberStreakTasks.getAll({});

            expect(streakoidClient.get).toBeCalledWith(`/v1/incomplete-team-member-streak-tasks?`);
        });
    });

    describe('create', () => {
        test('calls POST with correct URL and  parmaters', async () => {
            expect.assertions(1);
            streakoidClient.post = jest.fn().mockResolvedValue(true);
            const userId = 'userId';
            const teamMemberStreakId = 'teamMemberStreakId';
            const teamStreakId = 'teamStreakId';

            await streakoid.incompleteTeamMemberStreakTasks.create({
                userId,
                teamMemberStreakId,
                teamStreakId,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/incomplete-team-member-streak-tasks`, {
                userId,
                teamMemberStreakId,
                teamStreakId,
            });
        });
    });
});
