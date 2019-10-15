import { streakoidFactory, streakoidClient } from './streakoid';
import { StreakTypes } from '.';

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

            expect(streakoidClient.get).toBeCalledWith(`/v1/incomplete-group-member-streak-tasks?userId=userId&`);
        });

        test('calls GET with correct URL when just teamMemberStreakId is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.incompleteTeamMemberStreakTasks.getAll({ teamMemberStreakId: 'teamMemberStreakId' });

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/incomplete-group-member-streak-tasks?teamMemberStreakId=teamMemberStreakId&`,
            );
        });

        test('calls GET with correct URL when just streakType is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.incompleteTeamMemberStreakTasks.getAll({ streakType: StreakTypes.teamMember });

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/incomplete-group-member-streak-tasks?streakType=teamMember&`,
            );
        });

        test('calls GET with correct URL when just teamStreakId is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.incompleteTeamMemberStreakTasks.getAll({ teamStreakId: 'teamStreakId' });

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/incomplete-group-member-streak-tasks?teamStreakId=teamStreakId&`,
            );
        });

        test('calls GET with correct URL when both userId, teamMemberStreakId and streakType is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.incompleteTeamMemberStreakTasks.getAll({
                userId: 'userId',
                teamMemberStreakId: 'teamMemberStreakId',
                streakType: StreakTypes.teamMember,
            });

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/incomplete-group-member-streak-tasks?userId=userId&teamMemberStreakId=teamMemberStreakId&streakType=teamMember&`,
            );
        });

        test('calls GET with correct URL when no query paramaters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.incompleteTeamMemberStreakTasks.getAll({});

            expect(streakoidClient.get).toBeCalledWith(`/v1/incomplete-group-member-streak-tasks?`);
        });
    });

    describe('create', () => {
        test('calls POST with correct URL and  parmaters', async () => {
            expect.assertions(1);
            streakoidClient.post = jest.fn().mockResolvedValue(true);
            const userId = 'userId';
            const teamMemberStreakId = 'teamMemberStreakId';
            const streakType = StreakTypes.teamMember;
            const teamStreakId = 'teamStreakId';

            await streakoid.incompleteTeamMemberStreakTasks.create({
                userId,
                teamMemberStreakId,
                streakType,
                teamStreakId,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/incomplete-group-member-streak-tasks`, {
                userId,
                teamMemberStreakId,
                streakType,
                teamStreakId,
            });
        });
    });

    describe('deleteOne', () => {
        test('calls DELETE correct URL ', async () => {
            expect.assertions(1);
            streakoidClient.delete = jest.fn().mockResolvedValue(true);

            await streakoid.incompleteTeamMemberStreakTasks.deleteOne('id');

            expect(streakoidClient.delete).toBeCalledWith(`/v1/incomplete-group-member-streak-tasks/id`);
        });
    });
});
