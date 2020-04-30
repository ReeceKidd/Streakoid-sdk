import { streakoidFactory, streakoidClient } from './streakoid';
import ActivityFeedItemTypes from '@streakoid/streakoid-models/lib/Types/ActivityFeedItemTypes';
import { LostSoloStreakActivityFeedItem } from '@streakoid/streakoid-models/lib/Models/ActivityFeedItemType';
describe('SDK activityFeedItems', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        const userIds = ['userId', 'followerId'];
        const soloStreakId = 'subjectId';
        const challengeStreakId = 'challengeStreakId';
        const challengeId = 'challengeId';
        const teamStreakId = 'teamStreakId';
        const activityFeedItemType = ActivityFeedItemTypes.createdSoloStreak;
        const limit = 10;
        const createdAtBefore = new Date();

        const query = {
            userIds,
            soloStreakId,
            challengeStreakId,
            challengeId,
            teamStreakId,
            activityFeedItemType,
            limit,
            createdAtBefore,
        };

        test('calls GET with correct URL when no query parameters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue({ headers: {} });

            await streakoid.activityFeedItems.getAll({ limit });

            expect(streakoidClient.get).toBeCalledWith(`/v1/activity-feed-items?limit=${limit}&`);
        });

        test('calls GET with correct URL when all query parameters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue({ headers: {} });

            await streakoid.activityFeedItems.getAll(query);

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/activity-feed-items?limit=${limit}&createdAtBefore=${createdAtBefore.toISOString()}&userIds=${encodeURIComponent(
                    JSON.stringify(userIds),
                )}&soloStreakId=${soloStreakId}&challengeStreakId=${challengeStreakId}&challengeId=${challengeId}&teamStreakId=${teamStreakId}&activityFeedItemType=${activityFeedItemType}&`,
            );
        });
    });
    describe('create', () => {
        test('calls POST with an ActivityFeedItemType', async () => {
            expect.assertions(1);

            streakoidClient.post = jest.fn().mockResolvedValue(true);
            const activityFeedItem: LostSoloStreakActivityFeedItem = {
                activityFeedItemType: ActivityFeedItemTypes.lostSoloStreak,
                userId: 'userId',
                username: 'username',
                userProfileImage: 'google.com/image',
                soloStreakId: 'soloStreakId',
                soloStreakName: 'Reading',
                numberOfDaysLost: 1,
            };

            await streakoid.activityFeedItems.create(activityFeedItem);

            expect(streakoidClient.post).toBeCalledWith(`/v1/activity-feed-items`, {
                ...activityFeedItem,
            });
        });
    });
});
