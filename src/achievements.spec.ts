import { streakoidFactory, streakoidClient } from './streakoid';
import AchievementTypes from '@streakoid/streakoid-models/lib/Types/AchievementTypes';
import { OneHundredDaySoloStreakAchievement } from '@streakoid/streakoid-models/lib/Models/Achievement';

describe('SDK achievements', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        const achievementType = AchievementTypes.oneHundredDaySoloStreak;

        const query = {
            achievementType,
        };

        test('calls GET with correct URL when no query parameters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue({ headers: {} });

            await streakoid.achievements.getAll({});

            expect(streakoidClient.get).toBeCalledWith(`/v1/achievements?`);
        });

        test('calls GET with correct URL when all query parameters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue({ headers: {} });

            await streakoid.achievements.getAll(query);

            expect(streakoidClient.get).toBeCalledWith(`/v1/achievements?achievementType=${achievementType}&`);
        });
    });
    describe('create', () => {
        test('calls POST with an ActivityFeedItemType', async () => {
            expect.assertions(1);

            streakoidClient.post = jest.fn().mockResolvedValue(true);
            const achievement: OneHundredDaySoloStreakAchievement = {
                achievementType: AchievementTypes.oneHundredDaySoloStreak,
                name: '100 Day Solo Streak',
                description: '100 Days',
            };

            await streakoid.achievements.create(achievement);

            expect(streakoidClient.post).toBeCalledWith(`/v1/achievements`, {
                ...achievement,
            });
        });
    });
});
