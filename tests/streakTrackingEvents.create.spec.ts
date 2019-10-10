import { streakoid } from '../src/streakoid';
import StreakTrackingEventType from '../src/streakTrackingEventType';

const email = 'create-team-streak-user@gmail.com';
const username = 'create-team-streak-user';

const streakName = 'Daily yoga';
const streakDescription = 'Every day I must do yoga before 12pm';

jest.setTimeout(120000);

describe('POST /streak-tracking-events', () => {
    let userId: string;
    let soloStreakId: string;
    let streakTrackingEventId: string;

    beforeAll(async () => {
        const user = await streakoid.users.create({
            email,
            username,
        });
        userId = user._id;

        const soloStreakRegistration = await streakoid.soloStreaks.create({
            userId,
            streakName,
            streakDescription,
        });
        soloStreakId = soloStreakRegistration._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.soloStreaks.deleteOne(soloStreakId);
        await streakoid.streakTrackingEvents.deleteOne(streakTrackingEventId);
    });

    test(`lost streak tracking events can be created`, async () => {
        expect.assertions(7);

        const streakTrackingEvent = await streakoid.streakTrackingEvents.create({
            type: StreakTrackingEventType.LostStreak,
            streakId: soloStreakId,
            userId,
        });

        streakTrackingEventId = streakTrackingEvent._id;

        expect(streakTrackingEvent.type).toEqual(StreakTrackingEventType.LostStreak);
        expect(streakTrackingEvent.userId).toEqual(userId);
        expect(streakTrackingEvent.streakId).toEqual(soloStreakId);
        expect(streakTrackingEvent._id).toEqual(expect.any(String));
        expect(streakTrackingEvent.createdAt).toEqual(expect.any(String));
        expect(streakTrackingEvent.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(streakTrackingEvent).sort()).toEqual(
            ['_id', 'type', 'streakId', 'userId', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`maintained streak tracking events can be created`, async () => {
        expect.assertions(7);

        const streakTrackingEvent = await streakoid.streakTrackingEvents.create({
            type: StreakTrackingEventType.MaintainedStreak,
            streakId: soloStreakId,
            userId,
        });

        streakTrackingEventId = streakTrackingEvent._id;

        expect(streakTrackingEvent.type).toEqual(StreakTrackingEventType.MaintainedStreak);
        expect(streakTrackingEvent.userId).toEqual(userId);
        expect(streakTrackingEvent.streakId).toEqual(soloStreakId);
        expect(streakTrackingEvent._id).toEqual(expect.any(String));
        expect(streakTrackingEvent.createdAt).toEqual(expect.any(String));
        expect(streakTrackingEvent.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(streakTrackingEvent).sort()).toEqual(
            ['_id', 'type', 'streakId', 'userId', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`inactive streak tracking events can be created`, async () => {
        expect.assertions(7);

        const streakTrackingEvent = await streakoid.streakTrackingEvents.create({
            type: StreakTrackingEventType.InactiveStreak,
            streakId: soloStreakId,
            userId,
        });

        streakTrackingEventId = streakTrackingEvent._id;

        expect(streakTrackingEvent.type).toEqual(StreakTrackingEventType.InactiveStreak);
        expect(streakTrackingEvent.userId).toEqual(userId);
        expect(streakTrackingEvent.streakId).toEqual(soloStreakId);
        expect(streakTrackingEvent._id).toEqual(expect.any(String));
        expect(streakTrackingEvent.createdAt).toEqual(expect.any(String));
        expect(streakTrackingEvent.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(streakTrackingEvent).sort()).toEqual(
            ['_id', 'type', 'streakId', 'userId', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });
});
