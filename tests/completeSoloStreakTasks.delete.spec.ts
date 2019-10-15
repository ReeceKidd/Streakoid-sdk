import { StreakoidFactory } from '../src/streakoid';
import { getUser, streakoidTest } from './setup/streakoidTest';

jest.setTimeout(120000);

describe('DELETE /complete-solo-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let soloStreakId: string;
    let completeSoloStreakTaskId: string;

    const streakName = 'Intermittent fasting';

    beforeAll(async () => {
        const user = await getUser();
        userId = user._id;
        streakoid = await streakoidTest();
        userId = user._id;

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName,
        });
        soloStreakId = soloStreak._id;

        const completeSoloStreakTask = await streakoid.completeSoloStreakTasks.create({
            userId,
            soloStreakId,
        });
        completeSoloStreakTaskId = completeSoloStreakTask._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.soloStreaks.deleteOne(soloStreakId);
    });

    describe('DELETE /v1/complete-solo-streak-tasks', () => {
        test('deletes complete-solo-streak-tasks', async () => {
            expect.assertions(1);

            const response = await streakoid.completeSoloStreakTasks.deleteOne(completeSoloStreakTaskId);

            expect(response.status).toEqual(204);
        });
    });
});
