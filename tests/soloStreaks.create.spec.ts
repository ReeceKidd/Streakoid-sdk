import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { StreakStatus, ActivityFeedItemTypes } from '../src';

jest.setTimeout(120000);

const streakName = 'Daily Spanish';
const streakDescription = 'I must do 30 minutes of Spanish everyday';
const numberOfMinutes = 30;

describe('POST /solo-streaks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let username: string;

    beforeEach(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            const user = await getPayingUser();
            userId = user._id;
            username = user.username;
            streakoid = await streakoidTest();
        }
    });

    afterEach(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`creates solo streak with a description and numberOfMinutes`, async () => {
        expect.assertions(14);

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName,
            streakDescription,
            numberOfMinutes,
        });

        const { status, _id, currentStreak, completedToday, active, pastStreaks, createdAt, updatedAt } = soloStreak;

        expect(soloStreak.streakName).toEqual(streakName);
        expect(status).toEqual(StreakStatus.live);
        expect(soloStreak.streakDescription).toEqual(streakDescription);
        expect(soloStreak.numberOfMinutes).toEqual(numberOfMinutes);
        expect(soloStreak.userId).toBeDefined();
        expect(_id).toBeDefined();
        expect(Object.keys(currentStreak)).toEqual(['numberOfDaysInARow']);
        expect(currentStreak.numberOfDaysInARow).toEqual(0);
        expect(completedToday).toEqual(false);
        expect(active).toEqual(false);
        expect(pastStreaks).toEqual([]);
        expect(createdAt).toBeDefined();
        expect(updatedAt).toBeDefined();
        expect(Object.keys(soloStreak).sort()).toEqual(
            [
                'currentStreak',
                'status',
                'completedToday',
                'active',
                'pastStreaks',
                '_id',
                'streakName',
                'streakDescription',
                'userId',
                'timezone',
                'numberOfMinutes',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });

    test(`creates solo streak without a description or number of minutes`, async () => {
        expect.assertions(14);

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName,
        });

        const {
            status,
            streakDescription,
            numberOfMinutes,
            _id,
            currentStreak,
            completedToday,
            active,
            pastStreaks,
            createdAt,
            updatedAt,
        } = soloStreak;

        expect(soloStreak.streakName).toEqual(streakName);
        expect(status).toEqual(StreakStatus.live);
        expect(numberOfMinutes).toEqual(undefined);
        expect(streakDescription).toEqual('');
        expect(soloStreak.userId).toBeDefined();
        expect(_id).toBeDefined();
        expect(Object.keys(currentStreak)).toEqual(['numberOfDaysInARow']);
        expect(currentStreak.numberOfDaysInARow).toEqual(0);
        expect(completedToday).toEqual(false);
        expect(active).toEqual(false);
        expect(pastStreaks).toEqual([]);
        expect(createdAt).toBeDefined();
        expect(updatedAt).toBeDefined();
        expect(Object.keys(soloStreak).sort()).toEqual(
            [
                'status',
                'currentStreak',
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

    test(`when a soloStreak is created an CreatedSoloStreakActivityFeedItem is created`, async () => {
        expect.assertions(5);

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName,
        });

        const { activityFeedItems } = await streakoid.activityFeedItems.getAll({
            soloStreakId: soloStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.createdSoloStreak,
        });
        const createdSoloStreakActivityFeedItem = activityFeedItems.find(
            item => item.activityFeedItemType === ActivityFeedItemTypes.createdSoloStreak,
        );
        if (
            createdSoloStreakActivityFeedItem &&
            createdSoloStreakActivityFeedItem.activityFeedItemType === ActivityFeedItemTypes.createdSoloStreak
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
