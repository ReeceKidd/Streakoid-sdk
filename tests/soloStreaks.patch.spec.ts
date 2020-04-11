import { StreakoidFactory, londonTimezone } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { StreakStatus, ActivityFeedItemTypes } from '../src';

jest.setTimeout(120000);

describe('PATCH /solo-streaks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let username: string;
    const streakName = 'Daily Spanish';
    const streakDescription = 'Everyday I must do 30 minutes of Spanish';

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

    test(`when solo streak is archived an ArchivedSoloStreakActivityFeedItem is created`, async () => {
        expect.assertions(5);

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName,
            streakDescription,
        });
        const soloStreakId = soloStreak._id;

        await streakoid.soloStreaks.update({
            soloStreakId,
            updateData: {
                status: StreakStatus.archived,
            },
        });

        const { activityFeedItems } = await streakoid.activityFeedItems.getAll({
            soloStreakId: soloStreak._id,
        });
        const createdSoloStreakActivityFeedItem = activityFeedItems.find(
            item => item.activityFeedItemType === ActivityFeedItemTypes.archivedSoloStreak,
        );
        if (
            createdSoloStreakActivityFeedItem &&
            createdSoloStreakActivityFeedItem.activityFeedItemType === ActivityFeedItemTypes.archivedSoloStreak
        ) {
            expect(createdSoloStreakActivityFeedItem.soloStreakId).toEqual(String(soloStreak._id));
            expect(createdSoloStreakActivityFeedItem.soloStreakName).toEqual(String(soloStreak.streakName));
            expect(createdSoloStreakActivityFeedItem.userId).toEqual(String(soloStreak.userId));
            expect(createdSoloStreakActivityFeedItem.username).toEqual(username);
            expect(Object.keys(createdSoloStreakActivityFeedItem).sort()).toEqual(
                [
                    '_id',
                    'activityFeedItemType',
                    'userId',
                    'username',
                    'soloStreakId',
                    'soloStreakName',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );
        }
    });

    test(`when solo streak is restored an RestoredSoloStreakActivityFeedItem is created`, async () => {
        expect.assertions(5);

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName,
            streakDescription,
        });
        const soloStreakId = soloStreak._id;

        await streakoid.soloStreaks.update({
            soloStreakId,
            updateData: {
                status: StreakStatus.archived,
            },
        });

        await streakoid.soloStreaks.update({
            soloStreakId,
            updateData: {
                status: StreakStatus.live,
            },
        });

        const { activityFeedItems } = await streakoid.activityFeedItems.getAll({
            soloStreakId: soloStreak._id,
        });
        const createdSoloStreakActivityFeedItem = activityFeedItems.find(
            item => item.activityFeedItemType === ActivityFeedItemTypes.restoredSoloStreak,
        );
        if (
            createdSoloStreakActivityFeedItem &&
            createdSoloStreakActivityFeedItem.activityFeedItemType === ActivityFeedItemTypes.restoredSoloStreak
        ) {
            expect(createdSoloStreakActivityFeedItem.soloStreakId).toEqual(String(soloStreak._id));
            expect(createdSoloStreakActivityFeedItem.soloStreakName).toEqual(String(soloStreak.streakName));
            expect(createdSoloStreakActivityFeedItem.userId).toEqual(String(soloStreak.userId));
            expect(createdSoloStreakActivityFeedItem.username).toEqual(username);
            expect(Object.keys(createdSoloStreakActivityFeedItem).sort()).toEqual(
                [
                    '_id',
                    'activityFeedItemType',
                    'userId',
                    'username',
                    'soloStreakId',
                    'soloStreakName',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );
        }
    });

    test(`when solo streak is deleted an DeletedSoloStreakActivityFeedItem is created`, async () => {
        expect.assertions(5);

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName,
            streakDescription,
        });
        const soloStreakId = soloStreak._id;

        await streakoid.soloStreaks.update({
            soloStreakId,
            updateData: {
                status: StreakStatus.archived,
            },
        });

        await streakoid.soloStreaks.update({
            soloStreakId,
            updateData: {
                status: StreakStatus.deleted,
            },
        });

        const { activityFeedItems } = await streakoid.activityFeedItems.getAll({
            soloStreakId: soloStreak._id,
        });
        const createdSoloStreakActivityFeedItem = activityFeedItems.find(
            item => item.activityFeedItemType === ActivityFeedItemTypes.deletedSoloStreak,
        );
        if (
            createdSoloStreakActivityFeedItem &&
            createdSoloStreakActivityFeedItem.activityFeedItemType === ActivityFeedItemTypes.deletedSoloStreak
        ) {
            expect(createdSoloStreakActivityFeedItem.soloStreakId).toEqual(String(soloStreak._id));
            expect(createdSoloStreakActivityFeedItem.soloStreakName).toEqual(String(soloStreak.streakName));
            expect(createdSoloStreakActivityFeedItem.userId).toEqual(String(soloStreak.userId));
            expect(createdSoloStreakActivityFeedItem.username).toEqual(username);
            expect(Object.keys(createdSoloStreakActivityFeedItem).sort()).toEqual(
                [
                    '_id',
                    'activityFeedItemType',
                    'userId',
                    'username',
                    'soloStreakId',
                    'soloStreakName',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );
        }
    });

    test(`when solo streak name is edited an EditedSoloStreakNameActivityFeedItem is created`, async () => {
        expect.assertions(5);

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName,
            streakDescription,
        });
        const soloStreakId = soloStreak._id;

        const newName = 'New name';

        await streakoid.soloStreaks.update({
            soloStreakId,
            updateData: {
                streakName: newName,
            },
        });

        const { activityFeedItems } = await streakoid.activityFeedItems.getAll({
            soloStreakId: soloStreak._id,
        });
        const createdSoloStreakActivityFeedItem = activityFeedItems.find(
            item => item.activityFeedItemType === ActivityFeedItemTypes.editedSoloStreakName,
        );
        if (
            createdSoloStreakActivityFeedItem &&
            createdSoloStreakActivityFeedItem.activityFeedItemType === ActivityFeedItemTypes.editedSoloStreakName
        ) {
            expect(createdSoloStreakActivityFeedItem.soloStreakId).toEqual(String(soloStreak._id));
            expect(createdSoloStreakActivityFeedItem.soloStreakName).toEqual(String(newName));
            expect(createdSoloStreakActivityFeedItem.userId).toEqual(String(soloStreak.userId));
            expect(createdSoloStreakActivityFeedItem.username).toEqual(username);
            expect(Object.keys(createdSoloStreakActivityFeedItem).sort()).toEqual(
                [
                    '_id',
                    'activityFeedItemType',
                    'userId',
                    'username',
                    'soloStreakId',
                    'soloStreakName',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );
        }
    });

    test(`when solo streak description is edited an EditedSoloStreakNameActivityFeedItem is created`, async () => {
        expect.assertions(5);

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName,
            streakDescription,
        });
        const soloStreakId = soloStreak._id;

        const newDescription = 'New description';

        await streakoid.soloStreaks.update({
            soloStreakId,
            updateData: {
                streakDescription: newDescription,
            },
        });

        const { activityFeedItems } = await streakoid.activityFeedItems.getAll({
            soloStreakId: soloStreak._id,
        });
        const createdSoloStreakActivityFeedItem = activityFeedItems.find(
            item => item.activityFeedItemType === ActivityFeedItemTypes.editedSoloStreakDescription,
        );
        if (
            createdSoloStreakActivityFeedItem &&
            createdSoloStreakActivityFeedItem.activityFeedItemType === ActivityFeedItemTypes.editedSoloStreakDescription
        ) {
            expect(createdSoloStreakActivityFeedItem.soloStreakId).toEqual(String(soloStreak._id));
            expect(createdSoloStreakActivityFeedItem.soloStreakName).toEqual(String(soloStreak.streakName));
            expect(createdSoloStreakActivityFeedItem.userId).toEqual(String(soloStreak.userId));
            expect(createdSoloStreakActivityFeedItem.username).toEqual(username);
            expect(Object.keys(createdSoloStreakActivityFeedItem).sort()).toEqual(
                [
                    '_id',
                    'activityFeedItemType',
                    'userId',
                    'username',
                    'soloStreakId',
                    'soloStreakName',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );
        }
    });
});
