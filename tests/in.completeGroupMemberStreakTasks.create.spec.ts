import { streakoid } from '../src/streakoid';
import { GroupStreakTypes } from '../src';

const email = 'create-incomplete-group-member-streak-tasks-user@gmail.com';
const username = 'create-incomplete-group-member-streak-tasks-user';

jest.setTimeout(120000);

describe('DELETE /incomplete-solo-streak-tasks', () => {
    let userId: string;
    let teamStreakId: string;
    let groupMemberStreakId: string;

    const streakName = 'Intermittent fasting';

    beforeAll(async () => {
        const user = await streakoid.users.create({
            email,
            username,
        });
        userId = user._id;
        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            members,
        });
        teamStreakId = teamStreak._id;

        const groupMemberStreak = await streakoid.groupMemberStreaks.create({
            userId,
            teamStreakId,
        });
        groupMemberStreakId = groupMemberStreak._id;

        // Group member streaks tasks must be completed before they can be incompleted.
        await streakoid.completeGroupMemberStreakTasks.create({
            userId,
            teamStreakId,
            groupMemberStreakId,
            groupStreakType: GroupStreakTypes.team,
        });
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
    });

    describe('POST /v1/incomplete-solo-streak-tasks', () => {
        test('user can incomplete a group member streak task and the start date gets reset if it is the first day of the streak', async () => {
            expect.assertions(23);

            const incompleteGroupMemberStreakTask = await streakoid.incompleteGroupMemberStreakTasks.create({
                userId,
                teamStreakId,
                groupMemberStreakId,
                groupStreakType: GroupStreakTypes.team,
            });

            expect(incompleteGroupMemberStreakTask._id).toBeDefined();
            expect(incompleteGroupMemberStreakTask.userId).toEqual(userId);
            expect(incompleteGroupMemberStreakTask.groupMemberStreakId).toEqual(groupMemberStreakId);
            expect(incompleteGroupMemberStreakTask.groupStreakType).toEqual(GroupStreakTypes.team);
            expect(incompleteGroupMemberStreakTask.teamStreakId).toEqual(teamStreakId);
            expect(incompleteGroupMemberStreakTask.taskIncompleteTime).toEqual(expect.any(String));
            expect(incompleteGroupMemberStreakTask.taskIncompleteDay).toEqual(expect.any(String));
            expect(incompleteGroupMemberStreakTask.createdAt).toEqual(expect.any(String));
            expect(incompleteGroupMemberStreakTask.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(incompleteGroupMemberStreakTask).sort()).toEqual(
                [
                    '_id',
                    'userId',
                    'groupMemberStreakId',
                    'groupStreakType',
                    'teamStreakId',
                    'taskIncompleteTime',
                    'taskIncompleteDay',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );

            const groupMemberStreak = await streakoid.groupMemberStreaks.getOne(groupMemberStreakId);
            expect(groupMemberStreak._id).toEqual(expect.any(String));
            expect(groupMemberStreak.currentStreak.numberOfDaysInARow).toEqual(0);
            expect(groupMemberStreak.currentStreak.startDate).toEqual(null);
            expect(Object.keys(groupMemberStreak.currentStreak).sort()).toEqual(
                ['startDate', 'numberOfDaysInARow'].sort(),
            );
            expect(groupMemberStreak.completedToday).toEqual(false);
            expect(groupMemberStreak.active).toEqual(false);
            expect(groupMemberStreak.pastStreaks).toEqual([]);
            expect(groupMemberStreak.userId).toEqual(expect.any(String));
            expect(groupMemberStreak.teamStreakId).toEqual(expect.any(String));
            expect(groupMemberStreak.timezone).toEqual(expect.any(String));
            expect(groupMemberStreak.createdAt).toEqual(expect.any(String));
            expect(groupMemberStreak.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(groupMemberStreak).sort()).toEqual(
                [
                    '_id',
                    'currentStreak',
                    'completedToday',
                    'active',
                    'pastStreaks',
                    'userId',
                    'teamStreakId',
                    'timezone',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );
        });

        test('user can incomplete a group member streak task after the first day of the streak', async () => {
            const members = [{ memberId: userId }];
            const newTeamStreak = await streakoid.teamStreaks.create({
                creatorId: userId,
                streakName,
                members,
            });

            const multipleDayGroupMemberStreak = await streakoid.groupMemberStreaks.create({
                userId,
                teamStreakId: newTeamStreak._id,
            });

            const numberOfDaysInARow = 2;

            await streakoid.groupMemberStreaks.update({
                groupMemberStreakId: multipleDayGroupMemberStreak._id,
                updateData: {
                    active: true,
                    currentStreak: { numberOfDaysInARow, startDate: new Date().toString() },
                },
            });

            // Group member streaks tasks must be completed before they can be incompleted.
            await streakoid.completeGroupMemberStreakTasks.create({
                userId,
                teamStreakId,
                groupMemberStreakId: multipleDayGroupMemberStreak._id,
                groupStreakType: GroupStreakTypes.team,
            });

            const incompleteGroupMemberStreakTask = await streakoid.incompleteGroupMemberStreakTasks.create({
                userId,
                groupMemberStreakId: multipleDayGroupMemberStreak._id,
                teamStreakId: newTeamStreak._id,
                groupStreakType: GroupStreakTypes.team,
            });

            expect(incompleteGroupMemberStreakTask._id).toBeDefined();
            expect(incompleteGroupMemberStreakTask.userId).toEqual(userId);
            expect(incompleteGroupMemberStreakTask.groupMemberStreakId).toEqual(multipleDayGroupMemberStreak._id);
            expect(incompleteGroupMemberStreakTask.groupStreakType).toEqual(GroupStreakTypes.team);
            expect(incompleteGroupMemberStreakTask.teamStreakId).toEqual(newTeamStreak._id);
            expect(incompleteGroupMemberStreakTask.taskIncompleteTime).toEqual(expect.any(String));
            expect(incompleteGroupMemberStreakTask.taskIncompleteDay).toEqual(expect.any(String));
            expect(incompleteGroupMemberStreakTask.createdAt).toEqual(expect.any(String));
            expect(incompleteGroupMemberStreakTask.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(incompleteGroupMemberStreakTask).sort()).toEqual(
                [
                    '_id',
                    'userId',
                    'groupMemberStreakId',
                    'groupStreakType',
                    'teamStreakId',
                    'taskIncompleteTime',
                    'taskIncompleteDay',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );

            const groupMemberStreak = await streakoid.groupMemberStreaks.getOne(multipleDayGroupMemberStreak._id);
            expect(groupMemberStreak._id).toEqual(expect.any(String));
            expect(groupMemberStreak.currentStreak.numberOfDaysInARow).toEqual(numberOfDaysInARow);
            expect(groupMemberStreak.currentStreak.startDate).toEqual(expect.any(String));
            expect(Object.keys(groupMemberStreak.currentStreak).sort()).toEqual(
                ['startDate', 'numberOfDaysInARow'].sort(),
            );
            expect(groupMemberStreak.completedToday).toEqual(false);
            expect(groupMemberStreak.active).toEqual(false);
            expect(groupMemberStreak.pastStreaks).toEqual([]);
            expect(groupMemberStreak.userId).toEqual(expect.any(String));
            expect(groupMemberStreak.teamStreakId).toEqual(expect.any(String));
            expect(groupMemberStreak.timezone).toEqual(expect.any(String));
            expect(groupMemberStreak.createdAt).toEqual(expect.any(String));
            expect(groupMemberStreak.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(groupMemberStreak).sort()).toEqual(
                [
                    '_id',
                    'currentStreak',
                    'completedToday',
                    'active',
                    'pastStreaks',
                    'userId',
                    'teamStreakId',
                    'timezone',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );
        });

        test('user cannot incomplete a complete streak task that has not been completed', async () => {
            expect.assertions(3);
            const members = [{ memberId: userId }];
            const newTeamStreak = await streakoid.teamStreaks.create({
                creatorId: userId,
                streakName,
                members,
            });

            const newGroupMemberStreak = await streakoid.groupMemberStreaks.create({
                userId,
                teamStreakId: newTeamStreak._id,
            });
            try {
                await streakoid.incompleteGroupMemberStreakTasks.create({
                    userId,
                    teamStreakId: newTeamStreak._id,
                    groupMemberStreakId: newGroupMemberStreak._id,
                    groupStreakType: GroupStreakTypes.team,
                });
            } catch (err) {
                expect(err.response.status).toEqual(422);
                expect(err.response.data.message).toEqual('Group member streak task has not been completed today.');
                expect(err.response.data.code).toEqual('422-04');
            }
        });
    });
});
