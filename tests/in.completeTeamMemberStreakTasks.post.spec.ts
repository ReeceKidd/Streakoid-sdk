import { StreakoidFactory, londonTimezone } from '../src/streakoid';
import { getUser, streakoidTest } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { connectToDatabase } from './setup/connectToDatabase';
import { disconnectFromDatabase } from './setup/disconnectFromDatabase';
import { username, originalImageUrl } from './setup/environment';
import { StreakStatus } from '../src';

jest.setTimeout(120000);

describe('GET /incomplete-team-member-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    const streakName = 'Daily Spanish';

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await connectToDatabase();
            const user = await getUser();
            userId = user._id;
            streakoid = await streakoidTest();
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await disconnectFromDatabase();
        }
    });

    describe('POST /v1/incomplete-solo-streak-tasks', () => {
        test.only('lone user can incomplete a team member streak task, the start date gets reset of the teamMemberStreak and teamStreak if it is the first day of the streak', async () => {
            expect.assertions(22);

            const members = [{ memberId: userId }];

            const teamStreak = await streakoid.teamStreaks.create({
                creatorId: userId,
                streakName,
                members,
            });
            const teamStreakId = teamStreak._id;

            const originalTeamMemberStreak = await streakoid.teamMemberStreaks.create({
                userId,
                teamStreakId,
            });
            const teamMemberStreakId = originalTeamMemberStreak._id;

            // Team member streaks tasks must be completed before they can be incompleted.
            await streakoid.completeTeamMemberStreakTasks.create({
                userId,
                teamStreakId,
                teamMemberStreakId,
            });

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

            const incompleteTeamStreaks = await streakoid.incompleteTeamStreaks.getAll({
                teamStreakId: teamStreak._id,
            });
            const incompleteTeamStreak = incompleteTeamStreaks[0];

            expect(incompleteTeamStreak._id).toBeDefined();
            expect(incompleteTeamStreak.teamStreakId).toEqual(teamStreak._id);
            expect(incompleteTeamStreak.taskIncompleteTime).toEqual(expect.any(String));
            expect(incompleteTeamStreak.taskIncompleteDay).toEqual(expect.any(String));
            expect(incompleteTeamStreak.createdAt).toEqual(expect.any(String));
            expect(incompleteTeamStreak.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(incompleteTeamStreak).sort()).toEqual(
                ['_id', 'teamStreakId', 'taskCompleteTime', 'taskCompleteDay', 'createdAt', 'updatedAt', '__v'].sort(),
            );

            const updatedTeamStreak = await streakoid.teamStreaks.getOne(teamStreak._id);

            expect(updatedTeamStreak.members.length).toEqual(1);
            const member = updatedTeamStreak.members[0];
            expect(member._id).toBeDefined();
            expect(member.username).toEqual(username);
            expect(member.profileImage).toEqual(originalImageUrl);
            expect(Object.keys(member).sort()).toEqual(['_id', 'username', 'profileImage', 'teamMemberStreak'].sort());
            expect(Object.keys(updatedTeamStreak.members[0].teamMemberStreak).sort()).toEqual(
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

            expect(updatedTeamStreak.streakName).toEqual(streakName);
            expect(updatedTeamStreak.status).toEqual(StreakStatus.live);
            expect(updatedTeamStreak.creatorId).toEqual(userId);
            expect(updatedTeamStreak.timezone).toEqual(londonTimezone);
            expect(updatedTeamStreak.active).toEqual(true);
            expect(updatedTeamStreak.completedToday).toEqual(true);
            expect(updatedTeamStreak.currentStreak.numberOfDaysInARow).toEqual(1);
            expect(updatedTeamStreak.currentStreak.startDate).toEqual(expect.any(String));
            expect(Object.keys(updatedTeamStreak.currentStreak).sort()).toEqual(
                ['numberOfDaysInARow', 'startDate'].sort(),
            );
            expect(updatedTeamStreak.pastStreaks.length).toEqual(0);
            expect(Object.keys(updatedTeamStreak).sort()).toEqual(
                [
                    '_id',
                    'status',
                    'members',
                    'creatorId',
                    'streakName',
                    'active',
                    'completedToday',
                    'currentStreak',
                    'pastStreaks',
                    'timezone',
                    'createdAt',
                    'updatedAt',
                    '__v',
                    'creator',
                ].sort(),
            );

            const { creator } = updatedTeamStreak;
            expect(creator._id).toBeDefined();
            expect(creator.username).toEqual(username);
            expect(Object.keys(creator).sort()).toEqual(['_id', 'username'].sort());
        });

        test('user can incomplete a team member streak task after the first day of the streak', async () => {
            expect.assertions(22);
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

            // Team member streaks tasks must be completed before they can be incompleted.
            await streakoid.completeTeamMemberStreakTasks.create({
                userId,
                teamStreakId: newTeamStreak._id,
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
                expect(err.response.data.message).toEqual('Team member streak task has not been completed today.');
                expect(err.response.data.code).toEqual('422-04');
            }
        });
    });
});
