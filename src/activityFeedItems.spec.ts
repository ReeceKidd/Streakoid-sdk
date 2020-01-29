import { streakoidFactory, streakoidClient } from './streakoid';
import { ActivityFeedItemTypes } from '.';

describe('SDK activityFeedItems', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        const userId = 'userId';
        const streakId = 'streakId';
        const challengeId = 'challengeId';
        const activityFeedItemType = ActivityFeedItemTypes.createdSoloStreak;

        const query = {
            userId,
            streakId,
            challengeId,
            activityFeedItemType,
        };

        test('calls GET with correct URL when no query paramters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.activityFeedItems.getAll({});

            expect(streakoidClient.get).toBeCalledWith(`/v1/activityFeedItems?`);
        });

        test('calls GET with correct URL when all query paramters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.activityFeedItems.getAll(query);

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/activityFeedItems?userId=${userId}&streakId=${streakId}&challengeId=${challengeId}&activityFeedItemType=${activityFeedItemType}&`,
            );
        });
    });
});
