import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { StreakStatus } from '../src';

jest.setTimeout(120000);

describe('POST /challenge-streaks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let challengeId: string;
    const name = 'Duolingo';
    const description = 'Everyday I must complete a duolingo lesson';
    const icon = 'duolingo';
    const color = 'blue';
    const levels = [{ level: 0, criteria: 'criteria' }];

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            const user = await getPayingUser();
            userId = user._id;
            streakoid = await streakoidTest();
            const { challenge } = await streakoid.challenges.create({
                name,
                description,
                icon,
                color,
                levels,
            });
            challengeId = challenge._id;
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`creates challenge streak`, async () => {
        expect.assertions(12);

        const challengeStreak = await streakoid.challengeStreaks.create({
            userId,
            challengeId,
        });

        expect(challengeStreak._id).toBeDefined();
        expect(challengeStreak.status).toEqual(StreakStatus.live);
        expect(challengeStreak.userId).toBeDefined();
        expect(challengeStreak.challengeId).toBeDefined();
        expect(Object.keys(challengeStreak.currentStreak)).toEqual(['numberOfDaysInARow']);
        expect(challengeStreak.currentStreak.numberOfDaysInARow).toEqual(0);
        expect(challengeStreak.completedToday).toEqual(false);
        expect(challengeStreak.active).toEqual(false);
        expect(challengeStreak.pastStreaks).toEqual([]);
        expect(challengeStreak.createdAt).toBeDefined();
        expect(challengeStreak.updatedAt).toBeDefined();
        expect(Object.keys(challengeStreak).sort()).toEqual(
            [
                'currentStreak',
                'status',
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
