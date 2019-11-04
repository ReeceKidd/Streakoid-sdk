import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';

jest.setTimeout(120000);

describe('GET /complete-solo-streak-tasks', () => {
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
    });
});
