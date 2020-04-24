import { streakoidFactory, streakoidClient } from './streakoid';
import StreakTypes from '@streakoid/streakoid-models/lib/Types/StreakTypes';
import StreakTrackingEventTypes from '@streakoid/streakoid-models/lib/Types/StreakTrackingEventTypes';

describe('SDK streakTrackingEvents', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        const type = StreakTrackingEventTypes.inactiveStreak;
        const userId = 'userId';
        const streakId = 'streakId';
        const streakType = StreakTypes.team;
        const query = {
            type,
            userId,
            streakId,
            streakType,
        };
        test('calls GET with correct URL when no query paramters are passed', async () => {
            expect.assertions(1);

            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.streakTrackingEvents.getAll({});

            expect(streakoidClient.get).toBeCalledWith(`/v1/streak-tracking-events?`);
        });

        test(`calls GET with correct URL when all query paramaters are passed`, async () => {
            expect.assertions(1);

            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.streakTrackingEvents.getAll(query);

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/streak-tracking-events?type=${type}&userId=${userId}&streakId=${streakId}&streakType=${streakType}&`,
            );
        });

        test('calls GET with correct URL when type query paramater is passed', async () => {
            expect.assertions(1);

            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.streakTrackingEvents.getAll({ type });

            expect(streakoidClient.get).toBeCalledWith(`/v1/streak-tracking-events?type=${type}&`);
        });

        test('calls GET with correct URL when userId query paramater is passed', async () => {
            expect.assertions(1);

            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.streakTrackingEvents.getAll({ userId });

            expect(streakoidClient.get).toBeCalledWith(`/v1/streak-tracking-events?userId=${userId}&`);
        });

        test('calls GET with correct URL when streakId query paramater is passed', async () => {
            expect.assertions(1);

            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.streakTrackingEvents.getAll({ streakId });

            expect(streakoidClient.get).toBeCalledWith(`/v1/streak-tracking-events?streakId=${streakId}&`);
        });

        test('calls GET with correct URL when streakType query paramater is passed', async () => {
            expect.assertions(1);

            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.streakTrackingEvents.getAll({ streakType });

            expect(streakoidClient.get).toBeCalledWith(`/v1/streak-tracking-events?streakType=${streakType}&`);
        });

        test('calls GET with correct URL when streakType query paramater is passed', async () => {
            expect.assertions(1);

            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.streakTrackingEvents.getAll({ streakType });

            expect(streakoidClient.get).toBeCalledWith(`/v1/streak-tracking-events?streakType=${streakType}&`);
        });
    });

    describe('getOne', () => {
        test('calls GET with correct URL', async () => {
            expect.assertions(1);

            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.streakTrackingEvents.getOne('id');

            expect(streakoidClient.get).toBeCalledWith(`/v1/streak-tracking-events/id`);
        });
    });

    describe('create', () => {
        test('calls POST with all available parmaters', async () => {
            expect.assertions(1);

            streakoidClient.post = jest.fn().mockResolvedValue(true);
            const type = StreakTrackingEventTypes.inactiveStreak;
            const streakId = 'streakId';
            const userId = 'userId';
            const streakType = StreakTypes.team;

            await streakoid.streakTrackingEvents.create({ type, streakId, userId, streakType });

            expect(streakoidClient.post).toBeCalledWith(`/v1/streak-tracking-events`, {
                type,
                streakId,
                userId,
                streakType,
            });
        });

        test('calls POST without userId', async () => {
            expect.assertions(1);

            streakoidClient.post = jest.fn().mockResolvedValue(true);
            const type = StreakTrackingEventTypes.inactiveStreak;
            const streakId = 'streakId';
            const streakType = StreakTypes.team;

            await streakoid.streakTrackingEvents.create({ type, streakId, streakType });

            expect(streakoidClient.post).toBeCalledWith(`/v1/streak-tracking-events`, {
                type,
                streakId,
                streakType,
            });
        });
    });
});
