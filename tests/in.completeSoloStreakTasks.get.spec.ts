import { streakoid } from '../src/streakoid';

const email = 'get-incomplete-solo-streak-task@gmail.com';
const username = 'get-incomplete-solo-streak-task';

const streakName = '10 minutes journaling';

jest.setTimeout(120000);

describe('GET /incomplete-solo-streak-tasks', () => {
    let userId: string;
    let soloStreakId: string;
    let incompleteSoloStreakTaskId: string;

    beforeAll(async () => {
        const registrationResponse = await streakoid.users.create({
            username,
            email,
        });
        userId = registrationResponse._id;

        const createSoloStreakResponse = await streakoid.soloStreaks.create({
            userId,
            streakName,
        });

        soloStreakId = createSoloStreakResponse._id;

        // Solo streak tasks must be completed before they can be incompleted

        await streakoid.completeSoloStreakTasks.create({
            userId,
            soloStreakId,
        });

        const createSoloStreakTaskIncompleteResponse = await streakoid.incompleteSoloStreakTasks.create({
            userId,
            soloStreakId,
        });
        incompleteSoloStreakTaskId = createSoloStreakTaskIncompleteResponse._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.soloStreaks.deleteOne(soloStreakId);
        await streakoid.incompleteSoloStreakTasks.deleteOne(incompleteSoloStreakTaskId);
    });

    test(`IncompleteSoloStreakTasks can be retreived`, async () => {
        expect.assertions(8);

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
