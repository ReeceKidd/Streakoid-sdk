import { londonTimezone, StreakoidFactory } from '../src/streakoid';
import StreakStatus from '../src/StreakStatus';
import { getUser, streakoidTest } from './setup/streakoidTest';

jest.setTimeout(120000);

describe(`PATCH /solo-streaks`, () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let soloStreakId: string;

    const streakName = 'Keto';
    const streakDescription = 'I will follow the keto diet every day';

    beforeAll(async () => {
        const user = await getUser();
        userId = user._id;
        streakoid = await streakoidTest();

        const createSoloStreakResponse = await streakoid.soloStreaks.create({
            userId,
            streakName,
            streakDescription,
        });
        soloStreakId = createSoloStreakResponse._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.soloStreaks.deleteOne(soloStreakId);
    });

    test(`that request passes when solo streak is patched with correct keys`, async () => {
        expect.assertions(14);

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
        expect(updatedSoloStreak.userId).toEqual(userId);
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
