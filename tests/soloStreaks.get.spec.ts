import { streakoid, londonTimezone } from '../src/streakoid';
import StreakStatus from '../src/StreakStatus';

const email = 'get-solo-streaks@gmail.com';
const username = 'get-solo-streaks-user';

const soloStreakName = 'Daily Spanish';
const soloStreakDescription = 'Each day I must do the insame amount 50xp of Duolingo';

jest.setTimeout(120000);

describe('GET /solo-streaks', () => {
    let userId: string;
    let soloStreakId: string;
    let secondSoloStreakId: string;
    let completedTaskResponseId: string;

    beforeAll(async () => {
        const user = await streakoid.users.create({
            email,
            username,
        });
        userId = user._id;

        const createSoloStreakResponse = await streakoid.soloStreaks.create({
            userId,
            streakName: soloStreakName,
            streakDescription: soloStreakDescription,
        });
        soloStreakId = createSoloStreakResponse._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.soloStreaks.deleteOne(soloStreakId);
        await streakoid.soloStreaks.deleteOne(secondSoloStreakId);
        await streakoid.completeSoloStreakTasks.deleteOne(completedTaskResponseId);
    });

    test(`solo streaks can be retreived with user query parameter`, async () => {
        expect.assertions(15);

        const soloStreaks = await streakoid.soloStreaks.getAll({ userId });
        expect(soloStreaks.length).toBeGreaterThanOrEqual(1);

        const soloStreak = soloStreaks[0];

        expect(soloStreak.currentStreak).toEqual({
            numberOfDaysInARow: 0,
        });
        expect(soloStreak.status).toEqual(StreakStatus.live);
        expect(Object.keys(soloStreak.currentStreak)).toEqual(['numberOfDaysInARow']);
        expect(soloStreak.completedToday).toEqual(false);
        expect(soloStreak.active).toEqual(false);
        expect(soloStreak.pastStreaks).toEqual([]);
        expect(soloStreak._id).toEqual(expect.any(String));
        expect(soloStreak.streakName).toEqual(expect.any(String));
        expect(soloStreak.streakDescription).toEqual(expect.any(String));
        expect(soloStreak.userId).toEqual(userId);
        expect(soloStreak.timezone).toEqual(londonTimezone);
        expect(soloStreak.createdAt).toEqual(expect.any(String));
        expect(soloStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(soloStreak).sort()).toEqual(
            [
                'status',
                'currentStreak',
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

    test('solo streaks not completed today can be retreived', async () => {
        expect.assertions(15);

        const soloStreaks = await streakoid.soloStreaks.getAll({
            completedToday: false,
            active: false,
            status: StreakStatus.live,
        });
        expect(soloStreaks.length).toBeGreaterThanOrEqual(1);

        const soloStreak = soloStreaks[0];

        expect(soloStreak.currentStreak.numberOfDaysInARow).toEqual(expect.any(Number));
        expect(Object.keys(soloStreak.currentStreak)).toEqual(['numberOfDaysInARow']);
        expect(soloStreak.status).toEqual(StreakStatus.live);
        expect(soloStreak.completedToday).toEqual(false);
        expect(soloStreak.active).toEqual(false);
        expect(soloStreak.pastStreaks).toEqual([]);
        expect(soloStreak._id).toEqual(expect.any(String));
        expect(soloStreak.streakName).toEqual(expect.any(String));
        expect(soloStreak.streakDescription).toEqual(expect.any(String));
        expect(soloStreak.userId).toEqual(expect.any(String));
        expect(soloStreak.timezone).toEqual(expect.any(String));
        expect(soloStreak.createdAt).toEqual(expect.any(String));
        expect(soloStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(soloStreak).sort()).toEqual(
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

    test('solo streaks that have been completed today can be retreived', async () => {
        expect.assertions(16);

        const streakName = '30 minutes of reading';
        const streakDescription = 'Every day I must do 30 minutes of reading';

        const createdSoloStreakResponse = await streakoid.soloStreaks.create({
            userId,
            streakName,
            streakDescription,
        });
        secondSoloStreakId = createdSoloStreakResponse._id;

        const completedTaskResponse = await streakoid.completeSoloStreakTasks.create({
            userId,
            soloStreakId: secondSoloStreakId,
        });
        completedTaskResponseId = completedTaskResponse._id;

        const soloStreaks = await streakoid.soloStreaks.getAll({
            completedToday: true,
        });
        expect(soloStreaks.length).toBeGreaterThanOrEqual(1);

        const soloStreak = soloStreaks[0];

        expect(soloStreak.status).toEqual(StreakStatus.live);
        expect(soloStreak.currentStreak.numberOfDaysInARow).toBeGreaterThanOrEqual(1);
        expect(soloStreak.currentStreak.startDate).toEqual(expect.any(String));
        expect(Object.keys(soloStreak.currentStreak).sort()).toEqual(['numberOfDaysInARow', 'startDate'].sort());
        expect(soloStreak.completedToday).toEqual(true);
        expect(soloStreak.active).toEqual(true);
        expect(soloStreak.pastStreaks).toEqual([]);
        expect(soloStreak._id).toEqual(expect.any(String));
        expect(soloStreak.streakName).toEqual(streakName);
        expect(soloStreak.streakDescription).toEqual(streakDescription);
        expect(soloStreak.userId).toEqual(expect.any(String));
        expect(soloStreak.timezone).toEqual(expect.any(String));
        expect(soloStreak.createdAt).toEqual(expect.any(String));
        expect(soloStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(soloStreak).sort()).toEqual(
            [
                'status',
                'currentStreak',
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

    test('archived solo streaks can be retreived', async () => {
        expect.assertions(14);

        const streakName = '30 minutes of reading';
        const streakDescription = 'Every day I must do 30 minutes of reading';

        const createdSoloStreakResponse = await streakoid.soloStreaks.create({
            userId,
            streakName,
            streakDescription,
        });
        secondSoloStreakId = createdSoloStreakResponse._id;

        await streakoid.soloStreaks.update({
            soloStreakId: secondSoloStreakId,
            updateData: { status: StreakStatus.archived },
        });

        const soloStreaks = await streakoid.soloStreaks.getAll({
            status: StreakStatus.archived,
        });

        const soloStreak = soloStreaks[0];

        expect(soloStreak.status).toEqual(StreakStatus.archived);
        expect(soloStreak.currentStreak.numberOfDaysInARow).toEqual(0);
        expect(Object.keys(soloStreak.currentStreak).sort()).toEqual(['numberOfDaysInARow'].sort());
        expect(soloStreak.completedToday).toEqual(false);
        expect(soloStreak.active).toEqual(false);
        expect(soloStreak.pastStreaks).toEqual([]);
        expect(soloStreak._id).toEqual(expect.any(String));
        expect(soloStreak.streakName).toEqual(streakName);
        expect(soloStreak.streakDescription).toEqual(streakDescription);
        expect(soloStreak.userId).toEqual(expect.any(String));
        expect(soloStreak.timezone).toEqual(expect.any(String));
        expect(soloStreak.createdAt).toEqual(expect.any(String));
        expect(soloStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(soloStreak).sort()).toEqual(
            [
                'status',
                'currentStreak',
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

    test('deleted solo streaks can be retreived', async () => {
        expect.assertions(14);

        const streakName = '30 minutes of reading';
        const streakDescription = 'Every day I must do 30 minutes of reading';

        const createdSoloStreakResponse = await streakoid.soloStreaks.create({
            userId,
            streakName,
            streakDescription,
        });
        secondSoloStreakId = createdSoloStreakResponse._id;

        await streakoid.soloStreaks.update({
            soloStreakId: secondSoloStreakId,
            updateData: { status: StreakStatus.deleted },
        });

        const soloStreaks = await streakoid.soloStreaks.getAll({
            status: StreakStatus.deleted,
        });

        const soloStreak = soloStreaks[0];

        expect(soloStreak.status).toEqual(StreakStatus.deleted);
        expect(soloStreak.currentStreak.numberOfDaysInARow).toEqual(0);
        expect(Object.keys(soloStreak.currentStreak).sort()).toEqual(['numberOfDaysInARow'].sort());
        expect(soloStreak.completedToday).toEqual(false);
        expect(soloStreak.active).toEqual(false);
        expect(soloStreak.pastStreaks).toEqual([]);
        expect(soloStreak._id).toEqual(expect.any(String));
        expect(soloStreak.streakName).toEqual(streakName);
        expect(soloStreak.streakDescription).toEqual(streakDescription);
        expect(soloStreak.userId).toEqual(expect.any(String));
        expect(soloStreak.timezone).toEqual(expect.any(String));
        expect(soloStreak.createdAt).toEqual(expect.any(String));
        expect(soloStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(soloStreak).sort()).toEqual(
            [
                'status',
                'currentStreak',
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
});
