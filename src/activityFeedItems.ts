import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import { AxiosInstance } from 'axios';
import { ActivityFeedItem } from '.';
import ActivityFeedItemTypes from './ActivityFeedItemTypes';

export interface GetAllActivityFeedItemsResponse {
    activityFeedItems: ActivityFeedItem[];
    totalCountOfActivityFeedItems: number;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const activityFeedItems = (streakoidClient: AxiosInstance) => {
    const getAll = async ({
        limit,
        createdOnBefore,
        userIds,
        subjectId,
        activityFeedItemType,
    }: {
        limit: number;
        createdOnBefore?: Date;
        userIds?: string[];
        subjectId?: string;
        activityFeedItemType?: ActivityFeedItemTypes;
    }): Promise<GetAllActivityFeedItemsResponse> => {
        try {
            let getAllactivityFeedItemsURL = `/${ApiVersions.v1}/${RouterCategories.activityFeedItems}?limit=${Number(
                limit,
            )}&`;

            if (createdOnBefore) {
                getAllactivityFeedItemsURL = `${getAllactivityFeedItemsURL}createdOnBefore=${createdOnBefore}&`;
            }

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
