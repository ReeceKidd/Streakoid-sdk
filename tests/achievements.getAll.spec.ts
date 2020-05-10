import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { getPayingUser } from './setup/getPayingUser';
import AchievementTypes from '@streakoid/streakoid-models/lib/Types/AchievementTypes';

jest.setTimeout(120000);

describe('GET /achievements', () => {
    let streakoid: StreakoidFactory;

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            await getPayingUser();
            streakoid = await streakoidTest();
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`gets all achievements without query paramter`, async () => {
        expect.assertions(4);

        const name = '100 Day Solo Streak';
        const description = 'Get a 100 Day Solo Streak';
        await streakoid.achievements.create({
            achievementType: AchievementTypes.oneHundredDaySoloStreak,
            name,
            description,
        });

        const achievements = await streakoid.achievements.getAll({});
        const achievement = achievements[0];

        if (achievement) expect(achievement.achievementType).toEqual(AchievementTypes.oneHundredDaySoloStreak);
        expect(achievement.name).toEqual(name);
        expect(achievement.description).toEqual(description);
        expect(Object.keys(achievement).sort()).toEqual(
            ['_id', 'name', 'description', 'achievementType', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`gets all achievements with query paramter`, async () => {
        expect.assertions(4);

        const name = '100 Day Solo Streak';
        const description = 'Get a 100 Day Solo Streak';
        await streakoid.achievements.create({
            achievementType: AchievementTypes.oneHundredDaySoloStreak,
            name,
            description,
        });

        const achievements = await streakoid.achievements.getAll({
            achievementType: AchievementTypes.oneHundredDaySoloStreak,
        });
        const achievement = achievements[0];

        expect(achievement.achievementType).toEqual(AchievementTypes.oneHundredDaySoloStreak);
        expect(achievement.name).toEqual(name);
        expect(achievement.description).toEqual(description);
        expect(Object.keys(achievement).sort()).toEqual(
            ['_id', 'name', 'description', 'achievementType', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });
});
