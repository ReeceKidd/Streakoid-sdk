import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import { AxiosInstance } from 'axios';
import { ActivityFeedItem } from '.';
import ActivityFeedItemTypes from './ActivityFeedItemTypes';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const activityFeedItems = (streakoidClient: AxiosInstance) => {
    const getAll = async ({
        userId,
        subjectId,
        activityFeedItemType,
    }: {
        userId?: string;
        subjectId?: string;
        activityFeedItemType?: ActivityFeedItemTypes;
    }): Promise<ActivityFeedItem[]> => {
        try {
            let getAllactivityFeedItemsURL = `/${ApiVersions.v1}/${RouterCategories.activityFeedItems}?`;

            if (userId) {
                getAllactivityFeedItemsURL = `${getAllactivityFeedItemsURL}userId=${userId}&`;
            }

            if (subjectId) {
                getAllactivityFeedItemsURL = `${getAllactivityFeedItemsURL}subjectId=${subjectId}&`;
            }

            if (activityFeedItemType) {
                getAllactivityFeedItemsURL = `${getAllactivityFeedItemsURL}activityFeedItemType=${activityFeedItemType}&`;
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
