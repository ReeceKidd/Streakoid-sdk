import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { ActivityFeedItemTypes } from '../src';

jest.setTimeout(120000);

describe('POST /streak-tracking-events', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let soloStreakId: string;
    const streakName = 'Daily Spanish';
    const streakDescription = 'Everyday I must do 30 minutes of Spanish';

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            const user = await getPayingUser();
            userId = user._id;
            streakoid = await streakoidTest();
            const soloStreak = await streakoid.soloStreaks.create({
                userId,
                streakName,
                streakDescription,
            });
            soloStreakId = soloStreak._id;
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`activity feed item event can be created`, async () => {
        expect.assertions(7);
        const activityFeedItem = await streakoid.activityFeedItems.create({
            activityFeedItemType: ActivityFeedItemTypes.lostSoloStreak,
            subjectId: soloStreakId,
            userId,
        });

        expect(activityFeedItem._id).toEqual(expect.any(String));
        expect(activityFeedItem.activityFeedItemType).toEqual(ActivityFeedItemTypes.lostSoloStreak);
        expect(activityFeedItem.userId).toBeDefined();
        expect(activityFeedItem.subjectId).toEqual(soloStreakId);
        expect(activityFeedItem.createdAt).toEqual(expect.any(String));
        expect(activityFeedItem.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activityFeedItem).sort()).toEqual(
            ['_id', 'activityFeedItemType', 'subjectId', 'userId', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });
});
