import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { StreakStatus, ActivityFeedItemTypes } from '../src';

jest.setTimeout(120000);

describe('GET /complete-solo-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let username: string;
    let userProfileImage: string;
    const streakName = 'Daily Spanish';

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            const user = await getPayingUser();
            userId = user._id;
            username = user.username;
            userProfileImage = user.profileImages.originalImageUrl;
            streakoid = await streakoidTest();
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    describe('POST /v1/incomplete-solo-streak-tasks', () => {
        test('user can incomplete a solo streak task and the solo streak tasks startdate gets reset if it is the first day of the streak', async () => {
            expect.assertions(21);

            const createSoloStreakResponse = await streakoid.soloStreaks.create({
                userId,
                streakName,
            });
            const soloStreakId = createSoloStreakResponse._id;

            // Task must be completed before it can be incompleted
            await streakoid.completeSoloStreakTasks.create({
                userId,
                soloStreakId,
            });

            const incompleteSoloStreakTask = await streakoid.incompleteSoloStreakTasks.create({
                userId,
                soloStreakId,
            });

            expect(incompleteSoloStreakTask._id).toBeDefined();
            expect(incompleteSoloStreakTask.userId).toBeDefined();
            expect(incompleteSoloStreakTask.streakId).toEqual(soloStreakId);
            expect(incompleteSoloStreakTask.taskIncompleteTime).toEqual(expect.any(String));
            expect(incompleteSoloStreakTask.taskIncompleteDay).toEqual(expect.any(String));
            expect(incompleteSoloStreakTask.createdAt).toEqual(expect.any(String));
            expect(incompleteSoloStreakTask.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(incompleteSoloStreakTask).sort()).toEqual(
                [
                    '_id',
                    'userId',
                    'streakId',
                    'taskIncompleteTime',
                    'taskIncompleteDay',
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
                ['startDate', 'numberOfDaysInARow'].sort(),
            );
            expect(updatedSoloStreak.currentStreak.startDate).toEqual(null);
            expect(updatedSoloStreak.currentStreak.numberOfDaysInARow).toEqual(0);
            expect(updatedSoloStreak.completedToday).toEqual(false);
            expect(updatedSoloStreak.active).toEqual(false);
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

        test('user can incomplete a solo streak task after the first day of the streak', async () => {
            expect.assertions(21);

            // Manually updating the solo streak to simulate a streak greater than one day.
            const multipleDaySoloStreak = await streakoid.soloStreaks.create({
                userId,
                streakName,
            });

            const numberOfDaysInARow = 2;

            await streakoid.soloStreaks.update({
                soloStreakId: multipleDaySoloStreak._id,
                updateData: { active: true, currentStreak: { numberOfDaysInARow, startDate: new Date().toString() } },
            });

            // Streak must be completed before it can be incompleted.
            await streakoid.completeSoloStreakTasks.create({
                userId,
                soloStreakId: multipleDaySoloStreak._id,
            });

            const incompleteSoloStreakTask = await streakoid.incompleteSoloStreakTasks.create({
                userId,
                soloStreakId: multipleDaySoloStreak._id,
            });

            expect(incompleteSoloStreakTask._id).toBeDefined();
            expect(incompleteSoloStreakTask.userId).toBeDefined();
            expect(incompleteSoloStreakTask.streakId).toEqual(multipleDaySoloStreak._id);
            expect(incompleteSoloStreakTask.taskIncompleteTime).toEqual(expect.any(String));
            expect(incompleteSoloStreakTask.taskIncompleteDay).toEqual(expect.any(String));
            expect(incompleteSoloStreakTask.createdAt).toEqual(expect.any(String));
            expect(incompleteSoloStreakTask.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(incompleteSoloStreakTask).sort()).toEqual(
                [
                    '_id',
                    'userId',
                    'streakId',
                    'taskIncompleteTime',
                    'taskIncompleteDay',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );

            const updatedSoloStreak = await streakoid.soloStreaks.getOne(multipleDaySoloStreak._id);

            expect(updatedSoloStreak.streakName).toEqual(streakName);
            expect(updatedSoloStreak.status).toEqual(StreakStatus.live);
            expect(updatedSoloStreak.userId).toBeDefined();
            expect(updatedSoloStreak._id).toBeDefined();
            expect(Object.keys(updatedSoloStreak.currentStreak).sort()).toEqual(
                ['startDate', 'numberOfDaysInARow'].sort(),
            );
            expect(updatedSoloStreak.currentStreak.startDate).toEqual(expect.any(String));
            expect(updatedSoloStreak.currentStreak.numberOfDaysInARow).toEqual(numberOfDaysInARow);
            expect(updatedSoloStreak.completedToday).toEqual(false);
            expect(updatedSoloStreak.active).toEqual(false);
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

        test('user cannot incomplete a solo streak task that has not been completed', async () => {
            expect.assertions(3);
            const secondSoloStreak = await streakoid.soloStreaks.create({
                userId,
                streakName,
            });
            const secondSoloStreakId = secondSoloStreak._id;
            try {
                await streakoid.incompleteSoloStreakTasks.create({
                    userId,
                    soloStreakId: secondSoloStreakId,
                });
            } catch (err) {
                expect(err.response.status).toEqual(422);
                expect(err.response.data.message).toEqual('Solo streak has not been completed today.');
                expect(err.response.data.code).toEqual('422-02');
            }
        });

        test('when user incompletes a task a IncompletedSoloStreakActivityItem is created', async () => {
            expect.assertions(6);
            const soloStreak = await streakoid.soloStreaks.create({ userId, streakName });
            const soloStreakId = soloStreak._id;

            await streakoid.completeSoloStreakTasks.create({
                userId,
                soloStreakId,
            });

            await streakoid.incompleteSoloStreakTasks.create({
                userId,
                soloStreakId,
            });

            const { activityFeedItems } = await streakoid.activityFeedItems.getAll({
                soloStreakId: soloStreak._id,
            });
            const activityFeedItem = activityFeedItems.find(
                item => item.activityFeedItemType === ActivityFeedItemTypes.incompletedSoloStreak,
            );
            if (
                activityFeedItem &&
                activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.incompletedSoloStreak
            ) {
                expect(activityFeedItem.soloStreakId).toEqual(String(soloStreak._id));
                expect(activityFeedItem.soloStreakName).toEqual(String(soloStreak.streakName));
                expect(activityFeedItem.userId).toEqual(String(soloStreak.userId));
                expect(activityFeedItem.username).toEqual(username);
                expect(activityFeedItem.userProfileImage).toEqual(userProfileImage);
                expect(Object.keys(activityFeedItem).sort()).toEqual(
                    [
                        '_id',
                        'activityFeedItemType',
                        'userId',
                        'username',
                        'userProfileImage',
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
