import { streakoidFactory, streakoidClient } from './streakoid';
import { StreakTypes } from '.';

describe('SDK IncompleteGroupMemberStreakTasks', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        test('calls GET with correct URL when just userId is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.incompleteGroupMemberStreakTasks.getAll({ userId: 'userId' });

            expect(streakoidClient.get).toBeCalledWith(`/v1/incomplete-group-member-streak-tasks?userId=userId&`);
        });

        test('calls GET with correct URL when just groupMemberStreakId is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.incompleteGroupMemberStreakTasks.getAll({ groupMemberStreakId: 'groupMemberStreakId' });

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/incomplete-group-member-streak-tasks?groupMemberStreakId=groupMemberStreakId&`,
            );
        });

        test('calls GET with correct URL when just streakType is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.incompleteGroupMemberStreakTasks.getAll({ streakType: StreakTypes.teamMember });

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/incomplete-group-member-streak-tasks?streakType=teamMember&`,
            );
        });

        test('calls GET with correct URL when just teamStreakId is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.incompleteGroupMemberStreakTasks.getAll({ teamStreakId: 'teamStreakId' });

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/incomplete-group-member-streak-tasks?teamStreakId=teamStreakId&`,
            );
        });

        test('calls GET with correct URL when both userId, groupMemberStreakId and streakType is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.incompleteGroupMemberStreakTasks.getAll({
                userId: 'userId',
                groupMemberStreakId: 'groupMemberStreakId',
                streakType: StreakTypes.teamMember,
            });

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/incomplete-group-member-streak-tasks?userId=userId&groupMemberStreakId=groupMemberStreakId&streakType=teamMember&`,
            );
        });

        test('calls GET with correct URL when no query paramaters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.incompleteGroupMemberStreakTasks.getAll({});

            expect(streakoidClient.get).toBeCalledWith(`/v1/incomplete-group-member-streak-tasks?`);
        });
    });

    describe('create', () => {
        test('calls POST with correct URL and  parmaters', async () => {
            expect.assertions(1);
            streakoidClient.post = jest.fn().mockResolvedValue(true);
            const userId = 'userId';
            const groupMemberStreakId = 'groupMemberStreakId';
            const streakType = StreakTypes.teamMember;
            const teamStreakId = 'teamStreakId';

            await streakoid.incompleteGroupMemberStreakTasks.create({
                userId,
                groupMemberStreakId,
                streakType,
                teamStreakId,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/incomplete-group-member-streak-tasks`, {
                userId,
                groupMemberStreakId,
                streakType,
                teamStreakId,
            });
        });
    });

    describe('deleteOne', () => {
        test('calls DELETE correct URL ', async () => {
            expect.assertions(1);
            streakoidClient.delete = jest.fn().mockResolvedValue(true);

            await streakoid.incompleteGroupMemberStreakTasks.deleteOne('id');

            expect(streakoidClient.delete).toBeCalledWith(`/v1/incomplete-group-member-streak-tasks/id`);
        });
    });
});
