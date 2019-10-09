import { streakoid } from '../src/streakoid';

const email = 'delete-Incomplete-solo-streak-tasks-user@gmail.com';
const username = 'delete-solo-streak-tasks-user';

jest.setTimeout(120000);

describe('DELETE /Incomplete-solo-streak-tasks', () => {
    let userId: string;
    let soloStreakId: string;
    let IncompleteSoloStreakTaskId: string;

    const streakName = 'Intermittent fasting';

    beforeAll(async () => {
        const registrationResponse = await streakoid.users.create({
            email,
            username,
        });
        userId = registrationResponse._id;

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName,
        });
        soloStreakId = soloStreak._id;

        const IncompleteSoloStreakTask = await streakoid.incompleteSoloStreakTasks.create({
            userId,
            soloStreakId,
        });
        IncompleteSoloStreakTaskId = IncompleteSoloStreakTask._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.soloStreaks.deleteOne(soloStreakId);
    });

    describe('DELETE /v1/Incomplete-solo-streak-tasks', () => {
        test('deletes Incomplete-solo-streak-tasks', async () => {
            expect.assertions(1);

            const response = await streakoid.incompleteSoloStreakTasks.deleteOne(IncompleteSoloStreakTaskId);

            expect(response.status).toEqual(204);
        });
    });
});
