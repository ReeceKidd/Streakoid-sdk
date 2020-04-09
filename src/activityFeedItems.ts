import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import { AxiosInstance } from 'axios';
import { ActivityFeedItem } from '.';
import ActivityFeedItemTypes from './ActivityFeedItemTypes';
import SupportedResponseHeaders from './SupportedResponseHeaders';

export interface GetAllActivityFeedItemsResponse {
    activityFeedItems: ActivityFeedItem[];
    totalCountOfActivityFeedItems: number;
}

export const DEFAULT_ACTIVITY_FEED_LIMIT = 10;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const activityFeedItems = (streakoidClient: AxiosInstance) => {
    const getAll = async ({
        limit = DEFAULT_ACTIVITY_FEED_LIMIT,
        createdAtBefore,
        userIds,
        subjectId,
        activityFeedItemType,
    }: {
        limit?: number;
        createdAtBefore?: Date;
        userIds?: string[];
        subjectId?: string;
        activityFeedItemType?: ActivityFeedItemTypes;
    }): Promise<GetAllActivityFeedItemsResponse> => {
        try {
            let getAllactivityFeedItemsURL = `/${ApiVersions.v1}/${RouterCategories.activityFeedItems}?limit=${Number(
                limit,
            )}&`;

            if (createdAtBefore) {
                getAllactivityFeedItemsURL = `${getAllactivityFeedItemsURL}createdAtBefore=${createdAtBefore.toISOString()}&`;
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

            const response = await streakoidClient.get(getAllactivityFeedItemsURL);
            return {
                activityFeedItems: response.data,
                totalCountOfActivityFeedItems: Number(response.headers[SupportedResponseHeaders.TotalCount]),
            };
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const create = async ({
        activityFeedItemType,
        userId,
        subjectId,
    }: {
        activityFeedItemType: ActivityFeedItemTypes;
        userId?: string;
        subjectId?: string;
    }): Promise<ActivityFeedItem> => {
        try {
            const { data } = await streakoidClient.post(`/${ApiVersions.v1}/${RouterCategories.activityFeedItems}`, {
                activityFeedItemType,
                userId,
                subjectId,
            });
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

export { activityFeedItems };
