import { StreakTypes, StreakTrackingEventTypes } from '../src';
import { StreakoidFactory } from '../src/streakoid';
import { getUser, streakoidTest } from './setup/streakoidTest';

jest.setTimeout(120000);

describe(`DELETE /solo-streaks`, () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let soloStreakId: string;
    let streakTrackingEventId: string;

    const streakName = 'Reading';
    const streakDescription = 'I will read 30 minutes every day';

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

        const streakTrackingEvent = await streakoid.streakTrackingEvents.create({
            type: StreakTrackingEventTypes.lostStreak,
            streakId: soloStreakId,
            userId,
            streakType: StreakTypes.solo,
        });

        streakTrackingEventId = streakTrackingEvent._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.soloStreaks.deleteOne(soloStreakId);
    });

    test(`that streak-tracking-event can be deleted`, async () => {
        expect.assertions(1);

        const response = await streakoid.streakTrackingEvents.deleteOne(streakTrackingEventId);
        expect(response.status).toEqual(204);
    });
});
