import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { User } from '@streakoid/streakoid-models/lib/Models/User';
import { SoloStreak } from '@streakoid/streakoid-models/lib/Models/SoloStreak';
import ActivityFeedItemTypes from '@streakoid/streakoid-models/lib/Types/ActivityFeedItemTypes';

jest.setTimeout(120000);

describe('POST /activity-feed-items', () => {
    let streakoid: StreakoidFactory;
    let user: User;
    let soloStreak: SoloStreak;
    const streakName = 'Daily Spanish';
    const streakDescription = 'Everyday I must do 30 minutes of Spanish';

    beforeEach(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase('create-activity-feed-items');
            user = await getPayingUser();
            streakoid = await streakoidTest();
            soloStreak = await streakoid.soloStreaks.create({
                userId: user._id,
                streakName,
                streakDescription,
            });
        }
    });

    afterEach(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`activity feed item event can be created`, async () => {
        expect.assertions(2);
        const activityFeedItem = await streakoid.activityFeedItems.create({
            activityFeedItemType: ActivityFeedItemTypes.lostSoloStreak,
            soloStreakId: soloStreak._id,
            soloStreakName: soloStreak.streakName,
            userId: user._id,
            userProfileImage: user.profileImages.originalImageUrl,
            username: user.username,
            numberOfDaysLost: 10,
        });

        expect(activityFeedItem.activityFeedItemType).toEqual(ActivityFeedItemTypes.lostSoloStreak);
        expect(Object.keys(activityFeedItem).sort()).toEqual(
            [
                '_id',
                'activityFeedItemType',
                'soloStreakId',
                'soloStreakName',
                'userId',
                'username',
                'userProfileImage',
                'numberOfDaysLost',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });
});
