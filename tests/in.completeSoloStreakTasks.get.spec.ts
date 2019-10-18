import { StreakoidFactory } from '../src/streakoid';
import { getUser, streakoidTest } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { connectToDatabase } from './setup/connectToDatabase';
import { disconnectFromDatabase } from './setup/disconnectFromDatabase';

jest.setTimeout(120000);

describe('GET /complete-solo-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    const streakName = 'Daily Spanish';

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

    test(`IncompleteSoloStreakTasks can be retreived`, async () => {
        expect.assertions(8);

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName,
        });

        const soloStreakId = soloStreak._id;

        // Solo streak tasks must be completed before they can be incompleted

        await streakoid.completeSoloStreakTasks.create({
            userId,
            soloStreakId,
        });

        await streakoid.incompleteSoloStreakTasks.create({
            userId,
            soloStreakId,
        });

        const incompleteSoloStreakTasks = await streakoid.incompleteSoloStreakTasks.getAll({
            userId,
            streakId: soloStreakId,
        });

        const incompleteSoloStreakTask = incompleteSoloStreakTasks[0];

        expect(incompleteSoloStreakTask._id).toEqual(expect.any(String));
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
    });
});
