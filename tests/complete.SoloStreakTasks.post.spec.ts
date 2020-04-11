import { StreakoidFactory } from '../src/streakoid';
import StreakStatus from '../src/StreakStatus';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { ActivityFeedItemTypes } from '../src';

jest.setTimeout(120000);

describe('GET /complete-solo-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let username: string;
    const streakName = 'Daily Spanish';

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            const user = await getPayingUser();
            userId = user._id;
            username = user.username;
            streakoid = await streakoidTest();
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    describe('POST /v1/complete-solo-streak-tasks', () => {
        test('user can complete a solo streak task with a new current streak', async () => {
            expect.assertions(21);

            const soloStreak = await streakoid.soloStreaks.create({ userId, streakName });
            const soloStreakId = soloStreak._id;

            const completeSoloStreakTask = await streakoid.completeSoloStreakTasks.create({
                userId,
                soloStreakId,
            });

            expect(completeSoloStreakTask._id).toBeDefined();
            expect(completeSoloStreakTask.userId).toBeDefined();
            expect(completeSoloStreakTask.streakId).toEqual(soloStreakId);
            expect(completeSoloStreakTask.taskCompleteTime).toEqual(expect.any(String));
            expect(completeSoloStreakTask.taskCompleteDay).toEqual(expect.any(String));
            expect(completeSoloStreakTask.createdAt).toEqual(expect.any(String));
            expect(completeSoloStreakTask.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(completeSoloStreakTask).sort()).toEqual(
                [
                    '_id',
                    'userId',
                    'streakId',
                    'taskCompleteTime',
                    'taskCompleteDay',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );

            const updatedSoloStreak = await streakoid.soloStreaks.getOne(soloStreakId);

            expect(updatedSoloStreak.streakName).toEqual(streakName);
            expect(updatedSoloStreak.status).toEqual(StreakStatus.live);
            expect(updatedSoloStreak.userId).toBeDefined();
            expect(updatedSoloStreak._id).toBeDefined();
            expect(Object.keys(updatedSoloStreak.currentStreak).sort()).toEqual(
                ['numberOfDaysInARow', 'startDate'].sort(),
            );
            expect(updatedSoloStreak.currentStreak.numberOfDaysInARow).toEqual(1);
            expect(updatedSoloStreak.currentStreak.startDate).toEqual(expect.any(String));
            expect(updatedSoloStreak.completedToday).toEqual(true);
            expect(updatedSoloStreak.active).toEqual(true);
            expect(updatedSoloStreak.pastStreaks).toEqual([]);
            expect(updatedSoloStreak.createdAt).toBeDefined();
            expect(updatedSoloStreak.updatedAt).toBeDefined();
            expect(Object.keys(updatedSoloStreak).sort()).toEqual(
                [
                    'currentStreak',
                    'status',
                    'completedToday',
                    'active',
                    'pastStreaks',
                    '_id',
                    'streakName',
                    'streakDescription',
                    'userId',
                    'timezone',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );
        });

        test('user can complete a solo streak task with an exsiting current streak', async () => {
            expect.assertions(21);

            const newSoloStreak = await streakoid.soloStreaks.create({
                userId,
                streakName,
            });

            const numberOfDaysInARow = 2;

            const soloStreakWithExistingCurrentStreak = await streakoid.soloStreaks.update({
                soloStreakId: newSoloStreak._id,
                updateData: {
                    active: true,
                    currentStreak: {
                        startDate: new Date().toString(),
                        numberOfDaysInARow,
                    },
                },
            });

            const completeSoloStreakTask = await streakoid.completeSoloStreakTasks.create({
                userId,
                soloStreakId: soloStreakWithExistingCurrentStreak._id,
            });

            expect(completeSoloStreakTask._id).toBeDefined();
            expect(completeSoloStreakTask.userId).toBeDefined();
            expect(completeSoloStreakTask.streakId).toEqual(soloStreakWithExistingCurrentStreak._id);
            expect(completeSoloStreakTask.taskCompleteTime).toEqual(expect.any(String));
            expect(completeSoloStreakTask.taskCompleteDay).toEqual(expect.any(String));
            expect(completeSoloStreakTask.createdAt).toEqual(expect.any(String));
            expect(completeSoloStreakTask.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(completeSoloStreakTask).sort()).toEqual(
                [
                    '_id',
                    'userId',
                    'streakId',
                    'taskCompleteTime',
                    'taskCompleteDay',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );

            const updatedSoloStreak = await streakoid.soloStreaks.getOne(soloStreakWithExistingCurrentStreak._id);

            expect(updatedSoloStreak.streakName).toEqual(streakName);
            expect(updatedSoloStreak.status).toEqual(StreakStatus.live);
            expect(updatedSoloStreak.userId).toBeDefined();
            expect(updatedSoloStreak._id).toBeDefined();
            expect(Object.keys(updatedSoloStreak.currentStreak).sort()).toEqual(
                ['numberOfDaysInARow', 'startDate'].sort(),
            );
            expect(updatedSoloStreak.currentStreak.numberOfDaysInARow).toEqual(numberOfDaysInARow + 1);
            expect(updatedSoloStreak.currentStreak.startDate).toEqual(expect.any(String));
            expect(updatedSoloStreak.completedToday).toEqual(true);
            expect(updatedSoloStreak.active).toEqual(true);
            expect(updatedSoloStreak.pastStreaks).toEqual([]);
            expect(updatedSoloStreak.createdAt).toBeDefined();
            expect(updatedSoloStreak.updatedAt).toBeDefined();
            expect(Object.keys(updatedSoloStreak).sort()).toEqual(
                [
                    'currentStreak',
                    'status',
                    'completedToday',
                    'active',
                    'pastStreaks',
                    '_id',
                    'streakName',
                    'streakDescription',
                    'userId',
                    'timezone',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );
        });

        test('user can complete, incomplete and recomplete a solo streak with a new current streak', async () => {
            expect.assertions(21);

            const soloStreakForRecompletion = await streakoid.soloStreaks.create({
                userId,
                streakName,
            });

            await streakoid.completeSoloStreakTasks.create({
                userId,
                soloStreakId: soloStreakForRecompletion._id,
            });

            await streakoid.incompleteSoloStreakTasks.create({
                userId,
                soloStreakId: soloStreakForRecompletion._id,
            });

            const recompleteSoloStreakTask = await streakoid.completeSoloStreakTasks.create({
                userId,
                soloStreakId: soloStreakForRecompletion._id,
            });

            expect(recompleteSoloStreakTask._id).toBeDefined();
            expect(recompleteSoloStreakTask.userId).toBeDefined();
            expect(recompleteSoloStreakTask.streakId).toEqual(soloStreakForRecompletion._id);
            expect(recompleteSoloStreakTask.taskCompleteTime).toEqual(expect.any(String));
            expect(recompleteSoloStreakTask.taskCompleteDay).toEqual(expect.any(String));
            expect(recompleteSoloStreakTask.createdAt).toEqual(expect.any(String));
            expect(recompleteSoloStreakTask.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(recompleteSoloStreakTask).sort()).toEqual(
                [
                    '_id',
                    'userId',
                    'streakId',
                    'taskCompleteTime',
                    'taskCompleteDay',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );

            const updatedSoloStreak = await streakoid.soloStreaks.getOne(soloStreakForRecompletion._id);

            expect(updatedSoloStreak.streakName).toEqual(streakName);
            expect(updatedSoloStreak.status).toEqual(StreakStatus.live);
            expect(updatedSoloStreak.userId).toBeDefined();
            expect(updatedSoloStreak._id).toBeDefined();
            expect(Object.keys(updatedSoloStreak.currentStreak).sort()).toEqual(
                ['numberOfDaysInARow', 'startDate'].sort(),
            );
            expect(updatedSoloStreak.currentStreak.numberOfDaysInARow).toEqual(1);
            expect(updatedSoloStreak.currentStreak.startDate).toEqual(expect.any(String));
            expect(updatedSoloStreak.completedToday).toEqual(true);
            expect(updatedSoloStreak.active).toEqual(true);
            expect(updatedSoloStreak.pastStreaks).toEqual([]);
            expect(updatedSoloStreak.createdAt).toBeDefined();
            expect(updatedSoloStreak.updatedAt).toBeDefined();
            expect(Object.keys(updatedSoloStreak).sort()).toEqual(
                [
                    'currentStreak',
                    'status',
                    'completedToday',
                    'active',
                    'pastStreaks',
                    '_id',
                    'streakName',
                    'streakDescription',
                    'userId',
                    'timezone',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );
        });

        test('user can complete, incomplete and recomplete a solo streak with an exsiting current streak', async () => {
            expect.assertions(21);

            const newSoloStreak = await streakoid.soloStreaks.create({
                userId,
                streakName,
            });

            const numberOfDaysInARow = 2;

            const soloStreakForRecompletion = await streakoid.soloStreaks.update({
                soloStreakId: newSoloStreak._id,
                updateData: {
                    active: true,
                    currentStreak: {
                        startDate: new Date().toString(),
                        numberOfDaysInARow,
                    },
                },
            });

            await streakoid.completeSoloStreakTasks.create({
                userId,
                soloStreakId: soloStreakForRecompletion._id,
            });

            await streakoid.incompleteSoloStreakTasks.create({
                userId,
                soloStreakId: soloStreakForRecompletion._id,
            });

            const recompleteSoloStreakTask = await streakoid.completeSoloStreakTasks.create({
                userId,
                soloStreakId: soloStreakForRecompletion._id,
            });

            expect(recompleteSoloStreakTask._id).toBeDefined();
            expect(recompleteSoloStreakTask.userId).toBeDefined();
            expect(recompleteSoloStreakTask.streakId).toEqual(soloStreakForRecompletion._id);
            expect(recompleteSoloStreakTask.taskCompleteTime).toEqual(expect.any(String));
            expect(recompleteSoloStreakTask.taskCompleteDay).toEqual(expect.any(String));
            expect(recompleteSoloStreakTask.createdAt).toEqual(expect.any(String));
            expect(recompleteSoloStreakTask.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(recompleteSoloStreakTask).sort()).toEqual(
                [
                    '_id',
                    'userId',
                    'streakId',
                    'taskCompleteTime',
                    'taskCompleteDay',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );

            const updatedSoloStreak = await streakoid.soloStreaks.getOne(soloStreakForRecompletion._id);

            expect(updatedSoloStreak.streakName).toEqual(streakName);
            expect(updatedSoloStreak.status).toEqual(StreakStatus.live);
            expect(updatedSoloStreak.userId).toBeDefined();
            expect(updatedSoloStreak._id).toBeDefined();
            expect(Object.keys(updatedSoloStreak.currentStreak).sort()).toEqual(
                ['numberOfDaysInARow', 'startDate'].sort(),
            );
            expect(updatedSoloStreak.currentStreak.numberOfDaysInARow).toEqual(numberOfDaysInARow + 1);
            expect(updatedSoloStreak.currentStreak.startDate).toEqual(expect.any(String));
            expect(updatedSoloStreak.completedToday).toEqual(true);
            expect(updatedSoloStreak.active).toEqual(true);
            expect(updatedSoloStreak.pastStreaks).toEqual([]);
            expect(updatedSoloStreak.createdAt).toBeDefined();
            expect(updatedSoloStreak.updatedAt).toBeDefined();
            expect(Object.keys(updatedSoloStreak).sort()).toEqual(
                [
                    'currentStreak',
                    'status',
                    'completedToday',
                    'active',
                    'pastStreaks',
                    '_id',
                    'streakName',
                    'streakDescription',
                    'userId',
                    'timezone',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );
        });

        test('user cannot complete the same solo streak task in the same day', async () => {
            expect.assertions(3);
            const secondSoloStreak = await streakoid.soloStreaks.create({
                userId,
                streakName,
            });
            const secondSoloStreakId = secondSoloStreak._id;
            try {
                await streakoid.completeSoloStreakTasks.create({
                    userId,
                    soloStreakId: secondSoloStreakId,
                });
                await streakoid.completeSoloStreakTasks.create({
                    userId,
                    soloStreakId: secondSoloStreakId,
                });
            } catch (err) {
                expect(err.response.status).toEqual(422);
                expect(err.response.data.message).toEqual('Solo streak task already completed today.');
                expect(err.response.data.code).toEqual('422-01');
            }
        });

        test('when user completes a task a CompletedSoloStreakActivityItem is created', async () => {
            expect.assertions(5);
            const soloStreak = await streakoid.soloStreaks.create({ userId, streakName });
            const soloStreakId = soloStreak._id;

            await streakoid.completeSoloStreakTasks.create({
                userId,
                soloStreakId,
            });

            const { activityFeedItems } = await streakoid.activityFeedItems.getAll({
                soloStreakId: soloStreak._id,
            });
            const createdSoloStreakActivityFeedItem = activityFeedItems.find(
                item => item.activityFeedItemType === ActivityFeedItemTypes.completedSoloStreak,
            );
            if (
                createdSoloStreakActivityFeedItem &&
                createdSoloStreakActivityFeedItem.activityFeedItemType === ActivityFeedItemTypes.completedSoloStreak
            ) {
                expect(createdSoloStreakActivityFeedItem.soloStreakId).toEqual(String(soloStreak._id));
                expect(createdSoloStreakActivityFeedItem.soloStreakName).toEqual(String(soloStreak.streakName));
                expect(createdSoloStreakActivityFeedItem.userId).toEqual(String(soloStreak.userId));
                expect(createdSoloStreakActivityFeedItem.username).toEqual(username);
                expect(Object.keys(createdSoloStreakActivityFeedItem).sort()).toEqual(
                    [
                        '_id',
                        'activityFeedItemType',
                        'userId',
                        'username',
                        'soloStreakId',
                        'soloStreakName',
                        'createdAt',
                        'updatedAt',
                        '__v',
                    ].sort(),
                );
            }
        });
    });
});
