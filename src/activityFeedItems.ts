import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import { AxiosInstance } from 'axios';
import { ActivityFeedItem } from '.';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const activityFeedItems = (streakoidClient: AxiosInstance) => {
    const getAll = async ({
        userId,
        streakId,
    }: {
        userId?: string;
        streakId?: string;
    }): Promise<ActivityFeedItem[]> => {
        try {
            let getAllactivityFeedItemsURL = `/${ApiVersions.v1}/${RouterCategories.activityFeedItems}?`;

            if (userId) {
                getAllactivityFeedItemsURL = `${getAllactivityFeedItemsURL}userId=${userId}&`;
            }

            if (streakId) {
                getAllactivityFeedItemsURL = `${getAllactivityFeedItemsURL}streakId=${streakId}&`;
            }

            const { data } = await streakoidClient.get(getAllactivityFeedItemsURL);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        getAll,
    };
};

export { activityFeedItems };
