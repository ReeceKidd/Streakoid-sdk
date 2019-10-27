import { StreakoidFactory, londonTimezone } from '../src/streakoid';
import { getUser, streakoidTest } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { connectToDatabase } from './setup/connectToDatabase';
import { disconnectFromDatabase } from './setup/disconnectFromDatabase';
import { StreakStatus } from '../src';
import { username, originalImageUrl } from './setup/environment';

jest.setTimeout(120000);

describe('GET /team-streaks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;

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

    test(`team streak can be created with description and numberOfMinutes`, async () => {
        expect.assertions(21);

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
        expect(member.profileImage).toEqual(originalImageUrl);
        expect(Object.keys(member).sort()).toEqual(['_id', 'username', 'profileImage', 'teamMemberStreak'].sort());

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
    });
});
