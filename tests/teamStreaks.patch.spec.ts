import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { StreakStatus, ActivityFeedItemTypes } from '../src';

jest.setTimeout(120000);

describe('PATCH /teamStreaks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let username: string;
    const streakName = 'Daily Spanish';

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            const user = await getPayingUser();
            userId = user._id;
            username = user.username;
            streakoid = await streakoidTest();
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`that request passes when team streak is patched with correct keys`, async () => {
        expect.assertions(15);

        const members = [{ memberId: userId }];

        const originalTeamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            members,
        });

        const updatedName = 'Intermittent fasting';
        const updatedDescription = 'Cannot eat till 1pm everyday';
        const numberOfMinutes = 30;
        const updatedTimezone = 'Europe/Rome';
        const numberOfDaysInARow = 10;

        const teamStreak = await streakoid.teamStreaks.update({
            teamStreakId: originalTeamStreak._id,
            updateData: {
                streakName: updatedName,
                streakDescription: updatedDescription,
                numberOfMinutes,
                timezone: updatedTimezone,
                status: StreakStatus.live,
                currentStreak: {
                    startDate: new Date().toString(),
                    numberOfDaysInARow,
                },
                pastStreaks: [],
                completedToday: false,
                active: false,
            },
        });

        expect(teamStreak.streakName).toEqual(expect.any(String));
        expect(teamStreak.status).toEqual(StreakStatus.live);
        expect(teamStreak.streakDescription).toEqual(expect.any(String));
        expect(teamStreak.numberOfMinutes).toEqual(numberOfMinutes);
        expect(teamStreak.creatorId).toBeDefined();
        expect(teamStreak.timezone).toEqual(expect.any(String));
        expect(teamStreak.active).toEqual(false);
        expect(teamStreak.completedToday).toEqual(false);
        expect(teamStreak.currentStreak.numberOfDaysInARow).toEqual(numberOfDaysInARow);
        expect(teamStreak.currentStreak.startDate).toEqual(expect.any(String));
        expect(Object.keys(teamStreak.currentStreak).sort()).toEqual(['startDate', 'numberOfDaysInARow'].sort());
        expect(teamStreak.pastStreaks.length).toEqual(0);
        expect(Object.keys(teamStreak).sort()).toEqual(
            [
                '_id',
                'members',
                'status',
                'creatorId',
                'streakName',
                'streakDescription',
                'numberOfMinutes',
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

        expect(teamStreak.members.length).toEqual(1);

        const member = members[0];
        expect(Object.keys(member).sort()).toEqual(['memberId'].sort());
    });

    test(`when team streak is archived an ArchivedTeamStreakActivityFeedItem is created`, async () => {
        expect.assertions(5);

        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            members,
        });

        await streakoid.teamStreaks.update({
            teamStreakId: teamStreak._id,
            updateData: {
                status: StreakStatus.archived,
            },
        });

        const { activityFeedItems } = await streakoid.activityFeedItems.getAll({
            teamStreakId: teamStreak._id,
        });
        const createdSoloStreakActivityFeedItem = activityFeedItems.find(
            item => item.activityFeedItemType === ActivityFeedItemTypes.archivedTeamStreak,
        );
        if (
            createdSoloStreakActivityFeedItem &&
            createdSoloStreakActivityFeedItem.activityFeedItemType === ActivityFeedItemTypes.archivedTeamStreak
        ) {
            expect(createdSoloStreakActivityFeedItem.teamStreakId).toEqual(String(teamStreak._id));
            expect(createdSoloStreakActivityFeedItem.teamStreakName).toEqual(String(teamStreak.streakName));
            expect(createdSoloStreakActivityFeedItem.userId).toEqual(String(userId));
            expect(createdSoloStreakActivityFeedItem.username).toEqual(username);
            expect(Object.keys(createdSoloStreakActivityFeedItem).sort()).toEqual(
                [
                    '_id',
                    'activityFeedItemType',
                    'userId',
                    'username',
                    'teamStreakId',
                    'teamStreakName',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );
        }
    });

    test(`when team streak is restored an RestoredTeamStreakActivityFeedItem is created`, async () => {
        expect.assertions(5);

        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            members,
        });

        await streakoid.teamStreaks.update({
            teamStreakId: teamStreak._id,
            updateData: {
                status: StreakStatus.archived,
            },
        });

        await streakoid.teamStreaks.update({
            teamStreakId: teamStreak._id,
            updateData: {
                status: StreakStatus.live,
            },
        });

        const { activityFeedItems } = await streakoid.activityFeedItems.getAll({
            teamStreakId: teamStreak._id,
        });
        const createdSoloStreakActivityFeedItem = activityFeedItems.find(
            item => item.activityFeedItemType === ActivityFeedItemTypes.restoredTeamStreak,
        );
        if (
            createdSoloStreakActivityFeedItem &&
            createdSoloStreakActivityFeedItem.activityFeedItemType === ActivityFeedItemTypes.restoredTeamStreak
        ) {
            expect(createdSoloStreakActivityFeedItem.teamStreakId).toEqual(String(teamStreak._id));
            expect(createdSoloStreakActivityFeedItem.teamStreakName).toEqual(String(teamStreak.streakName));
            expect(createdSoloStreakActivityFeedItem.userId).toEqual(String(userId));
            expect(createdSoloStreakActivityFeedItem.username).toEqual(username);
            expect(Object.keys(createdSoloStreakActivityFeedItem).sort()).toEqual(
                [
                    '_id',
                    'activityFeedItemType',
                    'userId',
                    'username',
                    'teamStreakId',
                    'teamStreakName',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );
        }
    });

    test(`when team streak is deleted an DeletedTeamStreakActivityFeedItem is created`, async () => {
        expect.assertions(5);

        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            members,
        });

        await streakoid.teamStreaks.update({
            teamStreakId: teamStreak._id,
            updateData: {
                status: StreakStatus.archived,
            },
        });

        await streakoid.teamStreaks.update({
            teamStreakId: teamStreak._id,
            updateData: {
                status: StreakStatus.deleted,
            },
        });

        const { activityFeedItems } = await streakoid.activityFeedItems.getAll({
            teamStreakId: teamStreak._id,
        });
        const createdSoloStreakActivityFeedItem = activityFeedItems.find(
            item => item.activityFeedItemType === ActivityFeedItemTypes.deletedTeamStreak,
        );
        if (
            createdSoloStreakActivityFeedItem &&
            createdSoloStreakActivityFeedItem.activityFeedItemType === ActivityFeedItemTypes.deletedTeamStreak
        ) {
            expect(createdSoloStreakActivityFeedItem.teamStreakId).toEqual(String(teamStreak._id));
            expect(createdSoloStreakActivityFeedItem.teamStreakName).toEqual(String(teamStreak.streakName));
            expect(createdSoloStreakActivityFeedItem.userId).toEqual(String(userId));
            expect(createdSoloStreakActivityFeedItem.username).toEqual(username);
            expect(Object.keys(createdSoloStreakActivityFeedItem).sort()).toEqual(
                [
                    '_id',
                    'activityFeedItemType',
                    'userId',
                    'username',
                    'teamStreakId',
                    'teamStreakName',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );
        }
    });

    test(`when team streak name is edited an EditedTeamStreakNameActivityFeedItem is created`, async () => {
        expect.assertions(5);

        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            members,
        });

        const newTeamStreakName = 'Yoga';

        await streakoid.teamStreaks.update({
            teamStreakId: teamStreak._id,
            updateData: {
                streakName: newTeamStreakName,
            },
        });

        const { activityFeedItems } = await streakoid.activityFeedItems.getAll({
            teamStreakId: teamStreak._id,
        });
        const createdSoloStreakActivityFeedItem = activityFeedItems.find(
            item => item.activityFeedItemType === ActivityFeedItemTypes.editedTeamStreakName,
        );
        if (
            createdSoloStreakActivityFeedItem &&
            createdSoloStreakActivityFeedItem.activityFeedItemType === ActivityFeedItemTypes.editedTeamStreakName
        ) {
            expect(createdSoloStreakActivityFeedItem.teamStreakId).toEqual(String(teamStreak._id));
            expect(createdSoloStreakActivityFeedItem.teamStreakName).toEqual(String(newTeamStreakName));
            expect(createdSoloStreakActivityFeedItem.userId).toEqual(String(userId));
            expect(createdSoloStreakActivityFeedItem.username).toEqual(username);
            expect(Object.keys(createdSoloStreakActivityFeedItem).sort()).toEqual(
                [
                    '_id',
                    'activityFeedItemType',
                    'userId',
                    'username',
                    'teamStreakId',
                    'teamStreakName',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );
        }
    });

    test(`when team streak description is edited an EditedTeamStreakDescriptionActivityFeedItem is created`, async () => {
        expect.assertions(5);

        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            members,
        });

        const newTeamStreakDescription = 'Must read for 30 minutes';

        await streakoid.teamStreaks.update({
            teamStreakId: teamStreak._id,
            updateData: {
                streakDescription: newTeamStreakDescription,
            },
        });

        const { activityFeedItems } = await streakoid.activityFeedItems.getAll({
            teamStreakId: teamStreak._id,
        });
        const createdSoloStreakActivityFeedItem = activityFeedItems.find(
            item => item.activityFeedItemType === ActivityFeedItemTypes.editedTeamStreakDescription,
        );
        if (
            createdSoloStreakActivityFeedItem &&
            createdSoloStreakActivityFeedItem.activityFeedItemType === ActivityFeedItemTypes.editedTeamStreakDescription
        ) {
            expect(createdSoloStreakActivityFeedItem.teamStreakId).toEqual(String(teamStreak._id));
            expect(createdSoloStreakActivityFeedItem.teamStreakName).toEqual(String(teamStreak.streakName));
            expect(createdSoloStreakActivityFeedItem.userId).toEqual(String(userId));
            expect(createdSoloStreakActivityFeedItem.username).toEqual(username);
            expect(Object.keys(createdSoloStreakActivityFeedItem).sort()).toEqual(
                [
                    '_id',
                    'activityFeedItemType',
                    'userId',
                    'username',
                    'teamStreakId',
                    'teamStreakName',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );
        }
    });
});
