import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { StreakStatus } from '../src';

jest.setTimeout(120000);

describe('PATCH /challenge-streaks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let challengeStreakId: string;
    const color = 'blue';
    const levels = [{ level: 0, criteria: 'criteria' }];
    const name = 'Duolingo';
    const description = 'Everyday I must complete a duolingo lesson';
    const icon = 'duolingo';

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

    test(`that request passes when challenge streak is patched with correct keys`, async () => {
        expect.assertions(12);

        const { challenge } = await streakoid.challenges.create({
            name,
            description,
            icon,
            color,
            levels,
        });
        const challengeStreak = await streakoid.challengeStreaks.create({
            userId,
            challengeId: challenge._id,
        });
        challengeStreakId = challengeStreak._id;

        const updatedTimezone = 'Europe/Paris';

        const updatedChallengeStreak = await streakoid.challengeStreaks.update({
            challengeStreakId,
            updateData: {
                timezone: updatedTimezone,
            },
        });

        expect(updatedChallengeStreak.status).toEqual(StreakStatus.live);
        expect(updatedChallengeStreak.userId).toBeDefined();
        expect(updatedChallengeStreak.completedToday).toEqual(false);
        expect(updatedChallengeStreak.active).toEqual(false);
        expect(updatedChallengeStreak.pastStreaks).toEqual([]);
        expect(updatedChallengeStreak.timezone).toEqual(updatedTimezone);
        expect(updatedChallengeStreak.currentStreak.numberOfDaysInARow).toEqual(0);
        expect(Object.keys(updatedChallengeStreak.currentStreak)).toEqual(['numberOfDaysInARow']);
        expect(updatedChallengeStreak._id).toEqual(expect.any(String));
        expect(updatedChallengeStreak.createdAt).toEqual(expect.any(String));
        expect(updatedChallengeStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(updatedChallengeStreak).sort()).toEqual(
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

    test(`that when status is set to deleted the user is removed from the challenge and the number of members in the challenge is decreased by one`, async () => {
        expect.assertions(14);

        const { challenge } = await streakoid.challenges.create({
            name,
            description,
            icon,
            color,
            levels,
        });
        const challengeStreak = await streakoid.challengeStreaks.create({
            userId,
            challengeId: challenge._id,
        });
        challengeStreakId = challengeStreak._id;

        const updatedChallengeStreak = await streakoid.challengeStreaks.update({
            challengeStreakId,
            updateData: {
                status: StreakStatus.deleted,
            },
        });

        expect(updatedChallengeStreak.status).toEqual(StreakStatus.deleted);
        expect(updatedChallengeStreak.userId).toBeDefined();
        expect(updatedChallengeStreak.completedToday).toEqual(false);
        expect(updatedChallengeStreak.active).toEqual(false);
        expect(updatedChallengeStreak.pastStreaks).toEqual([]);
        expect(updatedChallengeStreak.timezone).toEqual(expect.any(String));
        expect(updatedChallengeStreak.currentStreak.numberOfDaysInARow).toEqual(0);
        expect(Object.keys(updatedChallengeStreak.currentStreak)).toEqual(['numberOfDaysInARow']);
        expect(updatedChallengeStreak._id).toEqual(expect.any(String));
        expect(updatedChallengeStreak.createdAt).toEqual(expect.any(String));
        expect(updatedChallengeStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(updatedChallengeStreak).sort()).toEqual(
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

        const updatedChallenge = await streakoid.challenges.getOne({ challengeId: updatedChallengeStreak.challengeId });

        expect(updatedChallenge.members.length).toEqual(0);
        expect(updatedChallenge.numberOfMembers).toEqual(0);
    });
});
