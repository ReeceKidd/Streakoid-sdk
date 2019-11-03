import { StreakoidFactory, londonTimezone } from '../src/streakoid';
import { getUser, streakoidTest } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { connectToDatabase } from './setup/connectToDatabase';
import { disconnectFromDatabase } from './setup/disconnectFromDatabase';
import { StreakStatus } from '../src';
import { getFriend } from './setup/getFriend';
import { username, originalImageUrl } from './setup/environment';

jest.setTimeout(120000);

describe('GET /complete-team-member-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let friendId: string;
    const streakName = 'Daily Spanish';

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await connectToDatabase();
            const user = await getUser();
            userId = user._id;
            streakoid = await streakoidTest();
            const friend = await getFriend();
            friendId = friend._id;
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await disconnectFromDatabase();
        }
    });

    test('user can complete a team member streak task with a new current streak', async () => {
        expect.assertions(22);

        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            members,
        });

        const teamMemberStreaks = await streakoid.teamMemberStreaks.getAll({
            userId,
            teamStreakId: teamStreak._id,
        });
        const teamMemberStreak = teamMemberStreaks[0];

        const completeTeamMemberStreakTask = await streakoid.completeTeamMemberStreakTasks.create({
            userId,
            teamStreakId: teamStreak._id,
            teamMemberStreakId: teamMemberStreak._id,
        });
        expect(completeTeamMemberStreakTask._id).toEqual(expect.any(String));
        expect(completeTeamMemberStreakTask.userId).toEqual(userId);
        expect(completeTeamMemberStreakTask.teamStreakId).toEqual(teamStreak._id);
        expect(completeTeamMemberStreakTask.teamMemberStreakId).toEqual(teamMemberStreak._id);
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

        const updatedTeamMemberStreak = await streakoid.teamMemberStreaks.getOne(teamMemberStreak._id);

        expect(updatedTeamMemberStreak._id).toEqual(expect.any(String));
        expect(updatedTeamMemberStreak.currentStreak.numberOfDaysInARow).toEqual(1);
        expect(updatedTeamMemberStreak.currentStreak.startDate).toEqual(expect.any(String));
        expect(Object.keys(updatedTeamMemberStreak.currentStreak).sort()).toEqual(
            ['startDate', 'numberOfDaysInARow'].sort(),
        );
        expect(updatedTeamMemberStreak.completedToday).toEqual(true);
        expect(updatedTeamMemberStreak.active).toEqual(true);
        expect(updatedTeamMemberStreak.pastStreaks).toEqual([]);
        expect(updatedTeamMemberStreak.userId).toEqual(expect.any(String));
        expect(updatedTeamMemberStreak.teamStreakId).toEqual(teamStreak._id);
        expect(updatedTeamMemberStreak.timezone).toEqual(expect.any(String));
        expect(updatedTeamMemberStreak.createdAt).toEqual(expect.any(String));
        expect(updatedTeamMemberStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(updatedTeamMemberStreak).sort()).toEqual(
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

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            members,
        });

        const teamMemberStreaks = await streakoid.teamMemberStreaks.getAll({
            userId,
            teamStreakId: teamStreak._id,
        });
        const teamMemberStreak = teamMemberStreaks[0];

        const numberOfDaysInARow = 2;

        const teamMemberStreakWithCurrentStreak = await streakoid.teamMemberStreaks.update({
            teamMemberStreakId: teamMemberStreak._id,
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
            teamStreakId: teamStreak._id,
            teamMemberStreakId: teamMemberStreakWithCurrentStreak._id,
        });

        expect(completeTeamMemberStreakTask._id).toEqual(expect.any(String));
        expect(completeTeamMemberStreakTask.userId).toEqual(userId);
        expect(completeTeamMemberStreakTask.teamStreakId).toEqual(teamStreak._id);
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

        const updatedTeamMemberStreak = await streakoid.teamMemberStreaks.getOne(teamMemberStreakWithCurrentStreak._id);

        expect(updatedTeamMemberStreak._id).toEqual(teamMemberStreakWithCurrentStreak._id);
        expect(updatedTeamMemberStreak.currentStreak.numberOfDaysInARow).toEqual(numberOfDaysInARow + 1);
        expect(updatedTeamMemberStreak.currentStreak.startDate).toEqual(expect.any(String));
        expect(Object.keys(updatedTeamMemberStreak.currentStreak).sort()).toEqual(
            ['startDate', 'numberOfDaysInARow'].sort(),
        );
        expect(updatedTeamMemberStreak.completedToday).toEqual(true);
        expect(updatedTeamMemberStreak.active).toEqual(true);
        expect(updatedTeamMemberStreak.pastStreaks).toEqual([]);
        expect(updatedTeamMemberStreak.userId).toEqual(expect.any(String));
        expect(updatedTeamMemberStreak.teamStreakId).toEqual(teamStreak._id);
        expect(updatedTeamMemberStreak.timezone).toEqual(expect.any(String));
        expect(updatedTeamMemberStreak.createdAt).toEqual(expect.any(String));
        expect(updatedTeamMemberStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(updatedTeamMemberStreak).sort()).toEqual(
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

    test('if lone team member has completed their task the new team streak gets updated.', async () => {
        expect.assertions(49);

        const members = [{ memberId: userId }];

        const teamStreakWithOneMember = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            members,
        });

        const teamMemberStreaks = await streakoid.teamMemberStreaks.getAll({
            userId,
            teamStreakId: teamStreakWithOneMember._id,
        });
        const teamMemberStreak = teamMemberStreaks[0];
        const teamMemberStreakId = teamMemberStreak._id;

        const completeTeamMemberStreakTask = await streakoid.completeTeamMemberStreakTasks.create({
            userId,
            teamStreakId: teamStreakWithOneMember._id,
            teamMemberStreakId,
        });
        expect(completeTeamMemberStreakTask._id).toEqual(expect.any(String));
        expect(completeTeamMemberStreakTask.userId).toEqual(userId);
        expect(completeTeamMemberStreakTask.teamStreakId).toEqual(teamStreakWithOneMember._id);
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

        const updatedTeamMemberStreak = await streakoid.teamMemberStreaks.getOne(teamMemberStreakId);

        expect(updatedTeamMemberStreak._id).toEqual(expect.any(String));
        expect(updatedTeamMemberStreak.currentStreak.numberOfDaysInARow).toEqual(1);
        expect(updatedTeamMemberStreak.currentStreak.startDate).toEqual(expect.any(String));
        expect(Object.keys(updatedTeamMemberStreak.currentStreak).sort()).toEqual(
            ['startDate', 'numberOfDaysInARow'].sort(),
        );
        expect(updatedTeamMemberStreak.completedToday).toEqual(true);
        expect(updatedTeamMemberStreak.active).toEqual(true);
        expect(updatedTeamMemberStreak.pastStreaks).toEqual([]);
        expect(updatedTeamMemberStreak.userId).toEqual(expect.any(String));
        expect(updatedTeamMemberStreak.teamStreakId).toEqual(teamStreakWithOneMember._id);
        expect(updatedTeamMemberStreak.timezone).toEqual(expect.any(String));
        expect(updatedTeamMemberStreak.createdAt).toEqual(expect.any(String));
        expect(updatedTeamMemberStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(updatedTeamMemberStreak).sort()).toEqual(
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

        const completeTeamStreaks = await streakoid.completeTeamStreaks.getAll({
            teamStreakId: teamStreakWithOneMember._id,
        });
        const completeTeamStreak = completeTeamStreaks[0];

        expect(completeTeamStreak._id).toBeDefined();
        expect(completeTeamStreak.teamStreakId).toEqual(teamStreakWithOneMember._id);
        expect(completeTeamStreak.taskCompleteTime).toEqual(expect.any(String));
        expect(completeTeamStreak.taskCompleteDay).toEqual(expect.any(String));
        expect(completeTeamStreak.createdAt).toEqual(expect.any(String));
        expect(completeTeamStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(completeTeamStreak).sort()).toEqual(
            ['_id', 'teamStreakId', 'taskCompleteTime', 'taskCompleteDay', 'createdAt', 'updatedAt', '__v'].sort(),
        );

        const updatedTeamStreak = await streakoid.teamStreaks.getOne(teamStreakWithOneMember._id);

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
        expect(Object.keys(updatedTeamStreak.currentStreak).sort()).toEqual(['numberOfDaysInARow', 'startDate'].sort());
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

    test('if lone team member has completed their task the existing team streak gets updated.', async () => {
        expect.assertions(49);

        const members = [{ memberId: userId }];

        const teamStreakWithOneMember = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            members,
        });

        const numberOfDaysInARow = 2;

        const teamStreakWithCurrentStreak = await streakoid.teamStreaks.update({
            teamStreakId: teamStreakWithOneMember._id,
            updateData: {
                active: true,
                currentStreak: {
                    startDate: new Date().toString(),
                    numberOfDaysInARow,
                },
            },
        });

        const teamMemberStreaks = await streakoid.teamMemberStreaks.getAll({
            userId,
            teamStreakId: teamStreakWithCurrentStreak._id,
        });
        const teamMemberStreak = teamMemberStreaks[0];
        const teamMemberStreakId = teamMemberStreak._id;

        const completeTeamMemberStreakTask = await streakoid.completeTeamMemberStreakTasks.create({
            userId,
            teamStreakId: teamStreakWithCurrentStreak._id,
            teamMemberStreakId,
        });
        expect(completeTeamMemberStreakTask._id).toEqual(expect.any(String));
        expect(completeTeamMemberStreakTask.userId).toEqual(userId);
        expect(completeTeamMemberStreakTask.teamStreakId).toEqual(teamStreakWithCurrentStreak._id);
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

        const updatedTeamMemberStreak = await streakoid.teamMemberStreaks.getOne(teamMemberStreakId);

        expect(updatedTeamMemberStreak._id).toEqual(expect.any(String));
        expect(updatedTeamMemberStreak.currentStreak.numberOfDaysInARow).toEqual(1);
        expect(updatedTeamMemberStreak.currentStreak.startDate).toEqual(expect.any(String));
        expect(Object.keys(updatedTeamMemberStreak.currentStreak).sort()).toEqual(
            ['startDate', 'numberOfDaysInARow'].sort(),
        );
        expect(updatedTeamMemberStreak.completedToday).toEqual(true);
        expect(updatedTeamMemberStreak.active).toEqual(true);
        expect(updatedTeamMemberStreak.pastStreaks).toEqual([]);
        expect(updatedTeamMemberStreak.userId).toEqual(expect.any(String));
        expect(updatedTeamMemberStreak.teamStreakId).toEqual(teamStreakWithOneMember._id);
        expect(updatedTeamMemberStreak.timezone).toEqual(expect.any(String));
        expect(updatedTeamMemberStreak.createdAt).toEqual(expect.any(String));
        expect(updatedTeamMemberStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(updatedTeamMemberStreak).sort()).toEqual(
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

        const completeTeamStreaks = await streakoid.completeTeamStreaks.getAll({
            teamStreakId: teamStreakWithCurrentStreak._id,
        });
        const completeTeamStreak = completeTeamStreaks[0];

        expect(completeTeamStreak._id).toBeDefined();
        expect(completeTeamStreak.teamStreakId).toEqual(teamStreakWithCurrentStreak._id);
        expect(completeTeamStreak.taskCompleteTime).toEqual(expect.any(String));
        expect(completeTeamStreak.taskCompleteDay).toEqual(expect.any(String));
        expect(completeTeamStreak.createdAt).toEqual(expect.any(String));
        expect(completeTeamStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(completeTeamStreak).sort()).toEqual(
            ['_id', 'teamStreakId', 'taskCompleteTime', 'taskCompleteDay', 'createdAt', 'updatedAt', '__v'].sort(),
        );

        const updatedTeamStreak = await streakoid.teamStreaks.getOne(teamStreakWithCurrentStreak._id);

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
        expect(updatedTeamStreak.currentStreak.numberOfDaysInARow).toEqual(numberOfDaysInARow + 1);
        expect(updatedTeamStreak.currentStreak.startDate).toEqual(expect.any(String));
        expect(Object.keys(updatedTeamStreak.currentStreak).sort()).toEqual(['numberOfDaysInARow', 'startDate'].sort());
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

    test('if one of two team members has not completed their task the new team streak does not get completed for the day', async () => {
        expect.assertions(49);

        const members = [{ memberId: userId }, { memberId: friendId }];

        const teamStreakWithTwoMembers = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            members,
        });

        let teamMemberStreaks = await streakoid.teamMemberStreaks.getAll({
            userId,
            teamStreakId: teamStreakWithTwoMembers._id,
        });
        const userTeamMemberStreak = teamMemberStreaks[0];
        const userTeamMemberStreakId = userTeamMemberStreak._id;

        teamMemberStreaks = await streakoid.teamMemberStreaks.getAll({
            userId: friendId,
            teamStreakId: teamStreakWithTwoMembers._id,
        });

        const friendTeamMemberStreak = teamMemberStreaks[0];
        const friendTeamMemberStreakId = friendTeamMemberStreak._id;

        const completeTeamMemberStreakTask = await streakoid.completeTeamMemberStreakTasks.create({
            userId,
            teamStreakId: teamStreakWithTwoMembers._id,
            teamMemberStreakId: userTeamMemberStreakId,
        });
        expect(completeTeamMemberStreakTask._id).toEqual(expect.any(String));
        expect(completeTeamMemberStreakTask.userId).toEqual(userId);
        expect(completeTeamMemberStreakTask.teamStreakId).toEqual(teamStreakWithTwoMembers._id);
        expect(completeTeamMemberStreakTask.teamMemberStreakId).toEqual(userTeamMemberStreakId);
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

        const updatedUserTeamMemberStreak = await streakoid.teamMemberStreaks.getOne(userTeamMemberStreakId);

        expect(updatedUserTeamMemberStreak._id).toEqual(expect.any(String));
        expect(updatedUserTeamMemberStreak.currentStreak.numberOfDaysInARow).toEqual(1);
        expect(updatedUserTeamMemberStreak.currentStreak.startDate).toEqual(expect.any(String));
        expect(Object.keys(updatedUserTeamMemberStreak.currentStreak).sort()).toEqual(
            ['startDate', 'numberOfDaysInARow'].sort(),
        );
        expect(updatedUserTeamMemberStreak.completedToday).toEqual(true);
        expect(updatedUserTeamMemberStreak.active).toEqual(true);
        expect(updatedUserTeamMemberStreak.pastStreaks).toEqual([]);
        expect(updatedUserTeamMemberStreak.userId).toEqual(expect.any(String));
        expect(updatedUserTeamMemberStreak.teamStreakId).toEqual(teamStreakWithTwoMembers._id);
        expect(updatedUserTeamMemberStreak.timezone).toEqual(expect.any(String));
        expect(updatedUserTeamMemberStreak.createdAt).toEqual(expect.any(String));
        expect(updatedUserTeamMemberStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(updatedUserTeamMemberStreak).sort()).toEqual(
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

        const unaffectedFriendTeamMemberStreak = await streakoid.teamMemberStreaks.getOne(friendTeamMemberStreakId);

        expect(unaffectedFriendTeamMemberStreak._id).toEqual(expect.any(String));
        expect(unaffectedFriendTeamMemberStreak.currentStreak.numberOfDaysInARow).toEqual(0);
        expect(Object.keys(unaffectedFriendTeamMemberStreak.currentStreak).sort()).toEqual(
            ['numberOfDaysInARow'].sort(),
        );
        expect(unaffectedFriendTeamMemberStreak.completedToday).toEqual(false);
        expect(unaffectedFriendTeamMemberStreak.active).toEqual(false);
        expect(unaffectedFriendTeamMemberStreak.pastStreaks).toEqual([]);
        expect(unaffectedFriendTeamMemberStreak.userId).toEqual(expect.any(String));
        expect(unaffectedFriendTeamMemberStreak.teamStreakId).toEqual(teamStreakWithTwoMembers._id);
        expect(unaffectedFriendTeamMemberStreak.timezone).toEqual(expect.any(String));
        expect(unaffectedFriendTeamMemberStreak.createdAt).toEqual(expect.any(String));
        expect(unaffectedFriendTeamMemberStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(unaffectedFriendTeamMemberStreak).sort()).toEqual(
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

        const completeTeamStreaks = await streakoid.completeTeamStreaks.getAll({
            teamStreakId: teamStreakWithTwoMembers._id,
        });
        expect(completeTeamStreaks.length).toEqual(0);

        const unaffectedTeamStreak = await streakoid.teamStreaks.getOne(teamStreakWithTwoMembers._id);

        expect(unaffectedTeamStreak.members.length).toEqual(2);
        expect(unaffectedTeamStreak.streakName).toEqual(streakName);
        expect(unaffectedTeamStreak.status).toEqual(StreakStatus.live);
        expect(unaffectedTeamStreak.creatorId).toEqual(userId);
        expect(unaffectedTeamStreak.timezone).toEqual(londonTimezone);
        expect(unaffectedTeamStreak.active).toEqual(true);
        expect(unaffectedTeamStreak.completedToday).toEqual(false);
        expect(unaffectedTeamStreak.currentStreak.numberOfDaysInARow).toEqual(0);
        expect(Object.keys(unaffectedTeamStreak.currentStreak).sort()).toEqual(['numberOfDaysInARow'].sort());
        expect(unaffectedTeamStreak.pastStreaks.length).toEqual(0);
        expect(Object.keys(unaffectedTeamStreak).sort()).toEqual(
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

        const { creator } = unaffectedTeamStreak;
        expect(creator._id).toBeDefined();
        expect(creator.username).toEqual(username);
        expect(Object.keys(creator).sort()).toEqual(['_id', 'username'].sort());
    });

    test('if one of two team members has not completed their task the exiting team streak does not get completed for the day', async () => {
        expect.assertions(50);

        const members = [{ memberId: userId }, { memberId: friendId }];

        const teamStreakWithTwoMembers = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            members,
        });

        const numberOfDaysInARow = 2;

        const teamStreakWithCurrentStreak = await streakoid.teamStreaks.update({
            teamStreakId: teamStreakWithTwoMembers._id,
            updateData: {
                active: true,
                currentStreak: {
                    startDate: new Date().toString(),
                    numberOfDaysInARow,
                },
            },
        });

        let teamMemberStreaks = await streakoid.teamMemberStreaks.getAll({
            userId,
            teamStreakId: teamStreakWithCurrentStreak._id,
        });
        const userTeamMemberStreak = teamMemberStreaks[0];
        const userTeamMemberStreakId = userTeamMemberStreak._id;

        teamMemberStreaks = await streakoid.teamMemberStreaks.getAll({
            userId: friendId,
            teamStreakId: teamStreakWithCurrentStreak._id,
        });

        const friendTeamMemberStreak = teamMemberStreaks[0];
        const friendTeamMemberStreakId = friendTeamMemberStreak._id;

        const completeTeamMemberStreakTask = await streakoid.completeTeamMemberStreakTasks.create({
            userId,
            teamStreakId: teamStreakWithCurrentStreak._id,
            teamMemberStreakId: userTeamMemberStreakId,
        });
        expect(completeTeamMemberStreakTask._id).toEqual(expect.any(String));
        expect(completeTeamMemberStreakTask.userId).toEqual(userId);
        expect(completeTeamMemberStreakTask.teamStreakId).toEqual(teamStreakWithCurrentStreak._id);
        expect(completeTeamMemberStreakTask.teamMemberStreakId).toEqual(userTeamMemberStreakId);
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

        const updatedUserTeamMemberStreak = await streakoid.teamMemberStreaks.getOne(userTeamMemberStreakId);

        expect(updatedUserTeamMemberStreak._id).toEqual(expect.any(String));
        expect(updatedUserTeamMemberStreak.currentStreak.numberOfDaysInARow).toEqual(1);
        expect(updatedUserTeamMemberStreak.currentStreak.startDate).toEqual(expect.any(String));
        expect(Object.keys(updatedUserTeamMemberStreak.currentStreak).sort()).toEqual(
            ['startDate', 'numberOfDaysInARow'].sort(),
        );
        expect(updatedUserTeamMemberStreak.completedToday).toEqual(true);
        expect(updatedUserTeamMemberStreak.active).toEqual(true);
        expect(updatedUserTeamMemberStreak.pastStreaks).toEqual([]);
        expect(updatedUserTeamMemberStreak.userId).toEqual(expect.any(String));
        expect(updatedUserTeamMemberStreak.teamStreakId).toEqual(teamStreakWithCurrentStreak._id);
        expect(updatedUserTeamMemberStreak.timezone).toEqual(expect.any(String));
        expect(updatedUserTeamMemberStreak.createdAt).toEqual(expect.any(String));
        expect(updatedUserTeamMemberStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(updatedUserTeamMemberStreak).sort()).toEqual(
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

        const unaffectedFriendTeamMemberStreak = await streakoid.teamMemberStreaks.getOne(friendTeamMemberStreakId);

        expect(unaffectedFriendTeamMemberStreak._id).toEqual(expect.any(String));
        expect(unaffectedFriendTeamMemberStreak.currentStreak.numberOfDaysInARow).toEqual(0);
        expect(Object.keys(unaffectedFriendTeamMemberStreak.currentStreak).sort()).toEqual(
            ['numberOfDaysInARow'].sort(),
        );
        expect(unaffectedFriendTeamMemberStreak.completedToday).toEqual(false);
        expect(unaffectedFriendTeamMemberStreak.active).toEqual(false);
        expect(unaffectedFriendTeamMemberStreak.pastStreaks).toEqual([]);
        expect(unaffectedFriendTeamMemberStreak.userId).toEqual(expect.any(String));
        expect(unaffectedFriendTeamMemberStreak.teamStreakId).toEqual(teamStreakWithCurrentStreak._id);
        expect(unaffectedFriendTeamMemberStreak.timezone).toEqual(expect.any(String));
        expect(unaffectedFriendTeamMemberStreak.createdAt).toEqual(expect.any(String));
        expect(unaffectedFriendTeamMemberStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(unaffectedFriendTeamMemberStreak).sort()).toEqual(
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

        const completeTeamStreaks = await streakoid.completeTeamStreaks.getAll({
            teamStreakId: teamStreakWithCurrentStreak._id,
        });
        expect(completeTeamStreaks.length).toEqual(0);

        const unaffectedTeamStreak = await streakoid.teamStreaks.getOne(teamStreakWithCurrentStreak._id);

        expect(unaffectedTeamStreak.members.length).toEqual(2);
        expect(unaffectedTeamStreak.streakName).toEqual(streakName);
        expect(unaffectedTeamStreak.status).toEqual(StreakStatus.live);
        expect(unaffectedTeamStreak.creatorId).toEqual(userId);
        expect(unaffectedTeamStreak.timezone).toEqual(londonTimezone);
        expect(unaffectedTeamStreak.active).toEqual(true);
        expect(unaffectedTeamStreak.completedToday).toEqual(false);
        expect(unaffectedTeamStreak.currentStreak.numberOfDaysInARow).toEqual(numberOfDaysInARow);
        expect(unaffectedTeamStreak.currentStreak.startDate).toEqual(expect.any(String));
        expect(Object.keys(unaffectedTeamStreak.currentStreak).sort()).toEqual(
            ['numberOfDaysInARow', 'startDate'].sort(),
        );
        expect(unaffectedTeamStreak.pastStreaks.length).toEqual(0);
        expect(Object.keys(unaffectedTeamStreak).sort()).toEqual(
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

        const { creator } = unaffectedTeamStreak;
        expect(creator._id).toBeDefined();
        expect(creator.username).toEqual(username);
        expect(Object.keys(creator).sort()).toEqual(['_id', 'username'].sort());
    });

    test('completing one team streak for the day does not affect another existing team streak.', async () => {
        expect.assertions(30);

        const members = [{ memberId: userId }];

        const reading = 'reading';

        const readingTeamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName: reading,
            members,
        });

        const readingTeamMemberStreaks = await streakoid.teamMemberStreaks.getAll({
            userId,
            teamStreakId: readingTeamStreak._id,
        });
        const readingTeamMemberStreak = readingTeamMemberStreaks[0];
        const readingTeamMemberStreakId = readingTeamMemberStreak._id;

        const yoga = 'yoga';

        const yogaTeamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName: yoga,
            members,
        });

        const yogaTeamMemberStreaks = await streakoid.teamMemberStreaks.getAll({
            userId,
            teamStreakId: yogaTeamStreak._id,
        });
        const yogaTeamMemberStreak = yogaTeamMemberStreaks[0];
        const yogTeamMemberStreakId = yogaTeamMemberStreak._id;

        const completeReadingTeamMemberStreakTask = await streakoid.completeTeamMemberStreakTasks.create({
            userId,
            teamStreakId: readingTeamStreak._id,
            teamMemberStreakId: readingTeamMemberStreakId,
        });
        expect(completeReadingTeamMemberStreakTask._id).toEqual(expect.any(String));
        expect(completeReadingTeamMemberStreakTask.userId).toEqual(userId);
        expect(completeReadingTeamMemberStreakTask.teamStreakId).toEqual(readingTeamStreak._id);
        expect(completeReadingTeamMemberStreakTask.teamMemberStreakId).toEqual(readingTeamMemberStreakId);
        expect(completeReadingTeamMemberStreakTask.taskCompleteTime).toEqual(expect.any(String));
        expect(completeReadingTeamMemberStreakTask.taskCompleteDay).toEqual(expect.any(String));
        expect(completeReadingTeamMemberStreakTask.createdAt).toEqual(expect.any(String));
        expect(completeReadingTeamMemberStreakTask.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(completeReadingTeamMemberStreakTask).sort()).toEqual(
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

        const updatedReadingTeamMemberStreak = await streakoid.teamMemberStreaks.getOne(readingTeamMemberStreakId);

        expect(updatedReadingTeamMemberStreak._id).toEqual(expect.any(String));
        expect(updatedReadingTeamMemberStreak.currentStreak.numberOfDaysInARow).toEqual(1);
        expect(updatedReadingTeamMemberStreak.currentStreak.startDate).toEqual(expect.any(String));
        expect(Object.keys(updatedReadingTeamMemberStreak.currentStreak).sort()).toEqual(
            ['startDate', 'numberOfDaysInARow'].sort(),
        );
        expect(updatedReadingTeamMemberStreak.completedToday).toEqual(true);
        expect(updatedReadingTeamMemberStreak.active).toEqual(true);
        expect(updatedReadingTeamMemberStreak.pastStreaks).toEqual([]);
        expect(updatedReadingTeamMemberStreak.userId).toEqual(expect.any(String));
        expect(updatedReadingTeamMemberStreak.teamStreakId).toEqual(readingTeamStreak._id);
        expect(updatedReadingTeamMemberStreak.timezone).toEqual(expect.any(String));
        expect(updatedReadingTeamMemberStreak.createdAt).toEqual(expect.any(String));
        expect(updatedReadingTeamMemberStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(updatedReadingTeamMemberStreak).sort()).toEqual(
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

        const updatedYogaTeamMemberStreak = await streakoid.teamMemberStreaks.getOne(yogTeamMemberStreakId);

        expect(updatedYogaTeamMemberStreak.active).toEqual(yogaTeamMemberStreak.active);
        expect(updatedYogaTeamMemberStreak.completedToday).toEqual(yogaTeamMemberStreak.completedToday);
        expect(updatedYogaTeamMemberStreak.currentStreak).toEqual(yogaTeamMemberStreak.currentStreak);
        expect(updatedYogaTeamMemberStreak.pastStreaks).toEqual(yogaTeamMemberStreak.pastStreaks);

        const updatedYogaTeamStreak = await streakoid.teamStreaks.getOne(yogaTeamStreak._id);

        expect(updatedYogaTeamStreak.active).toEqual(yogaTeamStreak.active);
        expect(updatedYogaTeamStreak.completedToday).toEqual(yogaTeamStreak.completedToday);
        expect(updatedYogaTeamStreak.currentStreak).toEqual(yogaTeamStreak.currentStreak);
        expect(updatedYogaTeamStreak.pastStreaks).toEqual(yogaTeamStreak.pastStreaks);
    });

    test('user cannot complete the same team streak member task in the same day', async () => {
        expect.assertions(3);

        try {
            const members = [{ memberId: userId }];

            const teamStreak = await streakoid.teamStreaks.create({
                creatorId: userId,
                streakName,
                members,
            });

            const teamMemberStreaks = await streakoid.teamMemberStreaks.getAll({
                userId,
                teamStreakId: teamStreak._id,
            });
            const teamMemberStreak = teamMemberStreaks[0];

            await streakoid.completeTeamMemberStreakTasks.create({
                userId,
                teamStreakId: teamStreak._id,
                teamMemberStreakId: teamMemberStreak._id,
            });
            await streakoid.completeTeamMemberStreakTasks.create({
                userId,
                teamStreakId: teamStreak._id,
                teamMemberStreakId: teamMemberStreak._id,
            });
        } catch (err) {
            expect(err.response.status).toEqual(422);
            expect(err.response.data.message).toEqual('Team member streak task already completed today.');
            expect(err.response.data.code).toEqual('422-03');
        }
    });
});
