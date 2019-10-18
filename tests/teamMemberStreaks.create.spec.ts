import { StreakoidFactory, londonTimezone } from '../src/streakoid';
import { getUser, streakoidTest } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { connectToDatabase } from './setup/connectToDatabase';
import { disconnectFromDatabase } from './setup/disconnectFromDatabase';

jest.setTimeout(120000);

describe('GET /complete-solo-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let teamStreakId: string;
    const streakName = 'Daily Spanish';

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await connectToDatabase();
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
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await disconnectFromDatabase();
        }
    });

    test(`creates teamMember streak associated with teamId`, async () => {
        expect.assertions(12);

        const teamMemberStreak = await streakoid.teamMemberStreaks.create({
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
        } = teamMemberStreak;

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
        expect(Object.keys(teamMemberStreak).sort()).toEqual(
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
            await streakoid.teamMemberStreaks.create({
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
            await streakoid.teamMemberStreaks.create({
                userId,
                teamStreakId: 'incorrect-team-streak-id',
            });
        } catch (err) {
            expect(err.response.status).toEqual(500);
            expect(err.response.data.code).toEqual('500-114');
        }
    });
});
