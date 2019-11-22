import { StreakoidFactory, londonTimezone } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { StreakStatus } from '../src';
import { getPayingUser } from './setup/getPayingUser';

jest.setTimeout(120000);

describe('GET /challenge-streaks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    const name = 'Duolingo';
    const description = 'Everyday I must complete a duolingo lesson';
    const icon = 'duolingo';
    const color = 'blue';
    const levels = [{ level: 0, badgeId: 'badgeId', criteria: 'criteria' }];

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            const user = await getPayingUser();
            userId = user._id;
            streakoid = await streakoidTest();
            const challenge = await streakoid.challenges.create({
                name,
                description,
                icon,
                color,
                levels,
            });
            await streakoid.challengeStreaks.create({
                userId,
                challengeId: challenge._id,
            });
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`challenge streaks can be retreived with user query parameter`, async () => {
        expect.assertions(14);

        const challengeStreaks = await streakoid.challengeStreaks.getAll({ userId });
        expect(challengeStreaks.length).toBeGreaterThanOrEqual(1);

        const challengeStreak = challengeStreaks[0];

        expect(challengeStreak.currentStreak).toEqual({
            numberOfDaysInARow: 0,
        });
        expect(challengeStreak.status).toEqual(StreakStatus.live);
        expect(Object.keys(challengeStreak.currentStreak)).toEqual(['numberOfDaysInARow']);
        expect(challengeStreak.completedToday).toEqual(false);
        expect(challengeStreak.active).toEqual(false);
        expect(challengeStreak.pastStreaks).toEqual([]);
        expect(challengeStreak._id).toEqual(expect.any(String));
        expect(challengeStreak.userId).toBeDefined();
        expect(challengeStreak.challengeId).toBeDefined();
        expect(challengeStreak.timezone).toEqual(londonTimezone);
        expect(challengeStreak.createdAt).toEqual(expect.any(String));
        expect(challengeStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(challengeStreak).sort()).toEqual(
            [
                'status',
                'currentStreak',
                'completedToday',
                'active',
                'pastStreaks',
                '_id',
                'userId',
                'challengeId',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });
});
