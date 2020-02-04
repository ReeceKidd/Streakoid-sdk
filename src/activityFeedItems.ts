import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import { AxiosInstance } from 'axios';
import { ActivityFeedItem } from '.';
import ActivityFeedItemTypes from './ActivityFeedItemTypes';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const activityFeedItems = (streakoidClient: AxiosInstance) => {
    const getAll = async ({
        userIds,
        subjectId,
        activityFeedItemType,
        limit,
        skip,
    }: {
        userIds?: string[];
        subjectId?: string;
        activityFeedItemType?: ActivityFeedItemTypes;
        limit?: number;
        skip?: number;
    }): Promise<ActivityFeedItem[]> => {
        try {
            let getAllactivityFeedItemsURL = `/${ApiVersions.v1}/${RouterCategories.activityFeedItems}?`;

            if (userIds) {
                getAllactivityFeedItemsURL = `${getAllactivityFeedItemsURL}userIds=${encodeURIComponent(
                    JSON.stringify(userIds),
                )}&`;
            }

            if (subjectId) {
                getAllactivityFeedItemsURL = `${getAllactivityFeedItemsURL}subjectId=${subjectId}&`;
            }

            if (activityFeedItemType) {
                getAllactivityFeedItemsURL = `${getAllactivityFeedItemsURL}activityFeedItemType=${activityFeedItemType}&`;
            }

            if (limit) {
                getAllactivityFeedItemsURL = `${getAllactivityFeedItemsURL}limit=${Number(limit)}&`;
            }

            if (skip) {
                getAllactivityFeedItemsURL = `${getAllactivityFeedItemsURL}skip=${Number(skip)}&`;
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
