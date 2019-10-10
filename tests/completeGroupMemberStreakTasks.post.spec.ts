import { streakoid } from '../src/streakoid';
import { GroupStreakTypes } from '../src';

const registeredEmail = 'create-complete-group-member-streak-tasks-user@gmail.com';
const registeredUsername = 'create-complete-group-member-streak-tasks-user';

jest.setTimeout(120000);

describe('POST /complete-group-member-streak-tasks', () => {
    let userId: string;
    let teamStreakId: string;
    let groupMemberStreakId: string;
    let secondGroupMemberStreakId: string;

    const streakName = 'Intermittent fasting';
    const streakDescription = 'I will not eat until 1pm everyday';

    beforeAll(async () => {
        const user = await streakoid.users.create({
            username: registeredUsername,
            email: registeredEmail,
        });
        userId = user._id;
        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            streakDescription,
            members,
        });
        teamStreakId = teamStreak._id;

        const groupMemberStreak = await streakoid.groupMemberStreaks.create({
            userId,
            teamStreakId,
        });
        groupMemberStreakId = groupMemberStreak._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.teamStreaks.deleteOne(teamStreakId);
    });

    describe('POST /v1/complete-group-member-streak-tasks', () => {
        test('user can complete a group member streak task with a new current streak', async () => {
            expect.assertions(23);

            const completeGroupMemberStreakTask = await streakoid.completeGroupMemberStreakTasks.create({
                userId,
                teamStreakId,
                groupMemberStreakId,
                groupStreakType: GroupStreakTypes.team,
            });

            expect(completeGroupMemberStreakTask._id).toEqual(expect.any(String));
            expect(completeGroupMemberStreakTask.userId).toEqual(userId);
            expect(completeGroupMemberStreakTask.teamStreakId).toEqual(teamStreakId);
            expect(completeGroupMemberStreakTask.groupMemberStreakId).toEqual(groupMemberStreakId);
            expect(completeGroupMemberStreakTask.taskCompleteTime).toEqual(expect.any(String));
            expect(completeGroupMemberStreakTask.taskCompleteDay).toEqual(expect.any(String));
            expect(completeGroupMemberStreakTask.groupStreakType).toEqual(GroupStreakTypes.team);
            expect(completeGroupMemberStreakTask.createdAt).toEqual(expect.any(String));
            expect(completeGroupMemberStreakTask.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(completeGroupMemberStreakTask).sort()).toEqual(
                [
                    '_id',
                    'userId',
                    'teamStreakId',
                    'groupMemberStreakId',
                    'taskCompleteTime',
                    'taskCompleteDay',
                    'groupStreakType',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );

            const groupMemberStreak = await streakoid.groupMemberStreaks.getOne(groupMemberStreakId);

            expect(groupMemberStreak._id).toEqual(expect.any(String));
            expect(groupMemberStreak.currentStreak.numberOfDaysInARow).toEqual(1);
            expect(groupMemberStreak.currentStreak.startDate).toEqual(expect.any(String));
            expect(Object.keys(groupMemberStreak.currentStreak).sort()).toEqual(
                ['startDate', 'numberOfDaysInARow'].sort(),
            );
            expect(groupMemberStreak.completedToday).toEqual(true);
            expect(groupMemberStreak.active).toEqual(true);
            expect(groupMemberStreak.pastStreaks).toEqual([]);
            expect(groupMemberStreak.userId).toEqual(expect.any(String));
            expect(groupMemberStreak.teamStreakId).toEqual(teamStreakId);
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

        test('user can complete a group member streak task with an exsiting current streak', async () => {
            expect.assertions(23);

            const members = [{ memberId: userId }];

            const newTeamStreak = await streakoid.teamStreaks.create({
                creatorId: userId,
                streakName,
                streakDescription,
                members,
            });
            teamStreakId = newTeamStreak._id;

            const newGroupMemberStreak = await streakoid.groupMemberStreaks.create({
                userId,
                teamStreakId,
            });

            const numberOfDaysInARow = 2;

            const groupMemberStreakWithCurrentStreak = await streakoid.groupMemberStreaks.update({
                groupMemberStreakId: newGroupMemberStreak._id,
                updateData: {
                    active: true,
                    currentStreak: {
                        startDate: new Date().toString(),
                        numberOfDaysInARow,
                    },
                },
            });

            const completeGroupMemberStreakTask = await streakoid.completeGroupMemberStreakTasks.create({
                userId,
                teamStreakId: newTeamStreak._id,
                groupMemberStreakId: groupMemberStreakWithCurrentStreak._id,
                groupStreakType: GroupStreakTypes.team,
            });

            expect(completeGroupMemberStreakTask._id).toEqual(expect.any(String));
            expect(completeGroupMemberStreakTask.userId).toEqual(userId);
            expect(completeGroupMemberStreakTask.teamStreakId).toEqual(teamStreakId);
            expect(completeGroupMemberStreakTask.groupMemberStreakId).toEqual(groupMemberStreakWithCurrentStreak._id);
            expect(completeGroupMemberStreakTask.taskCompleteTime).toEqual(expect.any(String));
            expect(completeGroupMemberStreakTask.taskCompleteDay).toEqual(expect.any(String));
            expect(completeGroupMemberStreakTask.groupStreakType).toEqual(GroupStreakTypes.team);
            expect(completeGroupMemberStreakTask.createdAt).toEqual(expect.any(String));
            expect(completeGroupMemberStreakTask.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(completeGroupMemberStreakTask).sort()).toEqual(
                [
                    '_id',
                    'userId',
                    'teamStreakId',
                    'groupMemberStreakId',
                    'taskCompleteTime',
                    'taskCompleteDay',
                    'groupStreakType',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );

            const groupMemberStreak = await streakoid.groupMemberStreaks.getOne(groupMemberStreakWithCurrentStreak._id);

            expect(groupMemberStreak._id).toEqual(groupMemberStreakWithCurrentStreak._id);
            expect(groupMemberStreak.currentStreak.numberOfDaysInARow).toEqual(numberOfDaysInARow + 1);
            expect(groupMemberStreak.currentStreak.startDate).toEqual(expect.any(String));
            expect(Object.keys(groupMemberStreak.currentStreak).sort()).toEqual(
                ['startDate', 'numberOfDaysInARow'].sort(),
            );
            expect(groupMemberStreak.completedToday).toEqual(true);
            expect(groupMemberStreak.active).toEqual(true);
            expect(groupMemberStreak.pastStreaks).toEqual([]);
            expect(groupMemberStreak.userId).toEqual(expect.any(String));
            expect(groupMemberStreak.teamStreakId).toEqual(teamStreakId);
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

        test('user can complete, incomplete and recomplete a group member streak task with a new current streak', async () => {
            expect.assertions(23);

            const members = [{ memberId: userId }];

            const newTeamStreak = await streakoid.teamStreaks.create({
                creatorId: userId,
                streakName,
                streakDescription,
                members,
            });
            teamStreakId = newTeamStreak._id;

            const newGroupMemberStreak = await streakoid.groupMemberStreaks.create({
                userId,
                teamStreakId,
            });

            await streakoid.completeGroupMemberStreakTasks.create({
                userId,
                teamStreakId: newTeamStreak._id,
                groupMemberStreakId: newGroupMemberStreak._id,
                groupStreakType: GroupStreakTypes.team,
            });

            await streakoid.incompleteGroupMemberStreakTasks.create({
                userId,
                teamStreakId: newTeamStreak._id,
                groupMemberStreakId: newGroupMemberStreak._id,
                groupStreakType: GroupStreakTypes.team,
            });

            const completeGroupMemberStreakTask = await streakoid.completeGroupMemberStreakTasks.create({
                userId,
                teamStreakId: newTeamStreak._id,
                groupMemberStreakId: newGroupMemberStreak._id,
                groupStreakType: GroupStreakTypes.team,
            });

            expect(completeGroupMemberStreakTask._id).toEqual(expect.any(String));
            expect(completeGroupMemberStreakTask.userId).toEqual(userId);
            expect(completeGroupMemberStreakTask.teamStreakId).toEqual(newTeamStreak._id);
            expect(completeGroupMemberStreakTask.groupMemberStreakId).toEqual(newGroupMemberStreak._id);
            expect(completeGroupMemberStreakTask.taskCompleteTime).toEqual(expect.any(String));
            expect(completeGroupMemberStreakTask.taskCompleteDay).toEqual(expect.any(String));
            expect(completeGroupMemberStreakTask.groupStreakType).toEqual(GroupStreakTypes.team);
            expect(completeGroupMemberStreakTask.createdAt).toEqual(expect.any(String));
            expect(completeGroupMemberStreakTask.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(completeGroupMemberStreakTask).sort()).toEqual(
                [
                    '_id',
                    'userId',
                    'teamStreakId',
                    'groupMemberStreakId',
                    'taskCompleteTime',
                    'taskCompleteDay',
                    'groupStreakType',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );

            const groupMemberStreak = await streakoid.groupMemberStreaks.getOne(newGroupMemberStreak._id);

            expect(groupMemberStreak._id).toEqual(expect.any(String));
            expect(groupMemberStreak.currentStreak.numberOfDaysInARow).toEqual(1);
            expect(groupMemberStreak.currentStreak.startDate).toEqual(expect.any(String));
            expect(Object.keys(groupMemberStreak.currentStreak).sort()).toEqual(
                ['startDate', 'numberOfDaysInARow'].sort(),
            );
            expect(groupMemberStreak.completedToday).toEqual(true);
            expect(groupMemberStreak.active).toEqual(true);
            expect(groupMemberStreak.pastStreaks).toEqual([]);
            expect(groupMemberStreak.userId).toEqual(expect.any(String));
            expect(groupMemberStreak.teamStreakId).toEqual(teamStreakId);
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

        test('user can complete, incomplete and recomplete a group member streak task with an existing streak', async () => {
            expect.assertions(23);

            const members = [{ memberId: userId }];

            const newTeamStreak = await streakoid.teamStreaks.create({
                creatorId: userId,
                streakName,
                streakDescription,
                members,
            });
            teamStreakId = newTeamStreak._id;

            const newGroupMemberStreak = await streakoid.groupMemberStreaks.create({
                userId,
                teamStreakId,
            });

            const numberOfDaysInARow = 2;

            const groupMemberStreakWithCurrentStreak = await streakoid.groupMemberStreaks.update({
                groupMemberStreakId: newGroupMemberStreak._id,
                updateData: {
                    active: true,
                    currentStreak: {
                        startDate: new Date().toString(),
                        numberOfDaysInARow,
                    },
                },
            });

            await streakoid.completeGroupMemberStreakTasks.create({
                userId,
                teamStreakId: newTeamStreak._id,
                groupMemberStreakId: groupMemberStreakWithCurrentStreak._id,
                groupStreakType: GroupStreakTypes.team,
            });

            await streakoid.incompleteGroupMemberStreakTasks.create({
                userId,
                teamStreakId: newTeamStreak._id,
                groupMemberStreakId: groupMemberStreakWithCurrentStreak._id,
                groupStreakType: GroupStreakTypes.team,
            });

            const completeGroupMemberStreakTask = await streakoid.completeGroupMemberStreakTasks.create({
                userId,
                teamStreakId: newTeamStreak._id,
                groupMemberStreakId: groupMemberStreakWithCurrentStreak._id,
                groupStreakType: GroupStreakTypes.team,
            });

            expect(completeGroupMemberStreakTask._id).toEqual(expect.any(String));
            expect(completeGroupMemberStreakTask.userId).toEqual(userId);
            expect(completeGroupMemberStreakTask.teamStreakId).toEqual(newTeamStreak._id);
            expect(completeGroupMemberStreakTask.groupMemberStreakId).toEqual(groupMemberStreakWithCurrentStreak._id);
            expect(completeGroupMemberStreakTask.taskCompleteTime).toEqual(expect.any(String));
            expect(completeGroupMemberStreakTask.taskCompleteDay).toEqual(expect.any(String));
            expect(completeGroupMemberStreakTask.groupStreakType).toEqual(GroupStreakTypes.team);
            expect(completeGroupMemberStreakTask.createdAt).toEqual(expect.any(String));
            expect(completeGroupMemberStreakTask.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(completeGroupMemberStreakTask).sort()).toEqual(
                [
                    '_id',
                    'userId',
                    'teamStreakId',
                    'groupMemberStreakId',
                    'taskCompleteTime',
                    'taskCompleteDay',
                    'groupStreakType',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );

            const groupMemberStreak = await streakoid.groupMemberStreaks.getOne(newGroupMemberStreak._id);

            expect(groupMemberStreak._id).toEqual(expect.any(String));
            expect(groupMemberStreak.currentStreak.numberOfDaysInARow).toEqual(numberOfDaysInARow + 1);
            expect(groupMemberStreak.currentStreak.startDate).toEqual(expect.any(String));
            expect(Object.keys(groupMemberStreak.currentStreak).sort()).toEqual(
                ['startDate', 'numberOfDaysInARow'].sort(),
            );
            expect(groupMemberStreak.completedToday).toEqual(true);
            expect(groupMemberStreak.active).toEqual(true);
            expect(groupMemberStreak.pastStreaks).toEqual([]);
            expect(groupMemberStreak.userId).toEqual(expect.any(String));
            expect(groupMemberStreak.teamStreakId).toEqual(teamStreakId);
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

        test('user cannot complete the same team streak member task in the same day', async () => {
            expect.assertions(3);

            const secondGroupMemberStreak = await streakoid.groupMemberStreaks.create({
                userId,
                teamStreakId,
            });
            secondGroupMemberStreakId = secondGroupMemberStreak._id;

            try {
                await streakoid.completeGroupMemberStreakTasks.create({
                    userId,
                    teamStreakId,
                    groupMemberStreakId: secondGroupMemberStreakId,
                    groupStreakType: GroupStreakTypes.team,
                });
                await streakoid.completeGroupMemberStreakTasks.create({
                    userId,
                    teamStreakId,
                    groupMemberStreakId: secondGroupMemberStreakId,
                    groupStreakType: GroupStreakTypes.team,
                });
            } catch (err) {
                expect(err.response.status).toEqual(422);
                expect(err.response.data.message).toEqual('Group member streak task already completed today.');
                expect(err.response.data.code).toEqual('422-03');
            }
        });
    });
});
