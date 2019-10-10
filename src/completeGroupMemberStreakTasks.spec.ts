import { streakoidFactory, streakoidClient } from './streakoid';
import { GroupStreakTypes } from '.';

describe('SDK completeSoloStreakTasks', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        test('calls GET with correct URL when just userId is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.completeGroupMemberStreakTasks.getAll({
                userId: 'userId',
            });

            expect(streakoidClient.get).toBeCalledWith(`/v1/complete-group-member-streak-tasks?userId=userId&`);
        });

        test('calls GET with correct URL when just groupMemberStreakId is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.completeGroupMemberStreakTasks.getAll({
                groupMemberStreakId: 'groupMemberStreakId',
            });

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/complete-group-member-streak-tasks?groupMemberStreakId=groupMemberStreakId&`,
            );
        });

        test('calls GET with correct URL when just groupStreakType is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.completeGroupMemberStreakTasks.getAll({
                groupStreakType: GroupStreakTypes.team,
            });

            expect(streakoidClient.get).toBeCalledWith(`/v1/complete-group-member-streak-tasks?groupStreakType=team&`);
        });

        test('calls GET with correct URL when just teamStreakId is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.completeGroupMemberStreakTasks.getAll({
                teamStreakId: 'teamStreakId',
            });

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/complete-group-member-streak-tasks?teamStreakId=teamStreakId&`,
            );
        });

        test('calls GET with correct URL when all query paramaters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.completeGroupMemberStreakTasks.getAll({
                userId: 'userId',
                groupMemberStreakId: 'groupMemberStreakId',
                groupStreakType: GroupStreakTypes.team,
                teamStreakId: 'teamStreakId',
            });

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/complete-group-member-streak-tasks?userId=userId&groupMemberStreakId=groupMemberStreakId&groupStreakType=team&teamStreakId=teamStreakId&`,
            );
        });

        test('calls GET with correct URL when no query paramaters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.completeSoloStreakTasks.getAll({});

            expect(streakoidClient.get).toBeCalledWith(`/v1/complete-solo-streak-tasks?`);
        });
    });

    describe('create', () => {
        test('calls POST with correct URL and  parmaters', async () => {
            expect.assertions(1);
            streakoidClient.post = jest.fn().mockResolvedValue(true);
            const userId = 'userId';
            const groupMemberStreakId = 'groupMemberStreakId';
            const groupStreakType = GroupStreakTypes.team;
            const teamStreakId = 'teamStreakId';

            await streakoid.completeGroupMemberStreakTasks.create({
                userId,
                groupMemberStreakId,
                groupStreakType,
                teamStreakId,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/complete-group-member-streak-tasks`, {
                userId,
                groupMemberStreakId,
                groupStreakType,
                teamStreakId,
            });
        });
    });

    describe('deleteOne', () => {
        test('calls DELETE correct URL ', async () => {
            expect.assertions(1);
            streakoidClient.delete = jest.fn();

            await streakoid.completeGroupMemberStreakTasks.deleteOne('id');

            expect(streakoidClient.delete).toBeCalledWith(`/v1/complete-group-member-streak-tasks/id`);
        });
    });
});
