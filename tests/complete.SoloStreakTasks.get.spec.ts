import { StreakoidFactory } from '../src/streakoid';
import { getUser, streakoidTest } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { connectToDatabase } from './setup/connectToDatabase';
import { disconnectFromDatabase } from './setup/disconnectFromDatabase';

jest.setTimeout(120000);

describe('GET /complete-solo-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await connectToDatabase();
            const user = await getUser();
            userId = user._id;
            streakoid = await streakoidTest();
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await disconnectFromDatabase();
        }
    });

    test(`completeSoloStreakTasks can be retreived`, async () => {
        expect.assertions(8);

        const streakName = 'Daily Spanish';

        const soloStreak = await streakoid.soloStreaks.create({ userId, streakName });
        const soloStreakId = soloStreak._id;

        await streakoid.completeSoloStreakTasks.create({ userId, soloStreakId });

        const completeSoloStreakTasks = await streakoid.completeSoloStreakTasks.getAll({
            userId,
            streakId: soloStreakId,
        });

        const completeSoloStreakTask = completeSoloStreakTasks[0];

        expect(completeSoloStreakTask._id).toEqual(expect.any(String));
        expect(completeSoloStreakTask.userId).toEqual(userId);
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
    });
});
