import { streakoidFactory, streakoidClient } from './streakoid';
import { StreakTypes } from '.';

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

        test('calls GET with correct URL when just streakType is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.completeGroupMemberStreakTasks.getAll({
                streakType: StreakTypes.team,
            });

            expect(streakoidClient.get).toBeCalledWith(`/v1/complete-group-member-streak-tasks?streakType=team&`);
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
                streakType: StreakTypes.team,
                teamStreakId: 'teamStreakId',
            });

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/complete-group-member-streak-tasks?userId=userId&groupMemberStreakId=groupMemberStreakId&streakType=team&teamStreakId=teamStreakId&`,
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
            const streakType = StreakTypes.team;
            const teamStreakId = 'teamStreakId';

            await streakoid.completeGroupMemberStreakTasks.create({
                userId,
                groupMemberStreakId,
                streakType,
                teamStreakId,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/complete-group-member-streak-tasks`, {
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
            streakoidClient.delete = jest.fn();

            await streakoid.completeGroupMemberStreakTasks.deleteOne('id');

            expect(streakoidClient.delete).toBeCalledWith(`/v1/complete-group-member-streak-tasks/id`);
        });
    });
});
