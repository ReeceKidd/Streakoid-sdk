import { londonTimezone, StreakoidFactory } from '../src/streakoid';
import StreakStatus from '../src/StreakStatus';
import { getUser, streakoidTest, username } from './setup/streakoidTest';

jest.setTimeout(120000);

describe('POST /team-streaks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let teamStreakId: string;
    let secondteamStreakId: string;

    beforeAll(async () => {
        const user = await getUser();
        userId = user._id;
        streakoid = await streakoidTest();
        userId = user._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.teamStreaks.deleteOne(teamStreakId);
        await streakoid.teamStreaks.deleteOne(secondteamStreakId);
    });

    test(`team streak can be created with description and numberOfMinutes`, async () => {
        expect.assertions(20);

        const streakName = 'Reading';
        const streakDescription = 'Everyday I must do 30 minutes of reading';
        const numberOfMinutes = 30;
        const members: { memberId: string; teamMemberStreakId?: string }[] = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            streakDescription,
            numberOfMinutes,
            members,
        });

        expect(teamStreak.members.length).toEqual(1);
        const member = teamStreak.members[0];
        expect(member._id).toBeDefined();
        expect(member.username).toEqual(username);
        expect(Object.keys(member).sort()).toEqual(['_id', 'username', 'teamMemberStreak'].sort());

        const { teamMemberStreak } = member;
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

        expect(teamStreak.streakName).toEqual(streakName);
        expect(teamStreak.status).toEqual(StreakStatus.live);
        expect(teamStreak.streakDescription).toEqual(streakDescription);
        expect(teamStreak.numberOfMinutes).toEqual(numberOfMinutes);
        expect(teamStreak.creatorId).toEqual(userId);
        expect(teamStreak.timezone).toEqual(londonTimezone);
        expect(teamStreak.active).toEqual(false);
        expect(teamStreak.completedToday).toEqual(false);
        expect(teamStreak.currentStreak.numberOfDaysInARow).toEqual(0);
        expect(Object.keys(teamStreak.currentStreak).sort()).toEqual(['numberOfDaysInARow'].sort());
        expect(teamStreak.pastStreaks.length).toEqual(0);
        expect(Object.keys(teamStreak).sort()).toEqual(
            [
                '_id',
                'status',
                'members',
                'creatorId',
                'streakName',
                'streakDescription',
                'numberOfMinutes',
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
        expect(creator.username).toEqual(expect.any(String));
        expect(Object.keys(creator).sort()).toEqual(['_id', 'username'].sort());

        teamStreakId = teamStreak._id;
    });

    test(`team streak can be created without description or numberOfMinutes`, async () => {
        expect.assertions(18);

        const streakName = 'meditation';
        const members: { memberId: string; teamMemberStreakId?: string }[] = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            members,
        });

        expect(teamStreak.members.length).toEqual(1);
        const member = teamStreak.members[0];
        expect(member._id).toBeDefined();
        expect(member.username).toEqual(username);
        expect(Object.keys(member).sort()).toEqual(['_id', 'username', 'teamMemberStreak'].sort());

        const { teamMemberStreak } = member;
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

        expect(teamStreak.streakName).toEqual(streakName);
        expect(teamStreak.status).toEqual(StreakStatus.live);
        expect(teamStreak.creatorId).toEqual(userId);
        expect(teamStreak.timezone).toEqual(londonTimezone);
        expect(teamStreak.active).toEqual(false);
        expect(teamStreak.completedToday).toEqual(false);
        expect(teamStreak.currentStreak.numberOfDaysInARow).toEqual(0);
        expect(Object.keys(teamStreak.currentStreak).sort()).toEqual(['numberOfDaysInARow'].sort());
        expect(teamStreak.pastStreaks.length).toEqual(0);
        expect(Object.keys(teamStreak).sort()).toEqual(
            [
                '_id',
                'status',
                'members',
                'creatorId',
                'active',
                'completedToday',
                'currentStreak',
                'pastStreaks',
                'timezone',
                'streakName',
                'createdAt',
                'updatedAt',
                '__v',
                'creator',
            ].sort(),
        );

        const { creator } = teamStreak;
        expect(creator._id).toBeDefined();
        expect(creator.username).toEqual(expect.any(String));
        expect(Object.keys(creator).sort()).toEqual(['_id', 'username'].sort());

        secondteamStreakId = teamStreak._id;
    });
});
