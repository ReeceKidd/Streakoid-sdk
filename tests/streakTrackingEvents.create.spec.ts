import { streakoid } from '../src/streakoid';
import { StreakTypes, StreakTrackingEventTypes, GroupStreakTypes } from '../src';

const email = 'create-team-streak-user@gmail.com';
const username = 'create-team-streak-user';

const streakName = 'Daily yoga';
const streakDescription = 'Every day I must do yoga before 12pm';

jest.setTimeout(120000);

describe('POST /streak-tracking-events', () => {
    let userId: string;
    let soloStreakId: string;
    let streakTrackingEventId: string;
    let teamStreakId: string;
    let groupMemberStreakId: string;

    beforeAll(async () => {
        const user = await streakoid.users.create({
            email,
            username,
        });
        userId = user._id;

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

        const groupMemberStreak = await streakoid.groupMemberStreaks.create({
            userId,
            teamStreakId: teamStreak._id,
        });

        groupMemberStreakId = groupMemberStreak._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.soloStreaks.deleteOne(soloStreakId);
        await streakoid.streakTrackingEvents.deleteOne(streakTrackingEventId);
        await streakoid.teamStreaks.deleteOne(teamStreakId);
        await streakoid.groupMemberStreaks.deleteOne(groupMemberStreakId);
    });

    test(`lost solo streak tracking events can be created`, async () => {
        expect.assertions(9);

        const streakTrackingEvent = await streakoid.streakTrackingEvents.create({
            type: StreakTrackingEventTypes.lostStreak,
            streakId: soloStreakId,
            userId,
            streakType: StreakTypes.soloStreak,
        });

        streakTrackingEventId = streakTrackingEvent._id;

        expect(streakTrackingEvent._id).toEqual(expect.any(String));
        expect(streakTrackingEvent.type).toEqual(StreakTrackingEventTypes.lostStreak);
        expect(streakTrackingEvent.userId).toEqual(userId);
        expect(streakTrackingEvent.streakId).toEqual(soloStreakId);
        expect(streakTrackingEvent.streakType).toEqual(StreakTypes.soloStreak);
        expect(streakTrackingEvent.groupStreakType).toBeUndefined();
        expect(streakTrackingEvent.createdAt).toEqual(expect.any(String));
        expect(streakTrackingEvent.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(streakTrackingEvent).sort()).toEqual(
            ['_id', 'type', 'streakId', 'userId', 'streakType', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`maintained solo streak tracking events can be created`, async () => {
        expect.assertions(9);

        const streakTrackingEvent = await streakoid.streakTrackingEvents.create({
            type: StreakTrackingEventTypes.maintainedStreak,
            streakId: soloStreakId,
            userId,
            streakType: StreakTypes.soloStreak,
        });

        streakTrackingEventId = streakTrackingEvent._id;

        expect(streakTrackingEvent._id).toEqual(expect.any(String));
        expect(streakTrackingEvent.type).toEqual(StreakTrackingEventTypes.maintainedStreak);
        expect(streakTrackingEvent.userId).toEqual(userId);
        expect(streakTrackingEvent.streakId).toEqual(soloStreakId);
        expect(streakTrackingEvent.streakType).toEqual(StreakTypes.soloStreak);
        expect(streakTrackingEvent.groupStreakType).toBeUndefined();
        expect(streakTrackingEvent.createdAt).toEqual(expect.any(String));
        expect(streakTrackingEvent.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(streakTrackingEvent).sort()).toEqual(
            ['_id', 'type', 'streakId', 'userId', 'streakType', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`inactive solo streak tracking events can be created`, async () => {
        expect.assertions(9);

        const streakTrackingEvent = await streakoid.streakTrackingEvents.create({
            type: StreakTrackingEventTypes.inactiveStreak,
            streakId: soloStreakId,
            userId,
            streakType: StreakTypes.soloStreak,
        });

        streakTrackingEventId = streakTrackingEvent._id;

        expect(streakTrackingEvent.type).toEqual(StreakTrackingEventTypes.inactiveStreak);
        expect(streakTrackingEvent.userId).toEqual(userId);
        expect(streakTrackingEvent.streakId).toEqual(soloStreakId);
        expect(streakTrackingEvent.streakType).toEqual(StreakTypes.soloStreak);
        expect(streakTrackingEvent.groupStreakType).toBeUndefined();
        expect(streakTrackingEvent._id).toEqual(expect.any(String));
        expect(streakTrackingEvent.createdAt).toEqual(expect.any(String));
        expect(streakTrackingEvent.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(streakTrackingEvent).sort()).toEqual(
            ['_id', 'type', 'streakId', 'userId', 'streakType', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`lost team member streak tracking events can be created`, async () => {
        expect.assertions(9);

        const streakTrackingEvent = await streakoid.streakTrackingEvents.create({
            type: StreakTrackingEventTypes.lostStreak,
            streakId: groupMemberStreakId,
            userId,
            streakType: StreakTypes.groupMemberStreak,
            groupStreakType: GroupStreakTypes.team,
        });

        streakTrackingEventId = streakTrackingEvent._id;

        expect(streakTrackingEvent._id).toEqual(expect.any(String));
        expect(streakTrackingEvent.type).toEqual(StreakTrackingEventTypes.lostStreak);
        expect(streakTrackingEvent.userId).toEqual(userId);
        expect(streakTrackingEvent.streakId).toEqual(groupMemberStreakId);
        expect(streakTrackingEvent.streakType).toEqual(StreakTypes.groupMemberStreak);
        expect(streakTrackingEvent.groupStreakType).toEqual(GroupStreakTypes.team);
        expect(streakTrackingEvent.createdAt).toEqual(expect.any(String));
        expect(streakTrackingEvent.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(streakTrackingEvent).sort()).toEqual(
            [
                '_id',
                'type',
                'streakId',
                'userId',
                'streakType',
                'groupStreakType',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });

    test(`maintained team member streak tracking events can be created`, async () => {
        expect.assertions(9);

        const streakTrackingEvent = await streakoid.streakTrackingEvents.create({
            type: StreakTrackingEventTypes.maintainedStreak,
            streakId: groupMemberStreakId,
            userId,
            streakType: StreakTypes.groupMemberStreak,
            groupStreakType: GroupStreakTypes.team,
        });

        streakTrackingEventId = streakTrackingEvent._id;

        expect(streakTrackingEvent._id).toEqual(expect.any(String));
        expect(streakTrackingEvent.type).toEqual(StreakTrackingEventTypes.maintainedStreak);
        expect(streakTrackingEvent.userId).toEqual(userId);
        expect(streakTrackingEvent.streakId).toEqual(groupMemberStreakId);
        expect(streakTrackingEvent.streakType).toEqual(StreakTypes.groupMemberStreak);
        expect(streakTrackingEvent.groupStreakType).toEqual(GroupStreakTypes.team);
        expect(streakTrackingEvent.createdAt).toEqual(expect.any(String));
        expect(streakTrackingEvent.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(streakTrackingEvent).sort()).toEqual(
            [
                '_id',
                'type',
                'streakId',
                'userId',
                'streakType',
                'groupStreakType',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });

    test(`inactive team member streak tracking events can be created`, async () => {
        expect.assertions(9);

        const streakTrackingEvent = await streakoid.streakTrackingEvents.create({
            type: StreakTrackingEventTypes.inactiveStreak,
            streakId: groupMemberStreakId,
            userId,
            streakType: StreakTypes.groupMemberStreak,
            groupStreakType: GroupStreakTypes.team,
        });

        streakTrackingEventId = streakTrackingEvent._id;

        expect(streakTrackingEvent._id).toEqual(expect.any(String));
        expect(streakTrackingEvent.type).toEqual(StreakTrackingEventTypes.inactiveStreak);
        expect(streakTrackingEvent.userId).toEqual(userId);
        expect(streakTrackingEvent.streakId).toEqual(groupMemberStreakId);
        expect(streakTrackingEvent.streakType).toEqual(StreakTypes.groupMemberStreak);
        expect(streakTrackingEvent.groupStreakType).toEqual(GroupStreakTypes.team);
        expect(streakTrackingEvent.createdAt).toEqual(expect.any(String));
        expect(streakTrackingEvent.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(streakTrackingEvent).sort()).toEqual(
            [
                '_id',
                'type',
                'streakId',
                'userId',
                'streakType',
                'groupStreakType',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });

    test('if streak type equals group member streak groupStreakType must be defined', async () => {
        expect.assertions(3);

        try {
            await streakoid.streakTrackingEvents.create({
                type: StreakTrackingEventTypes.inactiveStreak,
                streakId: groupMemberStreakId,
                userId,
                streakType: StreakTypes.groupMemberStreak,
            });
        } catch (err) {
            expect(err.response.status).toEqual(400);
            expect(err.response.data.code).toBe('400-62');
            expect(err.response.data.message).toEqual(`groupStreakType must be defined.`);
        }
    });

    test('groupStreakType cannot be added if streak type equals solo streak', async () => {
        expect.assertions(3);

        try {
            await streakoid.streakTrackingEvents.create({
                type: StreakTrackingEventTypes.inactiveStreak,
                streakId: groupMemberStreakId,
                userId,
                streakType: StreakTypes.soloStreak,
                groupStreakType: GroupStreakTypes.team,
            });
        } catch (err) {
            expect(err.response.status).toEqual(400);
            expect(err.response.data.code).toBe('400-61');
            expect(err.response.data.message).toEqual(`groupStreakType should not be defined for a soloStreak.`);
        }
    });
});
