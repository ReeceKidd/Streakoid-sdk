import { StreakoidFactory } from '../src/streakoid';
import { getUser, streakoidTest } from './setup/streakoidTest';

jest.setTimeout(120000);

describe('DELETE /incomplete-solo-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let teamStreakId: string;
    let teamMemberStreakId: string;

    const streakName = 'Intermittent fasting';

    beforeAll(async () => {
        const user = await getUser();
        userId = user._id;
        streakoid = await streakoidTest();
        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            members,
        });
        teamStreakId = teamStreak._id;

        const teamMemberStreak = await streakoid.teamMemberStreaks.create({
            userId,
            teamStreakId,
        });
        teamMemberStreakId = teamMemberStreak._id;

        // Group member streaks tasks must be completed before they can be incompleted.
        await streakoid.completeTeamMemberStreakTasks.create({
            userId,
            teamStreakId,
            teamMemberStreakId,
        });
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
    });

    describe('POST /v1/incomplete-solo-streak-tasks', () => {
        test('user can incomplete a team member streak task and the start date gets reset if it is the first day of the streak', async () => {
            expect.assertions(23);

            const incompleteTeamMemberStreakTask = await streakoid.incompleteTeamMemberStreakTasks.create({
                userId,
                teamStreakId,
                teamMemberStreakId,
            });

            expect(incompleteTeamMemberStreakTask._id).toBeDefined();
            expect(incompleteTeamMemberStreakTask.userId).toEqual(userId);
            expect(incompleteTeamMemberStreakTask.teamMemberStreakId).toEqual(teamMemberStreakId);
            expect(incompleteTeamMemberStreakTask.teamStreakId).toEqual(teamStreakId);
            expect(incompleteTeamMemberStreakTask.taskIncompleteTime).toEqual(expect.any(String));
            expect(incompleteTeamMemberStreakTask.taskIncompleteDay).toEqual(expect.any(String));
            expect(incompleteTeamMemberStreakTask.createdAt).toEqual(expect.any(String));
            expect(incompleteTeamMemberStreakTask.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(incompleteTeamMemberStreakTask).sort()).toEqual(
                [
                    '_id',
                    'userId',
                    'teamMemberStreakId',
                    'streakType',
                    'teamStreakId',
                    'taskIncompleteTime',
                    'taskIncompleteDay',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );

            const teamMemberStreak = await streakoid.teamMemberStreaks.getOne(teamMemberStreakId);
            expect(teamMemberStreak._id).toEqual(expect.any(String));
            expect(teamMemberStreak.currentStreak.numberOfDaysInARow).toEqual(0);
            expect(teamMemberStreak.currentStreak.startDate).toEqual(null);
            expect(Object.keys(teamMemberStreak.currentStreak).sort()).toEqual(
                ['startDate', 'numberOfDaysInARow'].sort(),
            );
            expect(teamMemberStreak.completedToday).toEqual(false);
            expect(teamMemberStreak.active).toEqual(false);
            expect(teamMemberStreak.pastStreaks).toEqual([]);
            expect(teamMemberStreak.userId).toEqual(expect.any(String));
            expect(teamMemberStreak.teamStreakId).toEqual(expect.any(String));
            expect(teamMemberStreak.timezone).toEqual(expect.any(String));
            expect(teamMemberStreak.createdAt).toEqual(expect.any(String));
            expect(teamMemberStreak.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(teamMemberStreak).sort()).toEqual(
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

        test('user can incomplete a team member streak task after the first day of the streak', async () => {
            const members = [{ memberId: userId }];
            const newTeamStreak = await streakoid.teamStreaks.create({
                creatorId: userId,
                streakName,
                members,
            });

            const multipleDayTeamMemberStreak = await streakoid.teamMemberStreaks.create({
                userId,
                teamStreakId: newTeamStreak._id,
            });

            const numberOfDaysInARow = 2;

            await streakoid.teamMemberStreaks.update({
                teamMemberStreakId: multipleDayTeamMemberStreak._id,
                updateData: {
                    active: true,
                    currentStreak: { numberOfDaysInARow, startDate: new Date().toString() },
                },
            });

            // Group member streaks tasks must be completed before they can be incompleted.
            await streakoid.completeTeamMemberStreakTasks.create({
                userId,
                teamStreakId,
                teamMemberStreakId: multipleDayTeamMemberStreak._id,
            });

            const incompleteTeamMemberStreakTask = await streakoid.incompleteTeamMemberStreakTasks.create({
                userId,
                teamMemberStreakId: multipleDayTeamMemberStreak._id,
                teamStreakId: newTeamStreak._id,
            });

            expect(incompleteTeamMemberStreakTask._id).toBeDefined();
            expect(incompleteTeamMemberStreakTask.userId).toEqual(userId);
            expect(incompleteTeamMemberStreakTask.teamMemberStreakId).toEqual(multipleDayTeamMemberStreak._id);
            expect(incompleteTeamMemberStreakTask.teamStreakId).toEqual(newTeamStreak._id);
            expect(incompleteTeamMemberStreakTask.taskIncompleteTime).toEqual(expect.any(String));
            expect(incompleteTeamMemberStreakTask.taskIncompleteDay).toEqual(expect.any(String));
            expect(incompleteTeamMemberStreakTask.createdAt).toEqual(expect.any(String));
            expect(incompleteTeamMemberStreakTask.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(incompleteTeamMemberStreakTask).sort()).toEqual(
                [
                    '_id',
                    'userId',
                    'teamMemberStreakId',
                    'streakType',
                    'teamStreakId',
                    'taskIncompleteTime',
                    'taskIncompleteDay',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );

            const teamMemberStreak = await streakoid.teamMemberStreaks.getOne(multipleDayTeamMemberStreak._id);
            expect(teamMemberStreak._id).toEqual(expect.any(String));
            expect(teamMemberStreak.currentStreak.numberOfDaysInARow).toEqual(numberOfDaysInARow);
            expect(teamMemberStreak.currentStreak.startDate).toEqual(expect.any(String));
            expect(Object.keys(teamMemberStreak.currentStreak).sort()).toEqual(
                ['startDate', 'numberOfDaysInARow'].sort(),
            );
            expect(teamMemberStreak.completedToday).toEqual(false);
            expect(teamMemberStreak.active).toEqual(false);
            expect(teamMemberStreak.pastStreaks).toEqual([]);
            expect(teamMemberStreak.userId).toEqual(expect.any(String));
            expect(teamMemberStreak.teamStreakId).toEqual(expect.any(String));
            expect(teamMemberStreak.timezone).toEqual(expect.any(String));
            expect(teamMemberStreak.createdAt).toEqual(expect.any(String));
            expect(teamMemberStreak.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(teamMemberStreak).sort()).toEqual(
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

            const newTeamMemberStreak = await streakoid.teamMemberStreaks.create({
                userId,
                teamStreakId: newTeamStreak._id,
            });
            try {
                await streakoid.incompleteTeamMemberStreakTasks.create({
                    userId,
                    teamStreakId: newTeamStreak._id,
                    teamMemberStreakId: newTeamMemberStreak._id,
                });
            } catch (err) {
                expect(err.response.status).toEqual(422);
                expect(err.response.data.message).toEqual('Group member streak task has not been completed today.');
                expect(err.response.data.code).toEqual('422-04');
            }
        });
    });
});
