import { streakoid } from '../src/streakoid';
import StreakTrackingEventTypes from '../src/streakTrackingEventTypes';
import { StreakTypes } from '../src';

const registeredEmail = 'create-streak-tracking-event@gmail.com';
const registeredUsername = 'create-streak-tracking-event';

const streakName = 'Daily yoga';
const streakDescription = 'Every day I must do yoga before 12pm';

jest.setTimeout(120000);

describe('GET /streak-tracking-events', () => {
    let userId: string;
    let soloStreakId: string;
    let streakTrackingEventId: string;

    beforeAll(async () => {
        const user = await streakoid.users.create({
            username: registeredUsername,
            email: registeredEmail,
        });
        userId = user._id;

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName,
            streakDescription,
        });
        soloStreakId = soloStreak._id;

        const streakTrackingEvent = await streakoid.streakTrackingEvents.create({
            type: StreakTrackingEventTypes.lostStreak,
            streakId: soloStreakId,
            userId,
            streakType: StreakTypes.soloStreak,
        });

        streakTrackingEventId = streakTrackingEvent._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.soloStreaks.deleteOne(soloStreakId);
        await streakoid.streakTrackingEvents.deleteOne(streakTrackingEventId);
    });

    test(`streak tracking events can be retreived without a query paramater`, async () => {
        expect.assertions(9);

        const streakTrackingEvents = await streakoid.streakTrackingEvents.getAll({});
        expect(streakTrackingEvents.length).toBeGreaterThanOrEqual(1);

        const streakTrackingEvent = streakTrackingEvents[0];
        expect(streakTrackingEvent._id).toEqual(expect.any(String));
        expect(streakTrackingEvent.userId).toBeDefined();
        expect(streakTrackingEvent.streakId).toBeDefined();
        expect(streakTrackingEvent.streakType).toEqual(StreakTypes.soloStreak);
        expect(streakTrackingEvent.groupStreakType).toBeUndefined();
        expect(streakTrackingEvent.createdAt).toEqual(expect.any(String));
        expect(streakTrackingEvent.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(streakTrackingEvent).sort()).toEqual(
            ['_id', 'type', 'streakId', 'userId', 'streakType', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });
});
