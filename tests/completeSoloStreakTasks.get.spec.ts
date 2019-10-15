import { StreakoidFactory } from '../src/streakoid';
import { getUser, streakoidTest } from './setup/streakoidTest';

const streakName = '10 minutes journaling';

jest.setTimeout(120000);

describe('GET /complete-solo-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let soloStreakId: string;
    let completeSoloStreakTaskId: string;

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

        const createSoloStreakTaskCompleteResponse = await streakoid.completeSoloStreakTasks.create({
            userId,
            soloStreakId,
        });
        completeSoloStreakTaskId = createSoloStreakTaskCompleteResponse._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.soloStreaks.deleteOne(soloStreakId);
        await streakoid.completeSoloStreakTasks.deleteOne(completeSoloStreakTaskId);
    });

    test(`completeSoloStreakTasks can be retreived`, async () => {
        expect.assertions(8);

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
