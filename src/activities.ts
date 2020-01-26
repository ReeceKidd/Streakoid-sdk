import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import { AxiosInstance } from 'axios';
import { Activity } from '.';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const activities = (streakoidClient: AxiosInstance) => {
    const getAll = async ({ userId, streakId }: { userId?: string; streakId?: string }): Promise<Activity[]> => {
        try {
            let getAllActivitiesURL = `/${ApiVersions.v1}/${RouterCategories.activities}?`;

            if (userId) {
                getAllActivitiesURL = `${getAllActivitiesURL}userId=${userId}&`;
            }

            if (streakId) {
                getAllActivitiesURL = `${getAllActivitiesURL}streakId=${streakId}&`;
            }

            const { data } = await streakoidClient.get(getAllActivitiesURL);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        getAll,
    };
};

export { activities };
