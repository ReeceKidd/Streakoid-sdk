import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';

jest.setTimeout(120000);

describe('GET /complete-challenge-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;

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

    test(`completeChallengeStreakTasks can be retreived`, async () => {
        expect.assertions(8);

        const color = 'blue';
        const name = 'Duolingo';
        const description = 'Everyday I must complete a duolingo lesson';
        const icon = 'duolingo';
        const { challenge } = await streakoid.challenges.create({ name, description, icon, color });
        const challengeId = challenge._id;
        const challengeStreak = await streakoid.challengeStreaks.create({ userId, challengeId });
        const challengeStreakId = challengeStreak._id;

        await streakoid.completeChallengeStreakTasks.create({
            userId,
            challengeStreakId,
        });
        const completeChallengeStreakTasks = await streakoid.completeChallengeStreakTasks.getAll({
            challengeStreakId,
        });

        const completeChallengeStreakTask = completeChallengeStreakTasks[0];

        expect(completeChallengeStreakTask._id).toEqual(expect.any(String));
        expect(completeChallengeStreakTask.userId).toBeDefined();
        expect(completeChallengeStreakTask.challengeStreakId).toEqual(challengeStreakId);
        expect(completeChallengeStreakTask.taskCompleteTime).toEqual(expect.any(String));
        expect(completeChallengeStreakTask.taskCompleteDay).toEqual(expect.any(String));
        expect(completeChallengeStreakTask.createdAt).toEqual(expect.any(String));
        expect(completeChallengeStreakTask.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(completeChallengeStreakTask).sort()).toEqual(
            [
                '_id',
                'userId',
                'challengeStreakId',
                'taskCompleteTime',
                'taskCompleteDay',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });
});
