import { StreakTypes, StreakTrackingEventTypes } from '../src';
import { StreakoidFactory } from '../src/streakoid';
import { getUser, streakoidTest } from './setup/streakoidTest';

const streakName = 'Daily yoga';
const streakDescription = 'Every day I must do yoga before 12pm';

jest.setTimeout(120000);

describe('POST /streak-tracking-events', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let soloStreakId: string;
    let streakTrackingEventId: string;
    let teamStreakId: string;
    let teamMemberStreakId: string;

    beforeAll(async () => {
        const user = await getUser();
        userId = user._id;
        streakoid = await streakoidTest();

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName,
            streakDescription,
        });
        soloStreakId = soloStreak._id;

        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            streakDescription,
            members,
        });
        teamStreakId = teamStreak._id;

        const teamMemberStreak = await streakoid.teamMemberStreaks.create({
            userId,
            teamStreakId: teamStreak._id,
        });

        teamMemberStreakId = teamMemberStreak._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.soloStreaks.deleteOne(soloStreakId);
        await streakoid.streakTrackingEvents.deleteOne(streakTrackingEventId);
        await streakoid.teamStreaks.deleteOne(teamStreakId);
        await streakoid.teamMemberStreaks.deleteOne(teamMemberStreakId);
    });

    test(`lost solo streak tracking events can be created`, async () => {
        expect.assertions(8);

        const streakTrackingEvent = await streakoid.streakTrackingEvents.create({
            type: StreakTrackingEventTypes.lostStreak,
            streakId: soloStreakId,
            userId,
            streakType: StreakTypes.solo,
        });

        streakTrackingEventId = streakTrackingEvent._id;

        expect(streakTrackingEvent._id).toEqual(expect.any(String));
        expect(streakTrackingEvent.type).toEqual(StreakTrackingEventTypes.lostStreak);
        expect(streakTrackingEvent.userId).toEqual(userId);
        expect(streakTrackingEvent.streakId).toEqual(soloStreakId);
        expect(streakTrackingEvent.streakType).toEqual(StreakTypes.solo);

        expect(streakTrackingEvent.createdAt).toEqual(expect.any(String));
        expect(streakTrackingEvent.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(streakTrackingEvent).sort()).toEqual(
            ['_id', 'type', 'streakId', 'userId', 'streakType', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`maintained solo streak tracking events can be created`, async () => {
        expect.assertions(8);

        const streakTrackingEvent = await streakoid.streakTrackingEvents.create({
            type: StreakTrackingEventTypes.maintainedStreak,
            streakId: soloStreakId,
            userId,
            streakType: StreakTypes.solo,
        });

        streakTrackingEventId = streakTrackingEvent._id;

        expect(streakTrackingEvent._id).toEqual(expect.any(String));
        expect(streakTrackingEvent.type).toEqual(StreakTrackingEventTypes.maintainedStreak);
        expect(streakTrackingEvent.userId).toEqual(userId);
        expect(streakTrackingEvent.streakId).toEqual(soloStreakId);
        expect(streakTrackingEvent.streakType).toEqual(StreakTypes.solo);

        expect(streakTrackingEvent.createdAt).toEqual(expect.any(String));
        expect(streakTrackingEvent.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(streakTrackingEvent).sort()).toEqual(
            ['_id', 'type', 'streakId', 'userId', 'streakType', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`inactive solo streak tracking events can be created`, async () => {
        expect.assertions(8);

        const streakTrackingEvent = await streakoid.streakTrackingEvents.create({
            type: StreakTrackingEventTypes.inactiveStreak,
            streakId: soloStreakId,
            userId,
            streakType: StreakTypes.solo,
        });

        streakTrackingEventId = streakTrackingEvent._id;

        expect(streakTrackingEvent.type).toEqual(StreakTrackingEventTypes.inactiveStreak);
        expect(streakTrackingEvent.userId).toEqual(userId);
        expect(streakTrackingEvent.streakId).toEqual(soloStreakId);
        expect(streakTrackingEvent.streakType).toEqual(StreakTypes.solo);

        expect(streakTrackingEvent._id).toEqual(expect.any(String));
        expect(streakTrackingEvent.createdAt).toEqual(expect.any(String));
        expect(streakTrackingEvent.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(streakTrackingEvent).sort()).toEqual(
            ['_id', 'type', 'streakId', 'userId', 'streakType', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`lost team member streak tracking events can be created`, async () => {
        expect.assertions(8);

        const streakTrackingEvent = await streakoid.streakTrackingEvents.create({
            type: StreakTrackingEventTypes.lostStreak,
            streakId: teamMemberStreakId,
            userId,
            streakType: StreakTypes.team,
        });

        streakTrackingEventId = streakTrackingEvent._id;

        expect(streakTrackingEvent._id).toEqual(expect.any(String));
        expect(streakTrackingEvent.type).toEqual(StreakTrackingEventTypes.lostStreak);
        expect(streakTrackingEvent.userId).toEqual(userId);
        expect(streakTrackingEvent.streakId).toEqual(teamMemberStreakId);
        expect(streakTrackingEvent.streakType).toEqual(StreakTypes.team);
        expect(streakTrackingEvent.createdAt).toEqual(expect.any(String));
        expect(streakTrackingEvent.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(streakTrackingEvent).sort()).toEqual(
            ['_id', 'type', 'streakId', 'userId', 'streakType', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`maintained team member streak tracking events can be created`, async () => {
        expect.assertions(8);

        const streakTrackingEvent = await streakoid.streakTrackingEvents.create({
            type: StreakTrackingEventTypes.maintainedStreak,
            streakId: teamMemberStreakId,
            userId,
            streakType: StreakTypes.team,
        });

        streakTrackingEventId = streakTrackingEvent._id;

        expect(streakTrackingEvent._id).toEqual(expect.any(String));
        expect(streakTrackingEvent.type).toEqual(StreakTrackingEventTypes.maintainedStreak);
        expect(streakTrackingEvent.userId).toEqual(userId);
        expect(streakTrackingEvent.streakId).toEqual(teamMemberStreakId);
        expect(streakTrackingEvent.streakType).toEqual(StreakTypes.team);
        expect(streakTrackingEvent.createdAt).toEqual(expect.any(String));
        expect(streakTrackingEvent.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(streakTrackingEvent).sort()).toEqual(
            ['_id', 'type', 'streakId', 'userId', 'streakType', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`inactive team member streak tracking events can be created`, async () => {
        expect.assertions(9);

        const streakTrackingEvent = await streakoid.streakTrackingEvents.create({
            type: StreakTrackingEventTypes.inactiveStreak,
            streakId: teamMemberStreakId,
            userId,
            streakType: StreakTypes.team,
        });

        streakTrackingEventId = streakTrackingEvent._id;

        expect(streakTrackingEvent._id).toEqual(expect.any(String));
        expect(streakTrackingEvent.type).toEqual(StreakTrackingEventTypes.inactiveStreak);
        expect(streakTrackingEvent.userId).toEqual(userId);
        expect(streakTrackingEvent.streakId).toEqual(teamMemberStreakId);
        expect(streakTrackingEvent.streakType).toEqual(StreakTypes.team);
        expect(streakTrackingEvent.streakType).toEqual(StreakTypes.team);
        expect(streakTrackingEvent.createdAt).toEqual(expect.any(String));
        expect(streakTrackingEvent.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(streakTrackingEvent).sort()).toEqual(
            ['_id', 'type', 'streakId', 'userId', 'streakType', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });
});
