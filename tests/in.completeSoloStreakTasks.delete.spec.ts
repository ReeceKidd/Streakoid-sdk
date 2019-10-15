import { StreakoidFactory } from '../src/streakoid';
import { getUser, streakoidTest } from './setup/streakoidTest';

jest.setTimeout(120000);

describe('DELETE /incomplete-solo-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let soloStreakId: string;
    let IncompleteSoloStreakTaskId: string;

    const streakName = 'Intermittent fasting';

    beforeAll(async () => {
        const user = await getUser();
        userId = user._id;
        streakoid = await streakoidTest();

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName,
        });
        soloStreakId = soloStreak._id;

        // Solo streak tasks must be completed before being incompleted.
        await streakoid.completeSoloStreakTasks.create({
            userId,
            soloStreakId,
        });

        const incompleteSoloStreakTask = await streakoid.incompleteSoloStreakTasks.create({
            userId,
            soloStreakId,
        });
        IncompleteSoloStreakTaskId = incompleteSoloStreakTask._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.soloStreaks.deleteOne(soloStreakId);
    });

    describe('DELETE /v1/incomplete-solo-streak-tasks', () => {
        test('deletes incomplete-solo-streak-tasks', async () => {
            expect.assertions(1);

            const response = await streakoid.incompleteSoloStreakTasks.deleteOne(IncompleteSoloStreakTaskId);

            expect(response.status).toEqual(204);
        });
    });
});
