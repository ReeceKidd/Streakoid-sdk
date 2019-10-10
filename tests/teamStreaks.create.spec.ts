import { streakoid, londonTimezone } from '../src/streakoid';
import StreakStatus from '../src/StreakStatus';

const registeredEmail = 'create-team-streak-user@gmail.com';
const registeredUsername = 'create-team-streak-user';

jest.setTimeout(120000);

describe('POST /team-streaks', () => {
    let userId: string;
    let teamStreakId: string;
    let secondteamStreakId: string;

    beforeAll(async () => {
        const user = await streakoid.users.create({
            username: registeredUsername,
            email: registeredEmail,
        });
        userId = user._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.teamStreaks.deleteOne(teamStreakId);
        await streakoid.teamStreaks.deleteOne(secondteamStreakId);
    });

    test(`team streak can be created with description and numberOfMinutes`, async () => {
        expect.assertions(15);

        const streakName = 'Reading';
        const streakDescription = 'Everyday I must do 30 minutes of reading';
        const numberOfMinutes = 30;
        const members: { memberId: string; groupMemberStreakId?: string }[] = [{ memberId: userId }];

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
        expect(member.username).toEqual(expect.any(String));
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
        expect(teamStreak.streakDescription).toEqual(streakDescription);
        expect(teamStreak.numberOfMinutes).toEqual(numberOfMinutes);
        expect(teamStreak.status).toEqual(StreakStatus.live);
        expect(teamStreak.creatorId).toEqual(userId);
        expect(teamStreak.timezone).toEqual(londonTimezone);
        expect(Object.keys(teamStreak).sort()).toEqual(
            [
                '_id',
                'status',
                'members',
                'creatorId',
                'streakName',
                'streakDescription',
                'numberOfMinutes',
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
        expect.assertions(13);

        const streakName = 'meditation';
        const members: { memberId: string; groupMemberStreakId?: string }[] = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            members,
        });

        expect(teamStreak.members.length).toEqual(1);
        const member = teamStreak.members[0];
        expect(member._id).toBeDefined();
        expect(member.username).toEqual(expect.any(String));
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
        expect(Object.keys(teamStreak).sort()).toEqual(
            [
                '_id',
                'status',
                'members',
                'creatorId',
                'streakName',
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

        secondteamStreakId = teamStreak._id;
    });
});
