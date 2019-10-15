import { londonTimezone, StreakoidFactory } from '../src/streakoid';
import { getUser, streakoidTest } from './setup/streakoidTest';

jest.setTimeout(120000);

describe('POST /group-member-streaks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let teamStreakId: string;
    let createdGroupMemberStreakId: string;

    const streakName = 'Daily Spanish';
    const streakDescription = 'Everyday I must do Spanish on Duolingo';

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
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.teamStreaks.deleteOne(teamStreakId);
        await streakoid.groupMemberStreaks.deleteOne(createdGroupMemberStreakId);
    });

    test(`creates groupMember streak associated with groupId`, async () => {
        expect.assertions(12);

        const groupMemberStreak = await streakoid.groupMemberStreaks.create({
            userId,
            teamStreakId,
        });

        const {
            _id,
            currentStreak,
            completedToday,
            active,
            timezone,
            pastStreaks,
            createdAt,
            updatedAt,
        } = groupMemberStreak;

        expect(Object.keys(currentStreak)).toEqual(['numberOfDaysInARow']);
        expect(currentStreak.numberOfDaysInARow).toEqual(0);
        expect(completedToday).toEqual(false);
        expect(active).toEqual(false);
        expect(pastStreaks).toEqual([]);
        expect(_id).toBeDefined();
        expect(userId).toEqual(userId);
        expect(teamStreakId).toEqual(teamStreakId);
        expect(timezone).toEqual(londonTimezone);
        expect(createdAt).toEqual(expect.any(String));
        expect(updatedAt).toEqual(expect.any(String));
        expect(Object.keys(groupMemberStreak).sort()).toEqual(
            [
                'currentStreak',
                'completedToday',
                'active',
                'pastStreaks',
                '_id',
                'userId',
                'teamStreakId',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });

    test('throws userId does not exist error', async () => {
        expect.assertions(2);

        try {
            await streakoid.groupMemberStreaks.create({
                userId: 'incorrect-userid',
                teamStreakId,
            });
        } catch (err) {
            expect(err.response.status).toEqual(500);
            expect(err.response.data.code).toEqual('500-113');
        }
    });

    test('throws teamStreakId does not exist error', async () => {
        expect.assertions(2);

        try {
            await streakoid.groupMemberStreaks.create({
                userId,
                teamStreakId: 'incorrect-team-streak-id',
            });
        } catch (err) {
            expect(err.response.status).toEqual(500);
            expect(err.response.data.code).toEqual('500-114');
        }
    });
});
