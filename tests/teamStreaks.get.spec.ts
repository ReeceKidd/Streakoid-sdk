import StreakStatus from '../src/StreakStatus';
import { StreakoidFactory } from '../src/streakoid';
import { getUser, streakoidTest, username } from './setup/streakoidTest';

const creatorIdStreakName = 'Daily Spanish';
const creatorIdStreakDescription = 'Each day I must do the insame amount 50xp of Duolingo';

const memberIdStreakName = 'Read 30 minutes';
const memberIdStreakDescription = 'Everyday we must read for 30 minutes';

const timezoneStreakName = 'Cold showers';
const timezoneStreakDescription = 'Every day I must take cold showers for one minutes';

const timezone = 'Europe/London';

jest.setTimeout(120000);

describe('GET /team-streaks', () => {
    let streakoid: StreakoidFactory;
    let creatorId: string;
    let creatorIdTeamStreakId: string;
    let memberIdTeamStreakId: string;
    let timezoneTeamStreakId: string;

    beforeAll(async () => {
        const creator = await getUser();
        creatorId = creator._id;
        streakoid = await streakoidTest();

        const members = [{ memberId: creatorId }];

        const creatorTeamStreak = await streakoid.teamStreaks.create({
            creatorId,
            streakName: creatorIdStreakName,
            streakDescription: creatorIdStreakDescription,
            members,
        });
        creatorIdTeamStreakId = creatorTeamStreak._id;

        const memberTeamStreak = await streakoid.teamStreaks.create({
            creatorId,
            streakName: memberIdStreakName,
            streakDescription: memberIdStreakDescription,
            members,
        });
        memberIdTeamStreakId = memberTeamStreak._id;

        const specificTimezoneTeamStreak = await streakoid.teamStreaks.create({
            creatorId,
            streakName: timezoneStreakName,
            streakDescription: timezoneStreakDescription,
            members,
        });

        timezoneTeamStreakId = specificTimezoneTeamStreak._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(creatorId);
        await streakoid.users.deleteOne(creatorId);

        await streakoid.teamStreaks.deleteOne(creatorIdTeamStreakId);
        await streakoid.teamStreaks.deleteOne(memberIdTeamStreakId);
        await streakoid.teamStreaks.deleteOne(timezoneTeamStreakId);
    });

    test(`team streaks can be retreived with creatorId query paramater`, async () => {
        expect.assertions(18);
        const teamStreaks = await streakoid.teamStreaks.getAll({ creatorId });
        expect(teamStreaks.length).toBeGreaterThanOrEqual(1);

        const teamStreak = teamStreaks[0];
        expect(teamStreak.streakName).toEqual(expect.any(String));
        expect(teamStreak.status).toEqual(StreakStatus.live);
        expect(teamStreak.streakDescription).toEqual(expect.any(String));
        expect(teamStreak.creatorId).toEqual(creatorId);
        expect(teamStreak.timezone).toEqual(expect.any(String));
        expect(teamStreak.active).toEqual(false);
        expect(teamStreak.completedToday).toEqual(false);
        expect(teamStreak.currentStreak.numberOfDaysInARow).toEqual(0);
        expect(Object.keys(teamStreak.currentStreak).sort()).toEqual(['numberOfDaysInARow'].sort());
        expect(teamStreak.pastStreaks.length).toEqual(0);
        expect(Object.keys(teamStreak).sort()).toEqual(
            [
                '_id',
                'members',
                'status',
                'creatorId',
                'streakName',
                'streakDescription',
                'timezone',
                'active',
                'completedToday',
                'currentStreak',
                'pastStreaks',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );

        const { members } = teamStreak;
        expect(members.length).toEqual(1);

        const member = members[0];
        expect(member._id).toBeDefined();
        expect(member.username).toEqual(username);
        expect(Object.keys(member).sort()).toEqual(['_id', 'username', 'groupMemberStreak'].sort());

        const { groupMemberStreak } = member;
        expect(Object.keys(groupMemberStreak).sort()).toEqual(
            [
                '_id',
                'currentStreak',
                'completedToday',
                'active',
                'pastStreaks',
                'userId',
                'teamStreakId',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );

        const { currentStreak } = groupMemberStreak;
        expect(Object.keys(currentStreak)).toEqual(['numberOfDaysInARow']);
    });

    test('returns no team streaks when invalid creatorId is used', async () => {
        expect.assertions(1);
        const teamStreaks = await streakoid.teamStreaks.getAll({
            creatorId: 'InvalidID',
        });
        expect(teamStreaks.length).toEqual(0);
    });

    test(`team streaks can be retreived with memberId query parameter`, async () => {
        expect.assertions(18);
        const teamStreaks = await streakoid.teamStreaks.getAll({
            memberId: creatorId,
        });
        expect(teamStreaks.length).toBeGreaterThanOrEqual(1);
        const teamStreak = teamStreaks[0];
        expect(teamStreak.streakName).toEqual(expect.any(String));
        expect(teamStreak.status).toEqual(StreakStatus.live);
        expect(teamStreak.streakDescription).toEqual(expect.any(String));
        expect(teamStreak.creatorId).toEqual(creatorId);
        expect(teamStreak.timezone).toEqual(expect.any(String));
        expect(teamStreak.active).toEqual(false);
        expect(teamStreak.completedToday).toEqual(false);
        expect(teamStreak.currentStreak.numberOfDaysInARow).toEqual(0);
        expect(Object.keys(teamStreak.currentStreak).sort()).toEqual(['numberOfDaysInARow'].sort());
        expect(teamStreak.pastStreaks.length).toEqual(0);
        expect(Object.keys(teamStreak).sort()).toEqual(
            [
                '_id',
                'members',
                'status',
                'creatorId',
                'streakName',
                'streakDescription',
                'timezone',
                'active',
                'completedToday',
                'currentStreak',
                'pastStreaks',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );

        const { members } = teamStreak;
        expect(members.length).toEqual(1);

        const member = members[0];
        expect(member._id).toBeDefined();
        expect(member.username).toEqual(username);
        expect(Object.keys(member).sort()).toEqual(['_id', 'username', 'groupMemberStreak'].sort());

        const { groupMemberStreak } = member;
        expect(Object.keys(groupMemberStreak).sort()).toEqual(
            [
                '_id',
                'currentStreak',
                'completedToday',
                'active',
                'pastStreaks',
                'userId',
                'teamStreakId',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );

        const { currentStreak } = groupMemberStreak;
        expect(Object.keys(currentStreak)).toEqual(['numberOfDaysInARow']);
    });

    test('returns no team streaks when invalid memberId is used', async () => {
        expect.assertions(1);
        const teamStreaks = await streakoid.teamStreaks.getAll({
            memberId: 'InvalidID',
        });
        expect(teamStreaks.length).toEqual(0);
    });

    test(`team streaks can be retreieved with timezone query parameter`, async () => {
        expect.assertions(18);
        const teamStreaks = await streakoid.teamStreaks.getAll({ timezone });

        expect(teamStreaks.length).toBeGreaterThanOrEqual(1);

        const teamStreak = teamStreaks[0];
        expect(teamStreak.streakName).toEqual(expect.any(String));
        expect(teamStreak.status).toEqual(expect.any(String));
        expect(teamStreak.streakDescription).toEqual(expect.any(String));
        expect(teamStreak.creatorId).toEqual(expect.any(String));
        expect(teamStreak.timezone).toEqual(expect.any(String));
        expect(teamStreak.active).toEqual(false);
        expect(teamStreak.completedToday).toEqual(false);
        expect(teamStreak.currentStreak.numberOfDaysInARow).toEqual(0);
        expect(Object.keys(teamStreak.currentStreak).sort()).toEqual(['numberOfDaysInARow'].sort());
        expect(teamStreak.pastStreaks.length).toEqual(0);
        expect(Object.keys(teamStreak).sort()).toEqual(
            [
                '_id',
                'members',
                'status',
                'creatorId',
                'streakName',
                'streakDescription',
                'timezone',
                'active',
                'completedToday',
                'currentStreak',
                'pastStreaks',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );

        const { members } = teamStreak;
        expect(members.length).toEqual(1);

        const member = members[0];
        expect(member._id).toBeDefined();
        expect(member.username).toEqual(username);
        expect(Object.keys(member).sort()).toEqual(['_id', 'username', 'groupMemberStreak'].sort());

        const { groupMemberStreak } = member;
        expect(Object.keys(groupMemberStreak).sort()).toEqual(
            [
                '_id',
                'currentStreak',
                'completedToday',
                'active',
                'pastStreaks',
                'userId',
                'teamStreakId',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );

        const { currentStreak } = groupMemberStreak;
        expect(Object.keys(currentStreak)).toEqual(['numberOfDaysInARow']);
    });

    test('returns no team streaks when timezone with no team streaks is used', async () => {
        expect.assertions(1);
        const teamStreaks = await streakoid.teamStreaks.getAll({
            timezone: 'Europe/Gambier Islands',
        });
        expect(teamStreaks.length).toEqual(0);
    });

    test(`archived team streaks can be retreived`, async () => {
        expect.assertions(17);

        await streakoid.teamStreaks.update({
            teamStreakId: creatorIdTeamStreakId,
            updateData: { status: StreakStatus.archived },
        });

        const teamStreaks = await streakoid.teamStreaks.getAll({
            status: StreakStatus.archived,
        });
        const teamStreak = teamStreaks[0];
        expect(teamStreak.streakName).toEqual(expect.any(String));
        expect(teamStreak.status).toEqual(StreakStatus.archived);
        expect(teamStreak.streakDescription).toEqual(expect.any(String));
        expect(teamStreak.creatorId).toEqual(expect.any(String));
        expect(teamStreak.timezone).toEqual(expect.any(String));
        expect(teamStreak.active).toEqual(false);
        expect(teamStreak.completedToday).toEqual(false);
        expect(teamStreak.currentStreak.numberOfDaysInARow).toEqual(0);
        expect(Object.keys(teamStreak.currentStreak).sort()).toEqual(['numberOfDaysInARow'].sort());
        expect(teamStreak.pastStreaks.length).toEqual(0);
        expect(Object.keys(teamStreak).sort()).toEqual(
            [
                '_id',
                'members',
                'status',
                'creatorId',
                'streakName',
                'streakDescription',
                'timezone',
                'active',
                'completedToday',
                'currentStreak',
                'pastStreaks',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );

        const { members } = teamStreak;
        expect(members.length).toEqual(1);

        const member = members[0];
        expect(member._id).toBeDefined();
        expect(member.username).toEqual(username);
        expect(Object.keys(member).sort()).toEqual(['_id', 'username', 'groupMemberStreak'].sort());

        const { groupMemberStreak } = member;
        expect(Object.keys(groupMemberStreak).sort()).toEqual(
            [
                '_id',
                'currentStreak',
                'completedToday',
                'active',
                'pastStreaks',
                'userId',
                'teamStreakId',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );

        const { currentStreak } = groupMemberStreak;
        expect(Object.keys(currentStreak)).toEqual(['numberOfDaysInARow']);
    });

    test(`deleted team streaks can be retreived`, async () => {
        expect.assertions(17);

        await streakoid.teamStreaks.update({
            teamStreakId: memberIdTeamStreakId,
            updateData: { status: StreakStatus.deleted },
        });

        const teamStreaks = await streakoid.teamStreaks.getAll({
            status: StreakStatus.deleted,
        });
        const teamStreak = teamStreaks[0];
        expect(teamStreak.streakName).toEqual(expect.any(String));
        expect(teamStreak.status).toEqual(StreakStatus.deleted);
        expect(teamStreak.streakDescription).toEqual(expect.any(String));
        expect(teamStreak.creatorId).toEqual(expect.any(String));
        expect(teamStreak.timezone).toEqual(expect.any(String));
        expect(teamStreak.active).toEqual(false);
        expect(teamStreak.completedToday).toEqual(false);
        expect(teamStreak.currentStreak.numberOfDaysInARow).toEqual(0);
        expect(Object.keys(teamStreak.currentStreak).sort()).toEqual(['numberOfDaysInARow'].sort());
        expect(teamStreak.pastStreaks.length).toEqual(0);
        expect(Object.keys(teamStreak).sort()).toEqual(
            [
                '_id',
                'members',
                'status',
                'creatorId',
                'streakName',
                'streakDescription',
                'timezone',
                'active',
                'completedToday',
                'currentStreak',
                'pastStreaks',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );

        const { members } = teamStreak;
        expect(members.length).toEqual(1);

        const member = members[0];
        expect(member._id).toBeDefined();
        expect(member.username).toEqual(username);
        expect(Object.keys(member).sort()).toEqual(['_id', 'username', 'groupMemberStreak'].sort());

        const { groupMemberStreak } = member;
        expect(Object.keys(groupMemberStreak).sort()).toEqual(
            [
                '_id',
                'currentStreak',
                'completedToday',
                'active',
                'pastStreaks',
                'userId',
                'teamStreakId',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );

        const { currentStreak } = groupMemberStreak;
        expect(Object.keys(currentStreak)).toEqual(['numberOfDaysInARow']);
    });
});
