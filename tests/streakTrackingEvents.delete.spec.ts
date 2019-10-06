import { streakoid } from '../src/streakoid';
import StreakTrackingEventType from '../src/streakTrackingEventType';

const email = 'delete-solo-streak-user@gmail.com';
const username = 'delete-solo-streak-user';

jest.setTimeout(120000);

describe(`DELETE /solo-streaks`, () => {
    let userId: string;
    let soloStreakId: string;
    let streakTrackingEventId: string;

    const streakName = 'Reading';
    const streakDescription = 'I will read 30 minutes every day';

    beforeAll(async () => {
        const registrationResponse = await streakoid.users.create({
            email,
            username,
        });
        userId = registrationResponse._id;

        const createSoloStreakResponse = await streakoid.soloStreaks.create({
            userId,
            streakName,
            streakDescription,
        });
        soloStreakId = createSoloStreakResponse._id;

        const createStreakTrackingEventResponse = await streakoid.streakTrackingEvents.create({
            type: StreakTrackingEventType.LostStreak,
            streakId: soloStreakId,
            userId,
        });

        streakTrackingEventId = createStreakTrackingEventResponse._id;
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
