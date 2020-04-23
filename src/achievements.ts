import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import { AxiosInstance } from 'axios';
import AchievementTypes from './AchievementTypes';
import Achievement from './models/Achievement';
import DatabaseAchievement from './models/DatabaseAchievement';

const achievements = (streakoidClient: AxiosInstance) => {
    const getAll = async ({
        achievementType,
    }: {
        achievementType?: AchievementTypes;
    }): Promise<DatabaseAchievement[]> => {
        try {
            let getAllAchievementsURL = `/${ApiVersions.v1}/${RouterCategories.achievements}?`;

            if (achievementType) {
                getAllAchievementsURL = `${getAllAchievementsURL}achievementType=${achievementType}&`;
            }

            const { data } = await streakoidClient.get(getAllAchievementsURL);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const create = async (achievement: Achievement): Promise<DatabaseAchievement> => {
        try {
            const { data } = await streakoidClient.post(
                `/${ApiVersions.v1}/${RouterCategories.achievements}`,
                achievement,
            );
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        getAll,
        create,
    };
};

export { achievements };
