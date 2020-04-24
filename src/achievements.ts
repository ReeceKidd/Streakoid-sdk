import ApiVersions from './ApiVersions';
import RouterCategories from '@streakoid/streakoid-models/lib/Types/RouterCategories';
import AchievementTypes from '@streakoid/streakoid-models/lib/Types/AchievementTypes';
import { DatabaseAchievement } from '@streakoid/streakoid-models/lib/Models/DatabaseAchievement';
import { AchievementType } from '@streakoid/streakoid-models/lib/Models/Achievement';
import { AxiosInstance } from 'axios';

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

    const create = async (achievement: AchievementType): Promise<DatabaseAchievement> => {
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
