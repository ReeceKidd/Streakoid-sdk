import { StreakoidFactory, londonTimezone } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { StreakStatus } from '../src';
import { getPayingUser } from './setup/getPayingUser';
import { GetAllChallengeStreaksSortFields } from '../src/challengeStreak';

jest.setTimeout(120000);

describe('GET /challenge-streaks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let challengeId: string;

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            const user = await getPayingUser();
            userId = user._id;
            streakoid = await streakoidTest();
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`challenge streaks can be retreived with user query parameter`, async () => {
        expect.assertions(13);

        const name = 'Duolingo';
        const color = 'blue';
        const levels = [{ level: 0, criteria: 'criteria' }];
        const description = 'Everyday I must complete a duolingo lesson';
        const icon = 'duolingo';
        const { challenge } = await streakoid.challenges.create({
            name,
            description,
            icon,
            color,
            levels,
        });
        challengeId = challenge._id;
        await streakoid.challengeStreaks.create({
            userId,
            challengeId: challenge._id,
        });

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
                'badgeId',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });

    test('incomplete challenge streaks can be retreived', async () => {
        expect.assertions(14);

        const name = 'Duolingo';
        const color = 'blue';
        const levels = [{ level: 0, criteria: 'criteria' }];
        const description = 'Everyday I must complete a duolingo lesson';
        const icon = 'duolingo';
        const { challenge } = await streakoid.challenges.create({
            name,
            description,
            icon,
            color,
            levels,
        });
        challengeId = challenge._id;

        const newChallengeStreak = await streakoid.challengeStreaks.create({
            userId,
            challengeId,
        });

        // Simulate an incomplete challenge streak
        await streakoid.challengeStreaks.update({
            challengeStreakId: newChallengeStreak._id,
            updateData: {
                active: true,
                completedToday: false,
                currentStreak: {
                    startDate: new Date().toString(),
                    numberOfDaysInARow: 1,
                },
            },
        });

        const challengeStreaks = await streakoid.challengeStreaks.getAll({
            completedToday: false,
            active: true,
            status: StreakStatus.live,
        });
        expect(challengeStreaks.length).toBeGreaterThanOrEqual(1);

        const challengeStreak = challengeStreaks[0];

        expect(challengeStreak.currentStreak.numberOfDaysInARow).toEqual(expect.any(Number));
        expect(challengeStreak.currentStreak.startDate).toEqual(expect.any(String));
        expect(Object.keys(challengeStreak.currentStreak).sort()).toEqual(['numberOfDaysInARow', 'startDate'].sort());
        expect(challengeStreak.status).toEqual(StreakStatus.live);
        expect(challengeStreak.completedToday).toEqual(false);
        expect(challengeStreak.active).toEqual(true);
        expect(challengeStreak.pastStreaks).toEqual([]);
        expect(challengeStreak._id).toEqual(expect.any(String));
        expect(challengeStreak.userId).toEqual(expect.any(String));
        expect(challengeStreak.timezone).toEqual(expect.any(String));
        expect(challengeStreak.createdAt).toEqual(expect.any(String));
        expect(challengeStreak.updatedAt).toEqual(expect.any(String));
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
                'badgeId',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });

    test('completed challenge streaks can be retreived', async () => {
        expect.assertions(14);
        const name = 'Duolingo';
        const color = 'blue';
        const levels = [{ level: 0, criteria: 'criteria' }];
        const description = 'Everyday I must complete a duolingo lesson';
        const icon = 'duolingo';
        const { challenge } = await streakoid.challenges.create({
            name,
            description,
            icon,
            color,
            levels,
        });
        challengeId = challenge._id;

        const secondChallengeStreak = await streakoid.challengeStreaks.create({
            userId,
            challengeId,
        });
        const secondChallengeStreakId = secondChallengeStreak._id;

        await streakoid.completeChallengeStreakTasks.create({
            userId,
            challengeStreakId: secondChallengeStreakId,
        });

        const challengeStreaks = await streakoid.challengeStreaks.getAll({
            completedToday: true,
        });
        expect(challengeStreaks.length).toBeGreaterThanOrEqual(1);

        const challengeStreak = challengeStreaks[0];

        expect(challengeStreak.status).toEqual(StreakStatus.live);
        expect(challengeStreak.currentStreak.numberOfDaysInARow).toBeGreaterThanOrEqual(1);
        expect(challengeStreak.currentStreak.startDate).toEqual(expect.any(String));
        expect(Object.keys(challengeStreak.currentStreak).sort()).toEqual(['numberOfDaysInARow', 'startDate'].sort());
        expect(challengeStreak.completedToday).toEqual(true);
        expect(challengeStreak.active).toEqual(true);
        expect(challengeStreak.pastStreaks).toEqual([]);
        expect(challengeStreak._id).toEqual(expect.any(String));
        expect(challengeStreak.userId).toEqual(expect.any(String));
        expect(challengeStreak.timezone).toEqual(expect.any(String));
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
                'badgeId',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });

    test('archived challenge streaks can be retreived', async () => {
        expect.assertions(12);

        const name = 'Duolingo';
        const color = 'blue';
        const levels = [{ level: 0, criteria: 'criteria' }];
        const description = 'Everyday I must complete a duolingo lesson';
        const icon = 'duolingo';
        const { challenge } = await streakoid.challenges.create({
            name,
            description,
            icon,
            color,
            levels,
        });
        challengeId = challenge._id;
        const secondChallengeStreak = await streakoid.challengeStreaks.create({
            userId,
            challengeId,
        });
        const secondChallengeStreakId = secondChallengeStreak._id;

        await streakoid.challengeStreaks.update({
            challengeStreakId: secondChallengeStreakId,
            updateData: { status: StreakStatus.archived },
        });

        const challengeStreaks = await streakoid.challengeStreaks.getAll({
            status: StreakStatus.archived,
        });

        const challengeStreak = challengeStreaks[0];

        expect(challengeStreak.status).toEqual(StreakStatus.archived);
        expect(challengeStreak.currentStreak.numberOfDaysInARow).toEqual(0);
        expect(Object.keys(challengeStreak.currentStreak).sort()).toEqual(['numberOfDaysInARow'].sort());
        expect(challengeStreak.completedToday).toEqual(false);
        expect(challengeStreak.active).toEqual(false);
        expect(challengeStreak.pastStreaks).toEqual([]);
        expect(challengeStreak._id).toEqual(expect.any(String));
        expect(challengeStreak.userId).toEqual(expect.any(String));
        expect(challengeStreak.timezone).toEqual(expect.any(String));
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
                'badgeId',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });

    test('deleted challenge streaks can be retreived', async () => {
        expect.assertions(12);

        const name = 'Duolingo';
        const color = 'blue';
        const levels = [{ level: 0, criteria: 'criteria' }];
        const description = 'Everyday I must complete a duolingo lesson';
        const icon = 'duolingo';
        const { challenge } = await streakoid.challenges.create({
            name,
            description,
            icon,
            color,
            levels,
        });
        challengeId = challenge._id;

        const secondChallengeStreak = await streakoid.challengeStreaks.create({
            userId,
            challengeId,
        });
        const secondChallengeStreakId = secondChallengeStreak._id;

        await streakoid.challengeStreaks.update({
            challengeStreakId: secondChallengeStreakId,
            updateData: { status: StreakStatus.deleted },
        });

        const challengeStreaks = await streakoid.challengeStreaks.getAll({
            status: StreakStatus.deleted,
        });

        const challengeStreak = challengeStreaks[0];

        expect(challengeStreak.status).toEqual(StreakStatus.deleted);
        expect(challengeStreak.currentStreak.numberOfDaysInARow).toEqual(0);
        expect(Object.keys(challengeStreak.currentStreak).sort()).toEqual(['numberOfDaysInARow'].sort());
        expect(challengeStreak.completedToday).toEqual(false);
        expect(challengeStreak.active).toEqual(false);
        expect(challengeStreak.pastStreaks).toEqual([]);
        expect(challengeStreak._id).toEqual(expect.any(String));
        expect(challengeStreak.userId).toEqual(expect.any(String));
        expect(challengeStreak.timezone).toEqual(expect.any(String));
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
                'badgeId',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });

    test('challenge streaks can be retreived with a sort field', async () => {
        expect.assertions(14);

        const name = 'Duolingo';
        const color = 'blue';
        const levels = [{ level: 0, criteria: 'criteria' }];
        const description = 'Everyday I must complete a duolingo lesson';
        const icon = 'duolingo';
        const { challenge } = await streakoid.challenges.create({
            name,
            description,
            icon,
            color,
            levels,
        });
        challengeId = challenge._id;

        const challengeStreaks = await streakoid.challengeStreaks.getAll({
            sortField: GetAllChallengeStreaksSortFields.currentStreak,
        });
        expect(challengeStreaks.length).toBeGreaterThanOrEqual(1);

        const challengeStreak = challengeStreaks[0];

        expect(challengeStreak.currentStreak.numberOfDaysInARow).toEqual(expect.any(Number));
        expect(challengeStreak.currentStreak.startDate).toEqual(expect.any(String));
        expect(Object.keys(challengeStreak.currentStreak).sort()).toEqual(['numberOfDaysInARow', 'startDate'].sort());
        expect(challengeStreak.status).toEqual(StreakStatus.live);
        expect(challengeStreak.completedToday).toEqual(false);
        expect(challengeStreak.active).toEqual(true);
        expect(challengeStreak.pastStreaks).toEqual([]);
        expect(challengeStreak._id).toEqual(expect.any(String));
        expect(challengeStreak.userId).toEqual(expect.any(String));
        expect(challengeStreak.timezone).toEqual(expect.any(String));
        expect(challengeStreak.createdAt).toEqual(expect.any(String));
        expect(challengeStreak.updatedAt).toEqual(expect.any(String));
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
                'badgeId',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });
});
