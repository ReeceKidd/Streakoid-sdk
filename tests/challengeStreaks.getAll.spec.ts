import { StreakoidFactory, londonTimezone } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { getPayingUser } from './setup/getPayingUser';
import { GetAllChallengeStreaksSortFields } from '../src/challengeStreak';
import StreakStatus from '@streakoid/streakoid-models/lib/Types/StreakStatus';

jest.setTimeout(120000);

describe('GET /challenge-streaks', () => {
    let streakoid: StreakoidFactory;

    beforeEach(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            streakoid = await streakoidTest();
        }
    });

    afterEach(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`challenge streaks can be retrieved with user query parameter`, async () => {
        expect.assertions(17);

        const user = await getPayingUser();
        const userId = user._id;

        const name = 'Duolingo';
        const description = 'Everyday I must complete a duolingo lesson';
        const icon = 'duolingo';
        const { challenge } = await streakoid.challenges.create({
            name,
            description,
            icon,
        });
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
        expect(challengeStreak.userId).toEqual(String(user._id));
        expect(challengeStreak.username).toEqual(user.username);
        expect(challengeStreak.userProfileImage).toEqual(user.profileImages.originalImageUrl);
        expect(challengeStreak.challengeId).toBeDefined();
        expect(challengeStreak.challengeName).toBeDefined();
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
                'username',
                'userProfileImage',
                'challengeId',
                'challengeName',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });

    test('incomplete challenge streaks can be retrieved', async () => {
        expect.assertions(3);

        const name = 'Duolingo';
        const description = 'Everyday I must complete a duolingo lesson';
        const icon = 'duolingo';
        const { challenge } = await streakoid.challenges.create({
            name,
            description,
            icon,
        });
        const challengeId = challenge._id;

        const user = await getPayingUser();
        const userId = user._id;

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

        expect(challengeStreak.completedToday).toEqual(false);
        expect(Object.keys(challengeStreak).sort()).toEqual(
            [
                'currentStreak',
                'status',
                'completedToday',
                'active',
                'pastStreaks',
                '_id',
                'userId',
                'username',
                'userProfileImage',
                'challengeId',
                'challengeName',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });

    test('completed challenge streaks can be retrieved', async () => {
        expect.assertions(2);
        const name = 'Duolingo';
        const description = 'Everyday I must complete a duolingo lesson';
        const icon = 'duolingo';
        const { challenge } = await streakoid.challenges.create({
            name,
            description,
            icon,
        });
        const challengeId = challenge._id;

        const user = await getPayingUser();
        const userId = user._id;

        const challengeStreak = await streakoid.challengeStreaks.create({
            userId,
            challengeId,
        });

        await streakoid.completeChallengeStreakTasks.create({
            userId,
            challengeStreakId: challengeStreak._id,
        });

        const updatedChallengeStreak = await streakoid.challengeStreaks.getOne({
            challengeStreakId: challengeStreak._id,
        });

        expect(updatedChallengeStreak.completedToday).toEqual(true);
        expect(Object.keys(updatedChallengeStreak).sort()).toEqual(
            [
                'status',
                'currentStreak',
                'completedToday',
                'active',
                'pastStreaks',
                '_id',
                'userId',
                'username',
                'userProfileImage',
                'challengeId',
                'challengeName',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });

    test('archived challenge streaks can be retrieved', async () => {
        expect.assertions(2);

        const name = 'Duolingo';
        const description = 'Everyday I must complete a duolingo lesson';
        const icon = 'duolingo';
        const { challenge } = await streakoid.challenges.create({
            name,
            description,
            icon,
        });

        const user = await getPayingUser();
        const userId = user._id;

        const challengeStreak = await streakoid.challengeStreaks.create({
            userId,
            challengeId: challenge._id,
        });

        await streakoid.challengeStreaks.update({
            challengeStreakId: challengeStreak._id,
            updateData: { status: StreakStatus.archived },
        });
        const challengeStreaks = await streakoid.challengeStreaks.getAll({
            status: StreakStatus.archived,
        });

        const updatedChallengeStreak = challengeStreaks[0];

        expect(updatedChallengeStreak.status).toEqual(StreakStatus.archived);
        expect(Object.keys(updatedChallengeStreak).sort()).toEqual(
            [
                'status',
                'currentStreak',
                'completedToday',
                'active',
                'pastStreaks',
                '_id',
                'userId',
                'username',
                'userProfileImage',
                'challengeId',
                'challengeName',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });

    test('deleted challenge streaks can be retrieved', async () => {
        expect.assertions(2);

        const name = 'Duolingo';
        const description = 'Everyday I must complete a duolingo lesson';
        const icon = 'duolingo';
        const { challenge } = await streakoid.challenges.create({
            name,
            description,
            icon,
        });

        const user = await getPayingUser();
        const userId = user._id;

        const challengeStreak = await streakoid.challengeStreaks.create({
            userId,
            challengeId: challenge._id,
        });

        await streakoid.challengeStreaks.update({
            challengeStreakId: challengeStreak._id,
            updateData: { status: StreakStatus.deleted },
        });

        const challengeStreaks = await streakoid.challengeStreaks.getAll({
            status: StreakStatus.deleted,
        });

        const updatedChallengeStreak = challengeStreaks[0];

        expect(updatedChallengeStreak.status).toEqual(StreakStatus.deleted);
        expect(Object.keys(updatedChallengeStreak).sort()).toEqual(
            [
                'status',
                'currentStreak',
                'completedToday',
                'active',
                'pastStreaks',
                '_id',
                'userId',
                'username',
                'userProfileImage',
                'challengeId',
                'challengeName',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });

    test('challenge streaks can be retrieved with a sort field', async () => {
        expect.assertions(2);

        const name = 'Duolingo';
        const description = 'Everyday I must complete a duolingo lesson';
        const icon = 'duolingo';
        const { challenge } = await streakoid.challenges.create({
            name,
            description,
            icon,
        });

        const user = await getPayingUser();
        const userId = user._id;

        await streakoid.challengeStreaks.create({
            userId,
            challengeId: challenge._id,
        });

        const challengeStreaks = await streakoid.challengeStreaks.getAll({
            sortField: GetAllChallengeStreaksSortFields.currentStreak,
        });
        expect(challengeStreaks.length).toBeGreaterThanOrEqual(1);

        const challengeStreak = challengeStreaks[0];

        expect(Object.keys(challengeStreak).sort()).toEqual(
            [
                'currentStreak',
                'status',
                'completedToday',
                'active',
                'pastStreaks',
                '_id',
                'userId',
                'username',
                'userProfileImage',
                'challengeId',
                'challengeName',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });
});
