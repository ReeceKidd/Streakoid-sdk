import { streakoidFactory, streakoidClient } from './streakoid';
import { ActivityFeedItemTypes } from '.';

describe('SDK activityFeedItems', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        const userIds = ['userId', 'followerId'];
        const subjectId = 'subjectId';
        const activityFeedItemType = ActivityFeedItemTypes.createdSoloStreak;
        const limit = 10;
        const createdAtBefore = new Date();

        const query = {
            userIds,
            subjectId,
            activityFeedItemType,
            limit,
            createdAtBefore,
        };

        test('calls GET with correct URL when no query paramters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue({ headers: {} });

            await streakoid.activityFeedItems.getAll({ limit });

            expect(streakoidClient.get).toBeCalledWith(`/v1/activity-feed-items?limit=${limit}&`);
        });

        test('calls GET with correct URL when all query paramters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue({ headers: {} });

            await streakoid.activityFeedItems.getAll(query);

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/activity-feed-items?limit=${limit}&createdAtBefore=${createdAtBefore.toISOString()}&userIds=${encodeURIComponent(
                    JSON.stringify(userIds),
                )}&subjectId=${subjectId}&activityFeedItemType=${activityFeedItemType}&`,
            );
        });
    });
    describe('create', () => {
        test('calls POST with all available parmaters', async () => {
            expect.assertions(1);

            streakoidClient.post = jest.fn().mockResolvedValue(true);
            const activityFeedItemType = ActivityFeedItemTypes.lostSoloStreak;
            const userId = 'userId';
            const subjectId = 'soloStreakId';

            await streakoid.activityFeedItems.create({ activityFeedItemType, userId, subjectId });

            expect(streakoidClient.post).toBeCalledWith(`/v1/activity-feed-items`, {
                activityFeedItemType,
                userId,
                subjectId,
            });
        });

        test('calls POST with minimum required paramaters', async () => {
            expect.assertions(1);

            streakoidClient.post = jest.fn().mockResolvedValue(true);
            const activityFeedItemType = ActivityFeedItemTypes.lostSoloStreak;

            await streakoid.activityFeedItems.create({ activityFeedItemType });

            expect(streakoidClient.post).toBeCalledWith(`/v1/activity-feed-items`, {
                activityFeedItemType,
            });
        });
    });
});
