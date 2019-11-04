import { StreakoidFactory, londonTimezone } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { StreakStatus } from '../src';

jest.setTimeout(120000);

describe('GET /complete-solo-streak-tasks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    const streakName = 'Daily Spanish';
    const streakDescription = 'Everyday I must do 30 minutes of Spanish';

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

    test(`that request passes when solo streak is patched with correct keys`, async () => {
        expect.assertions(14);

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName,
            streakDescription,
        });
        const soloStreakId = soloStreak._id;

        const updatedName = 'Intermittent fasting';
        const updatedDescription = 'Cannot eat till 1pm everyday';

        const updatedSoloStreak = await streakoid.soloStreaks.update({
            soloStreakId,
            updateData: {
                streakName: updatedName,
                streakDescription: updatedDescription,
            },
        });

        expect(updatedSoloStreak.streakName).toEqual(updatedName);
        expect(updatedSoloStreak.status).toEqual(StreakStatus.live);
        expect(updatedSoloStreak.streakDescription).toEqual(updatedDescription);
        expect(updatedSoloStreak.userId).toBeDefined();
        expect(updatedSoloStreak.completedToday).toEqual(false);
        expect(updatedSoloStreak.active).toEqual(false);
        expect(updatedSoloStreak.pastStreaks).toEqual([]);
        expect(updatedSoloStreak.timezone).toEqual(londonTimezone);
        expect(updatedSoloStreak.currentStreak.numberOfDaysInARow).toEqual(0);
        expect(Object.keys(updatedSoloStreak.currentStreak)).toEqual(['numberOfDaysInARow']);
        expect(updatedSoloStreak._id).toEqual(expect.any(String));
        expect(updatedSoloStreak.createdAt).toEqual(expect.any(String));
        expect(updatedSoloStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(updatedSoloStreak).sort()).toEqual(
            [
                'currentStreak',
                'status',
                'streakDescription',
                'completedToday',
                'active',
                'pastStreaks',
                '_id',
                'streakName',
                'userId',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });
});
