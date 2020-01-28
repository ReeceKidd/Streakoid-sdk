import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { getPayingUser } from './setup/getPayingUser';
import ActivityFeedItemTypes from '../src/ActivityFeedItemTypes';

jest.setTimeout(120000);

describe('GET /activityFeedItems', () => {
    let streakoid: StreakoidFactory;
    let userId: string;

    beforeEach(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            streakoid = await streakoidTest();
            const user = await getPayingUser();
            userId = user._id;
        }
    });

    afterEach(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`gets a ${ActivityFeedItemTypes.createdSoloStreak} activity`, async () => {
        expect.assertions(7);

        const streakName = 'Daily Spanish';
        const streakDescription = 'Everyday I must do 30 minutes of Spanish';

        // When a solo streak is created a createdSoloStreak activity is created.
        await streakoid.soloStreaks.create({
            userId,
            streakName,
            streakDescription,
        });

        const activityFeedItems = await streakoid.activityFeedItems.getAll({});
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.streakId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.createdSoloStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'streakId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });
});
