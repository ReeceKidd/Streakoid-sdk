import { streakoidFactory, streakoidClient } from './streakoid';
import { GroupStreakTypes } from '.';

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

        test('calls GET with correct URL when just groupStreakType is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.incompleteGroupMemberStreakTasks.getAll({ groupStreakType: GroupStreakTypes.team });

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/incomplete-group-member-streak-tasks?groupStreakType=team&`,
            );
        });

        test('calls GET with correct URL when both userId, groupMemberStreakId and groupStreakType is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.incompleteGroupMemberStreakTasks.getAll({
                userId: 'userId',
                groupMemberStreakId: 'groupMemberStreakId',
                groupStreakType: GroupStreakTypes.team,
            });

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/incomplete-group-member-streak-tasks?userId=userId&groupMemberStreakId=groupMemberStreakId&groupStreakType=team&`,
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
            const groupStreakType = GroupStreakTypes.team;

            await streakoid.incompleteGroupMemberStreakTasks.create({
                userId,
                groupMemberStreakId,
                groupStreakType,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/incomplete-group-member-streak-tasks`, {
                userId,
                groupMemberStreakId,
                groupStreakType,
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
