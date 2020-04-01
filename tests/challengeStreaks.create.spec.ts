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

    test(`creates challenge streak, adds user to challenge members, and adds badge to users profile.`, async () => {
        expect.assertions(30);

        const challengeStreak = await streakoid.challengeStreaks.create({
            userId,
            challengeId,
        });

        expect(challengeStreak._id).toBeDefined();
        expect(challengeStreak.status).toEqual(StreakStatus.live);
        expect(challengeStreak.userId).toBeDefined();
        expect(challengeStreak.challengeId).toBeDefined();
        expect(challengeStreak.badgeId).toBeDefined();
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
                'badgeId',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );

        const updatedChallenge = await streakoid.challenges.getOne({ challengeId });

        expect(updatedChallenge._id).toEqual(expect.any(String));
        expect(updatedChallenge.name).toEqual(name);
        expect(updatedChallenge.description).toEqual(description);
        expect(updatedChallenge.icon).toEqual(icon);
        expect(updatedChallenge.color).toEqual(color);
        expect(updatedChallenge.badgeId).toBeDefined();
        expect(updatedChallenge.members.length).toEqual(1);
        const challengeMember = updatedChallenge.members[0];
        expect(Object.keys(challengeMember).sort()).toEqual(['profileImage', 'userId', 'username'].sort());
        expect(updatedChallenge.numberOfMembers).toEqual(1);
        expect(updatedChallenge.levels.length).toEqual(1);
        const level = updatedChallenge.levels[0];
        expect(Object.keys(level).sort()).toEqual(['_id', 'level', 'criteria'].sort());
        expect(level.level).toEqual(0);
        expect(level.criteria).toEqual('criteria');
        expect(updatedChallenge.createdAt).toEqual(expect.any(String));
        expect(updatedChallenge.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(updatedChallenge).sort()).toEqual(
            [
                '_id',
                'name',
                'description',
                'icon',
                'color',
                'badgeId',
                'levels',
                'members',
                'numberOfMembers',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );

        const updatedUser = await streakoid.users.getOne(userId);

        expect(updatedUser.badges).toEqual([expect.any(Object)]);
    });
});
