import { streakoidFactory, streakoidClient } from './streakoid';
import { ActivityFeedItemTypes } from '.';

describe('SDK activityFeedItems', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        const userIds = ['userId', 'friendId'];
        const subjectId = 'subjectId';
        const activityFeedItemType = ActivityFeedItemTypes.createdSoloStreak;
        const limit = 10;
        const skip = 10;

        const query = {
            userIds,
            subjectId,
            activityFeedItemType,
            limit,
            skip,
        };

        test('calls GET with correct URL when no query paramters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.activityFeedItems.getAll({ limit, skip });

            expect(streakoidClient.get).toBeCalledWith(`/v1/activityFeedItems?limit=${limit}&skip=${skip}&`);
        });

        test('calls GET with correct URL when all query paramters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.activityFeedItems.getAll(query);

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/activityFeedItems?limit=${limit}&skip=${skip}&userIds=${encodeURIComponent(
                    JSON.stringify(userIds),
                )}&subjectId=${subjectId}&activityFeedItemType=${activityFeedItemType}&`,
            );
        });
    });
});
