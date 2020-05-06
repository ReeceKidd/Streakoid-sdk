import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import StreakStatus from '@streakoid/streakoid-models/lib/Types/StreakStatus';
import ActivityFeedItemTypes from '@streakoid/streakoid-models/lib/Types/ActivityFeedItemTypes';

jest.setTimeout(120000);

describe('GET /complete-challenge-streak-tasks', () => {
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

    describe('POST /v1/complete-challenge-streak-tasks', () => {
        test('user can complete a challenge streak task with a new current streak', async () => {
            expect.assertions(21);

            const user = await getPayingUser();
            const userId = user._id;

            const name = 'Duolingo';
            const description = 'Everyday I must complete a duolingo lesson';
            const icon = 'duolingo';
            const { challenge } = await streakoid.challenges.create({ name, description, icon });
            const challengeId = challenge._id;
            const challengeStreak = await streakoid.challengeStreaks.create({ userId, challengeId });
            const challengeStreakId = challengeStreak._id;

            const completeChallengeStreakTask = await streakoid.completeChallengeStreakTasks.create({
                userId,
                challengeStreakId,
            });

            expect(completeChallengeStreakTask._id).toBeDefined();
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

            const updatedChallengeStreak = await streakoid.challengeStreaks.getOne({ challengeStreakId });

            expect(updatedChallengeStreak.status).toEqual(StreakStatus.live);
            expect(updatedChallengeStreak.userId).toBeDefined();
            expect(updatedChallengeStreak.challengeId).toBeDefined();
            expect(updatedChallengeStreak._id).toBeDefined();
            expect(Object.keys(updatedChallengeStreak.currentStreak).sort()).toEqual(
                ['numberOfDaysInARow', 'startDate'].sort(),
            );
            expect(updatedChallengeStreak.currentStreak.numberOfDaysInARow).toEqual(1);
            expect(updatedChallengeStreak.currentStreak.startDate).toEqual(expect.any(String));
            expect(updatedChallengeStreak.completedToday).toEqual(true);
            expect(updatedChallengeStreak.active).toEqual(true);
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

        test('user can complete a challenge streak task with an existing current streak', async () => {
            expect.assertions(20);

            const user = await getPayingUser();
            const userId = user._id;

            const name = 'Duolingo';
            const description = 'Everyday I must complete a duolingo lesson';
            const icon = 'duolingo';
            const { challenge } = await streakoid.challenges.create({ name, description, icon });
            const challengeId = challenge._id;

            const newChallengeStreak = await streakoid.challengeStreaks.create({
                userId,
                challengeId,
            });

            const numberOfDaysInARow = 2;

            const challengeStreakWithExistingCurrentStreak = await streakoid.challengeStreaks.update({
                challengeStreakId: newChallengeStreak._id,
                updateData: {
                    active: true,
                    currentStreak: {
                        startDate: new Date().toString(),
                        numberOfDaysInARow,
                    },
                },
            });

            const completeChallengeStreakTask = await streakoid.completeChallengeStreakTasks.create({
                userId,
                challengeStreakId: challengeStreakWithExistingCurrentStreak._id,
            });

            expect(completeChallengeStreakTask._id).toBeDefined();
            expect(completeChallengeStreakTask.userId).toBeDefined();
            expect(completeChallengeStreakTask.challengeStreakId).toEqual(challengeStreakWithExistingCurrentStreak._id);
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

            const updatedChallengeStreak = await streakoid.challengeStreaks.getOne({
                challengeStreakId: challengeStreakWithExistingCurrentStreak._id,
            });

            expect(updatedChallengeStreak.status).toEqual(StreakStatus.live);
            expect(updatedChallengeStreak.userId).toBeDefined();
            expect(updatedChallengeStreak._id).toBeDefined();
            expect(Object.keys(updatedChallengeStreak.currentStreak).sort()).toEqual(
                ['numberOfDaysInARow', 'startDate'].sort(),
            );
            expect(updatedChallengeStreak.currentStreak.numberOfDaysInARow).toEqual(numberOfDaysInARow + 1);
            expect(updatedChallengeStreak.currentStreak.startDate).toEqual(expect.any(String));
            expect(updatedChallengeStreak.completedToday).toEqual(true);
            expect(updatedChallengeStreak.active).toEqual(true);
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

        test('user can complete, incomplete and recomplete a challenge streak with a new current streak', async () => {
            expect.assertions(20);

            const user = await getPayingUser();
            const userId = user._id;

            const name = 'Duolingo';
            const description = 'Everyday I must complete a duolingo lesson';
            const icon = 'duolingo';
            const { challenge } = await streakoid.challenges.create({ name, description, icon });
            const challengeId = challenge._id;

            const challengeStreakForRecompletion = await streakoid.challengeStreaks.create({
                userId,
                challengeId,
            });

            await streakoid.completeChallengeStreakTasks.create({
                userId,
                challengeStreakId: challengeStreakForRecompletion._id,
            });

            await streakoid.incompleteChallengeStreakTasks.create({
                userId,
                challengeStreakId: challengeStreakForRecompletion._id,
            });

            const recompleteChallengeStreakTask = await streakoid.completeChallengeStreakTasks.create({
                userId,
                challengeStreakId: challengeStreakForRecompletion._id,
            });

            expect(recompleteChallengeStreakTask._id).toBeDefined();
            expect(recompleteChallengeStreakTask.userId).toBeDefined();
            expect(recompleteChallengeStreakTask.challengeStreakId).toEqual(challengeStreakForRecompletion._id);
            expect(recompleteChallengeStreakTask.taskCompleteTime).toEqual(expect.any(String));
            expect(recompleteChallengeStreakTask.taskCompleteDay).toEqual(expect.any(String));
            expect(recompleteChallengeStreakTask.createdAt).toEqual(expect.any(String));
            expect(recompleteChallengeStreakTask.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(recompleteChallengeStreakTask).sort()).toEqual(
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

            const updatedChallengeStreak = await streakoid.challengeStreaks.getOne({
                challengeStreakId: challengeStreakForRecompletion._id,
            });

            expect(updatedChallengeStreak.status).toEqual(StreakStatus.live);
            expect(updatedChallengeStreak.userId).toBeDefined();
            expect(updatedChallengeStreak._id).toBeDefined();
            expect(Object.keys(updatedChallengeStreak.currentStreak).sort()).toEqual(
                ['numberOfDaysInARow', 'startDate'].sort(),
            );
            expect(updatedChallengeStreak.currentStreak.numberOfDaysInARow).toEqual(1);
            expect(updatedChallengeStreak.currentStreak.startDate).toEqual(expect.any(String));
            expect(updatedChallengeStreak.completedToday).toEqual(true);
            expect(updatedChallengeStreak.active).toEqual(true);
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

        test('user can complete, incomplete and recomplete a challenge streak with an existing current streak', async () => {
            expect.assertions(21);

            const user = await getPayingUser();
            const userId = user._id;

            const name = 'Duolingo';
            const description = 'Everyday I must complete a duolingo lesson';
            const icon = 'duolingo';
            const { challenge } = await streakoid.challenges.create({ name, description, icon });
            const challengeId = challenge._id;

            const newChallengeStreak = await streakoid.challengeStreaks.create({
                userId,
                challengeId,
            });

            const numberOfDaysInARow = 2;

            const challengeStreakForRecompletion = await streakoid.challengeStreaks.update({
                challengeStreakId: newChallengeStreak._id,
                updateData: {
                    active: true,
                    currentStreak: {
                        startDate: new Date().toString(),
                        numberOfDaysInARow,
                    },
                },
            });

            await streakoid.completeChallengeStreakTasks.create({
                userId,
                challengeStreakId: challengeStreakForRecompletion._id,
            });

            await streakoid.incompleteChallengeStreakTasks.create({
                userId,
                challengeStreakId: challengeStreakForRecompletion._id,
            });

            const recompleteChallengeStreakTask = await streakoid.completeChallengeStreakTasks.create({
                userId,
                challengeStreakId: challengeStreakForRecompletion._id,
            });

            expect(recompleteChallengeStreakTask._id).toBeDefined();
            expect(recompleteChallengeStreakTask.userId).toBeDefined();
            expect(recompleteChallengeStreakTask.challengeStreakId).toEqual(challengeStreakForRecompletion._id);
            expect(recompleteChallengeStreakTask.taskCompleteTime).toEqual(expect.any(String));
            expect(recompleteChallengeStreakTask.taskCompleteDay).toEqual(expect.any(String));
            expect(recompleteChallengeStreakTask.createdAt).toEqual(expect.any(String));
            expect(recompleteChallengeStreakTask.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(recompleteChallengeStreakTask).sort()).toEqual(
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

            const updatedChallengeStreak = await streakoid.challengeStreaks.getOne({
                challengeStreakId: challengeStreakForRecompletion._id,
            });

            expect(updatedChallengeStreak.status).toEqual(StreakStatus.live);
            expect(updatedChallengeStreak.userId).toBeDefined();
            expect(updatedChallengeStreak.challengeId).toBeDefined();
            expect(updatedChallengeStreak._id).toBeDefined();
            expect(Object.keys(updatedChallengeStreak.currentStreak).sort()).toEqual(
                ['numberOfDaysInARow', 'startDate'].sort(),
            );
            expect(updatedChallengeStreak.currentStreak.numberOfDaysInARow).toEqual(numberOfDaysInARow + 1);
            expect(updatedChallengeStreak.currentStreak.startDate).toEqual(expect.any(String));
            expect(updatedChallengeStreak.completedToday).toEqual(true);
            expect(updatedChallengeStreak.active).toEqual(true);
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

        test('user cannot complete the same challenge streak task in the same day', async () => {
            expect.assertions(3);

            const user = await getPayingUser();
            const userId = user._id;

            const name = 'Duolingo';
            const description = 'Everyday I must complete a duolingo lesson';
            const icon = 'duolingo';
            const { challenge } = await streakoid.challenges.create({ name, description, icon });
            const challengeId = challenge._id;

            const secondChallengeStreak = await streakoid.challengeStreaks.create({
                userId,
                challengeId,
            });
            const secondChallengeStreakId = secondChallengeStreak._id;
            try {
                await streakoid.completeChallengeStreakTasks.create({
                    userId,
                    challengeStreakId: secondChallengeStreakId,
                });
                await streakoid.completeChallengeStreakTasks.create({
                    userId,
                    challengeStreakId: secondChallengeStreakId,
                });
            } catch (err) {
                expect(err.response.status).toEqual(422);
                expect(err.response.data.message).toEqual('Challenge streak task already completed today.');
                expect(err.response.data.code).toEqual('422-06');
            }
        });

        test('when a user completes a challenge streak their totalStreakCompletes increases by one.', async () => {
            expect.assertions(1);

            const user = await getPayingUser();
            const userId = user._id;

            const name = 'Duolingo';
            const description = 'Everyday I must complete a duolingo lesson';
            const icon = 'duolingo';
            const { challenge } = await streakoid.challenges.create({ name, description, icon });
            const challengeId = challenge._id;
            const challengeStreak = await streakoid.challengeStreaks.create({ userId, challengeId });
            const challengeStreakId = challengeStreak._id;

            await streakoid.completeChallengeStreakTasks.create({
                userId,
                challengeStreakId,
            });

            const updatedUser = await streakoid.users.getOne(userId);
            expect(updatedUser.totalStreakCompletes).toEqual(1);
        });

        test('when user completes a task a CompletedChallengeStreakActivityItem is created', async () => {
            expect.assertions(7);

            const user = await getPayingUser();
            const userId = user._id;

            const name = 'Duolingo';
            const description = 'Everyday I must complete a duolingo lesson';
            const icon = 'duolingo';
            const { challenge } = await streakoid.challenges.create({ name, description, icon });
            const challengeId = challenge._id;

            const challengeStreak = await streakoid.challengeStreaks.create({
                userId,
                challengeId,
            });

            await streakoid.completeChallengeStreakTasks.create({
                userId,
                challengeStreakId: challengeStreak._id,
            });

            const { activityFeedItems } = await streakoid.activityFeedItems.getAll({
                activityFeedItemType: ActivityFeedItemTypes.completedChallengeStreak,
            });
            const completedChallengeStreakActivityFeedItem = activityFeedItems.find(
                item => item.activityFeedItemType === ActivityFeedItemTypes.completedChallengeStreak,
            );
            if (
                completedChallengeStreakActivityFeedItem &&
                completedChallengeStreakActivityFeedItem.activityFeedItemType ===
                    ActivityFeedItemTypes.completedChallengeStreak
            ) {
                expect(completedChallengeStreakActivityFeedItem.challengeStreakId).toEqual(String(challengeStreak._id));
                expect(completedChallengeStreakActivityFeedItem.challengeId).toEqual(String(challenge._id));
                expect(completedChallengeStreakActivityFeedItem.challengeName).toEqual(String(challenge.name));
                expect(completedChallengeStreakActivityFeedItem.userId).toEqual(String(userId));
                expect(completedChallengeStreakActivityFeedItem.userProfileImage).toEqual(
                    String(user.profileImages.originalImageUrl),
                );
                expect(completedChallengeStreakActivityFeedItem.username).toEqual(user.username);
                expect(Object.keys(completedChallengeStreakActivityFeedItem).sort()).toEqual(
                    [
                        '_id',
                        'activityFeedItemType',
                        'userId',
                        'username',
                        'userProfileImage',
                        'challengeStreakId',
                        'challengeId',
                        'challengeName',
                        'createdAt',
                        'updatedAt',
                        '__v',
                    ].sort(),
                );
            }
        });
    });
});
