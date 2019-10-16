import { StreakoidFactory } from '../src/streakoid';
import { getUser, streakoidTest } from './setup/streakoidTest';

jest.setTimeout(120000);

describe('POST /complete-team-member-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let teamStreakId: string;
    let teamMemberStreakId: string;
    let secondTeamMemberStreakId: string;

    const streakName = 'Intermittent fasting';
    const streakDescription = 'I will not eat until 1pm everyday';

    beforeAll(async () => {
        const user = await getUser();
        userId = user._id;
        streakoid = await streakoidTest();
        userId = user._id;
        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            streakDescription,
            members,
        });
        teamStreakId = teamStreak._id;

        const teamMemberStreak = await streakoid.teamMemberStreaks.create({
            userId,
            teamStreakId,
        });
        teamMemberStreakId = teamMemberStreak._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.teamStreaks.deleteOne(teamStreakId);
    });

    describe('POST /v1/complete-team-member-streak-tasks', () => {
        test('user can complete a team member streak task with a new current streak', async () => {
            expect.assertions(22);

            const completeTeamMemberStreakTask = await streakoid.completeTeamMemberStreakTasks.create({
                userId,
                teamStreakId,
                teamMemberStreakId,
            });
            expect(completeTeamMemberStreakTask._id).toEqual(expect.any(String));
            expect(completeTeamMemberStreakTask.userId).toEqual(userId);
            expect(completeTeamMemberStreakTask.teamStreakId).toEqual(teamStreakId);
            expect(completeTeamMemberStreakTask.teamMemberStreakId).toEqual(teamMemberStreakId);
            expect(completeTeamMemberStreakTask.taskCompleteTime).toEqual(expect.any(String));
            expect(completeTeamMemberStreakTask.taskCompleteDay).toEqual(expect.any(String));
            expect(completeTeamMemberStreakTask.createdAt).toEqual(expect.any(String));
            expect(completeTeamMemberStreakTask.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(completeTeamMemberStreakTask).sort()).toEqual(
                [
                    '_id',
                    'userId',
                    'teamStreakId',
                    'teamMemberStreakId',
                    'taskCompleteTime',
                    'taskCompleteDay',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );

            const teamMemberStreak = await streakoid.teamMemberStreaks.getOne(teamMemberStreakId);

            expect(teamMemberStreak._id).toEqual(expect.any(String));
            expect(teamMemberStreak.currentStreak.numberOfDaysInARow).toEqual(1);
            expect(teamMemberStreak.currentStreak.startDate).toEqual(expect.any(String));
            expect(Object.keys(teamMemberStreak.currentStreak).sort()).toEqual(
                ['startDate', 'numberOfDaysInARow'].sort(),
            );
            expect(teamMemberStreak.completedToday).toEqual(true);
            expect(teamMemberStreak.active).toEqual(true);
            expect(teamMemberStreak.pastStreaks).toEqual([]);
            expect(teamMemberStreak.userId).toEqual(expect.any(String));
            expect(teamMemberStreak.teamStreakId).toEqual(teamStreakId);
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

        test('user can complete a team member streak task with an exsiting current streak', async () => {
            expect.assertions(22);

            const members = [{ memberId: userId }];

            const newTeamStreak = await streakoid.teamStreaks.create({
                creatorId: userId,
                streakName,
                streakDescription,
                members,
            });
            teamStreakId = newTeamStreak._id;

            const newTeamMemberStreak = await streakoid.teamMemberStreaks.create({
                userId,
                teamStreakId,
            });

            const numberOfDaysInARow = 2;

            const teamMemberStreakWithCurrentStreak = await streakoid.teamMemberStreaks.update({
                teamMemberStreakId: newTeamMemberStreak._id,
                updateData: {
                    active: true,
                    currentStreak: {
                        startDate: new Date().toString(),
                        numberOfDaysInARow,
                    },
                },
            });

            const completeTeamMemberStreakTask = await streakoid.completeTeamMemberStreakTasks.create({
                userId,
                teamStreakId: newTeamStreak._id,
                teamMemberStreakId: teamMemberStreakWithCurrentStreak._id,
            });

            expect(completeTeamMemberStreakTask._id).toEqual(expect.any(String));
            expect(completeTeamMemberStreakTask.userId).toEqual(userId);
            expect(completeTeamMemberStreakTask.teamStreakId).toEqual(teamStreakId);
            expect(completeTeamMemberStreakTask.teamMemberStreakId).toEqual(teamMemberStreakWithCurrentStreak._id);
            expect(completeTeamMemberStreakTask.taskCompleteTime).toEqual(expect.any(String));
            expect(completeTeamMemberStreakTask.taskCompleteDay).toEqual(expect.any(String));
            expect(completeTeamMemberStreakTask.createdAt).toEqual(expect.any(String));
            expect(completeTeamMemberStreakTask.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(completeTeamMemberStreakTask).sort()).toEqual(
                [
                    '_id',
                    'userId',
                    'teamStreakId',
                    'teamMemberStreakId',
                    'taskCompleteTime',
                    'taskCompleteDay',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );

            const teamMemberStreak = await streakoid.teamMemberStreaks.getOne(teamMemberStreakWithCurrentStreak._id);

            expect(teamMemberStreak._id).toEqual(teamMemberStreakWithCurrentStreak._id);
            expect(teamMemberStreak.currentStreak.numberOfDaysInARow).toEqual(numberOfDaysInARow + 1);
            expect(teamMemberStreak.currentStreak.startDate).toEqual(expect.any(String));
            expect(Object.keys(teamMemberStreak.currentStreak).sort()).toEqual(
                ['startDate', 'numberOfDaysInARow'].sort(),
            );
            expect(teamMemberStreak.completedToday).toEqual(true);
            expect(teamMemberStreak.active).toEqual(true);
            expect(teamMemberStreak.pastStreaks).toEqual([]);
            expect(teamMemberStreak.userId).toEqual(expect.any(String));
            expect(teamMemberStreak.teamStreakId).toEqual(teamStreakId);
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

        test('user cannot complete the same team streak member task in the same day', async () => {
            expect.assertions(3);

            const secondTeamMemberStreak = await streakoid.teamMemberStreaks.create({
                userId,
                teamStreakId,
            });
            secondTeamMemberStreakId = secondTeamMemberStreak._id;

            try {
                await streakoid.completeTeamMemberStreakTasks.create({
                    userId,
                    teamStreakId,
                    teamMemberStreakId: secondTeamMemberStreakId,
                });
                await streakoid.completeTeamMemberStreakTasks.create({
                    userId,
                    teamStreakId,
                    teamMemberStreakId: secondTeamMemberStreakId,
                });
            } catch (err) {
                expect(err.response.status).toEqual(422);
                expect(err.response.data.message).toEqual('Group member streak task already completed today.');
                expect(err.response.data.code).toEqual('422-03');
            }
        });
    });
});
