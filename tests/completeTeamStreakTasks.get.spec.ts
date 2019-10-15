import { StreakoidFactory, londonTimezone } from '../src/streakoid';
import { getUser, streakoidTest, username } from './setup/streakoidTest';
import { StreakStatus } from '../src';

const streakName = '10 minutes journaling';

jest.setTimeout(120000);

describe('GET /complete-solo-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let teamStreakId: string;
    let completeTeamStreakTaskId: string;

    beforeAll(async () => {
        const user = await getUser();
        userId = user._id;
        streakoid = await streakoidTest();
        userId = user._id;

        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            members,
        });
        teamStreakId = teamStreak._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.teamStreaks.deleteOne(teamStreakId);
        await streakoid.completeTeamStreakTasks.deleteOne(completeTeamStreakTaskId);
    });

    test(`completeTeamStreakTasks can be retreived`, async () => {
        expect.assertions(26);

        const completeTeamStreakTask = await streakoid.completeTeamStreakTasks.create({
            teamStreakId,
        });
        completeTeamStreakTaskId = completeTeamStreakTask._id;

        expect(completeTeamStreakTask._id).toBeDefined();
        expect(completeTeamStreakTask.teamStreakId).toEqual(teamStreakId);
        expect(completeTeamStreakTask.taskCompleteTime).toEqual(expect.any(String));
        expect(completeTeamStreakTask.taskCompleteDay).toEqual(expect.any(String));
        expect(completeTeamStreakTask.createdAt).toEqual(expect.any(String));
        expect(completeTeamStreakTask.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(completeTeamStreakTask).sort()).toEqual(
            ['_id', 'teamStreakId', 'taskCompleteTime', 'taskCompleteDay', 'createdAt', 'updatedAt', '__v'].sort(),
        );

        const teamStreak = await streakoid.teamStreaks.getOne(teamStreakId);

        expect(teamStreak.members.length).toEqual(1);
        const member = teamStreak.members[0];
        expect(member._id).toBeDefined();
        expect(member.username).toEqual(username);
        expect(Object.keys(member).sort()).toEqual(['_id', 'username', 'groupMemberStreak'].sort());

        const { groupMemberStreak } = member;
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

        expect(teamStreak.streakName).toEqual(streakName);
        expect(teamStreak.status).toEqual(StreakStatus.live);
        expect(teamStreak.creatorId).toEqual(userId);
        expect(teamStreak.timezone).toEqual(londonTimezone);
        expect(teamStreak.active).toEqual(true);
        expect(teamStreak.completedToday).toEqual(true);
        expect(teamStreak.currentStreak.numberOfDaysInARow).toEqual(1);
        expect(teamStreak.currentStreak.startDate).toEqual(expect.any(String));
        expect(Object.keys(teamStreak.currentStreak).sort()).toEqual(['numberOfDaysInARow', 'startDate'].sort());
        expect(teamStreak.pastStreaks.length).toEqual(0);
        expect(Object.keys(teamStreak).sort()).toEqual(
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

        const { creator } = teamStreak;
        expect(creator._id).toBeDefined();
        expect(creator.username).toEqual(username);
        expect(Object.keys(creator).sort()).toEqual(['_id', 'username'].sort());
    });
});
