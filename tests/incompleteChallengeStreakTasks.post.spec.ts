import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { StreakStatus } from '../src';

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

    describe('POST /v1/incomplete-challenge-streak-tasks', () => {
        test('user can incomplete a challenge streak task and the challenge streak tasks startdate gets reset if it is the first day of the streak', async () => {
            expect.assertions(20);

            const name = 'Duolingo';
            const description = 'Everyday I must complete a duolingo lesson';
            const icon = 'duolingo';
            const color = 'blue';
            const levels = [{ level: 0, criteria: 'criteria' }];
            const { challenge } = await streakoid.challenges.create({ name, description, icon, color, levels });
            const challengeId = challenge._id;

            const challengeStreak = await streakoid.challengeStreaks.create({ userId, challengeId });
            const challengeStreakId = challengeStreak._id;

            // Task must be completed before it can be incompleted
            await streakoid.completeChallengeStreakTasks.create({
                userId,
                challengeStreakId,
            });

            const incompleteChallengeStreakTask = await streakoid.incompleteChallengeStreakTasks.create({
                userId,
                challengeStreakId,
            });

            expect(incompleteChallengeStreakTask._id).toBeDefined();
            expect(incompleteChallengeStreakTask.userId).toBeDefined();
            expect(incompleteChallengeStreakTask.challengeStreakId).toEqual(challengeStreakId);
            expect(incompleteChallengeStreakTask.taskIncompleteTime).toEqual(expect.any(String));
            expect(incompleteChallengeStreakTask.taskIncompleteDay).toEqual(expect.any(String));
            expect(incompleteChallengeStreakTask.createdAt).toEqual(expect.any(String));
            expect(incompleteChallengeStreakTask.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(incompleteChallengeStreakTask).sort()).toEqual(
                [
                    '_id',
                    'userId',
                    'challengeStreakId',
                    'taskIncompleteTime',
                    'taskIncompleteDay',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );

            const updatedChallengeStreak = await streakoid.challengeStreaks.getOne({ challengeStreakId });

            expect(updatedChallengeStreak.status).toEqual(StreakStatus.live);
            expect(updatedChallengeStreak.userId).toBeDefined();
            expect(updatedChallengeStreak._id).toBeDefined();
            expect(Object.keys(updatedChallengeStreak.currentStreak).sort()).toEqual(
                ['startDate', 'numberOfDaysInARow'].sort(),
            );
            expect(updatedChallengeStreak.currentStreak.startDate).toEqual(null);
            expect(updatedChallengeStreak.currentStreak.numberOfDaysInARow).toEqual(0);
            expect(updatedChallengeStreak.completedToday).toEqual(false);
            expect(updatedChallengeStreak.active).toEqual(false);
            expect(updatedChallengeStreak.pastStreaks).toEqual([]);
            expect(updatedChallengeStreak.createdAt).toBeDefined();
            expect(updatedChallengeStreak.updatedAt).toBeDefined();
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

        test('user can incomplete a challenge streak task after the first day of the streak', async () => {
            expect.assertions(20);

            const name = 'Duolingo';
            const description = 'Everyday I must complete a duolingo lesson';
            const icon = 'duolingo';
            const color = 'blue';
            const levels = [{ level: 0, criteria: 'criteria' }];
            const { challenge } = await streakoid.challenges.create({ name, description, icon, color, levels });
            const challengeId = challenge._id;
            // Manually updating the challenge streak to simulate a streak greater than one day.
            const multipleDayChallengeStreak = await streakoid.challengeStreaks.create({
                userId,
                challengeId,
            });

            const numberOfDaysInARow = 2;

            await streakoid.challengeStreaks.update({
                challengeStreakId: multipleDayChallengeStreak._id,
                updateData: {
                    active: true,
                    currentStreak: { numberOfDaysInARow, startDate: new Date().toString() },
                },
            });

            // Streak must be completed before it can be incompleted.
            await streakoid.completeChallengeStreakTasks.create({
                userId,
                challengeStreakId: multipleDayChallengeStreak._id,
            });

            const incompleteChallengeStreakTask = await streakoid.incompleteChallengeStreakTasks.create({
                userId,
                challengeStreakId: multipleDayChallengeStreak._id,
            });

            expect(incompleteChallengeStreakTask._id).toBeDefined();
            expect(incompleteChallengeStreakTask.userId).toBeDefined();
            expect(incompleteChallengeStreakTask.challengeStreakId).toEqual(multipleDayChallengeStreak._id);
            expect(incompleteChallengeStreakTask.taskIncompleteTime).toEqual(expect.any(String));
            expect(incompleteChallengeStreakTask.taskIncompleteDay).toEqual(expect.any(String));
            expect(incompleteChallengeStreakTask.createdAt).toEqual(expect.any(String));
            expect(incompleteChallengeStreakTask.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(incompleteChallengeStreakTask).sort()).toEqual(
                [
                    '_id',
                    'userId',
                    'challengeStreakId',
                    'taskIncompleteTime',
                    'taskIncompleteDay',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );

            const updatedChallengeStreak = await streakoid.challengeStreaks.getOne({
                challengeStreakId: multipleDayChallengeStreak._id,
            });

            expect(updatedChallengeStreak.status).toEqual(StreakStatus.live);
            expect(updatedChallengeStreak.userId).toBeDefined();
            expect(updatedChallengeStreak._id).toBeDefined();
            expect(Object.keys(updatedChallengeStreak.currentStreak).sort()).toEqual(
                ['startDate', 'numberOfDaysInARow'].sort(),
            );
            expect(updatedChallengeStreak.currentStreak.startDate).toEqual(expect.any(String));
            expect(updatedChallengeStreak.currentStreak.numberOfDaysInARow).toEqual(numberOfDaysInARow);
            expect(updatedChallengeStreak.completedToday).toEqual(false);
            expect(updatedChallengeStreak.active).toEqual(false);
            expect(updatedChallengeStreak.pastStreaks).toEqual([]);
            expect(updatedChallengeStreak.createdAt).toBeDefined();
            expect(updatedChallengeStreak.updatedAt).toBeDefined();
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

        test('user cannot incomplete a challenge streak task that has not been completed', async () => {
            expect.assertions(3);
            const name = 'Duolingo';
            const description = 'Everyday I must complete a duolingo lesson';
            const icon = 'duolingo';
            const color = 'blue';
            const levels = [{ level: 0, criteria: 'criteria' }];
            const { challenge } = await streakoid.challenges.create({ name, description, icon, color, levels });
            const challengeId = challenge._id;
            const secondChallengeStreak = await streakoid.challengeStreaks.create({
                userId,
                challengeId,
            });
            const secondChallengeStreakId = secondChallengeStreak._id;
            try {
                await streakoid.incompleteChallengeStreakTasks.create({
                    userId,
                    challengeStreakId: secondChallengeStreakId,
                });
            } catch (err) {
                expect(err.response.status).toEqual(422);
                expect(err.response.data.message).toEqual('Challenge streak has not been completed today.');
                expect(err.response.data.code).toEqual('422-07');
            }
        });
    });
});
