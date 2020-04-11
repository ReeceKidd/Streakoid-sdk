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
    let userProfileImage: string;

    beforeEach(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            const user = await getPayingUser();
            userId = user._id;
            username = user.username;
            userProfileImage = user.profileImages.originalImageUrl;
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
        expect.assertions(6);

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName,
        });

        const { activityFeedItems } = await streakoid.activityFeedItems.getAll({
            soloStreakId: soloStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.createdSoloStreak,
        });
        const activityFeedItem = activityFeedItems.find(
            item => item.activityFeedItemType === ActivityFeedItemTypes.createdSoloStreak,
        );
        if (activityFeedItem && activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.createdSoloStreak) {
            expect(activityFeedItem.soloStreakId).toEqual(String(soloStreak._id));
            expect(activityFeedItem.soloStreakName).toEqual(String(soloStreak.streakName));
            expect(activityFeedItem.userId).toEqual(String(soloStreak.userId));
            expect(activityFeedItem.username).toEqual(username);
            expect(activityFeedItem.userProfileImage).toEqual(String(userProfileImage));
            expect(Object.keys(activityFeedItem).sort()).toEqual(
                [
                    '_id',
                    'activityFeedItemType',
                    'userId',
                    'username',
                    'userProfileImage',
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
