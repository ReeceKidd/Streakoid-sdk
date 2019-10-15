import StreakStatus from '../src/StreakStatus';
import { StreakoidFactory } from '../src/streakoid';
import { getUser, streakoidTest } from './setup/streakoidTest';

jest.setTimeout(120000);

describe('POST /Incomplete-solo-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let soloStreakId: string;
    let secondSoloStreakId: string;

    const streakName = 'Intermittent fasting';

    beforeAll(async () => {
        const user = await getUser();
        userId = user._id;
        streakoid = await streakoidTest();
        userId = user._id;

        const createSoloStreakResponse = await streakoid.soloStreaks.create({
            userId,
            streakName,
        });
        soloStreakId = createSoloStreakResponse._id;

        // Task must be completed before it can be incompleted
        await streakoid.completeSoloStreakTasks.create({
            userId,
            soloStreakId,
        });
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);

        await streakoid.soloStreaks.deleteOne(soloStreakId);
        await streakoid.soloStreaks.deleteOne(secondSoloStreakId);
    });

    describe('POST /v1/incomplete-solo-streak-tasks', () => {
        test('user can incomplete a solo streak task and the solo streak tasks startdate gets reset if it is the first day of the streak', async () => {
            expect.assertions(21);

            const incompleteSoloStreakTask = await streakoid.incompleteSoloStreakTasks.create({
                userId,
                soloStreakId,
            });

            expect(incompleteSoloStreakTask._id).toBeDefined();
            expect(incompleteSoloStreakTask.userId).toEqual(userId);
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
            expect(updatedSoloStreak.userId).toEqual(userId);
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
            expect(incompleteSoloStreakTask.userId).toEqual(userId);
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
            expect(updatedSoloStreak.userId).toEqual(userId);
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
            secondSoloStreakId = secondSoloStreak._id;
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
    });
});
