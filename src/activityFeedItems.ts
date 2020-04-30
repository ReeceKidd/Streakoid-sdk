import ApiVersions from './ApiVersions';
import { AxiosInstance } from 'axios';
import RouterCategories from '@streakoid/streakoid-models/lib/Types/RouterCategories';
import { ActivityFeedItemType } from '@streakoid/streakoid-models/lib/Models/ActivityFeedItemType';
import ActivityFeedItemTypes from '@streakoid/streakoid-models/lib/Types/ActivityFeedItemTypes';
import SupportedResponseHeaders from '@streakoid/streakoid-models/lib/Types/SupportedResponseHeaders';

export interface GetAllActivityFeedItemsResponse {
    activityFeedItems: ActivityFeedItemType[];
    totalCountOfActivityFeedItems: number;
}

export const DEFAULT_ACTIVITY_FEED_LIMIT = 10;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const activityFeedItems = (streakoidClient: AxiosInstance) => {
    const getAll = async ({
        limit = DEFAULT_ACTIVITY_FEED_LIMIT,
        createdAtBefore,
        userIds,
        soloStreakId,
        challengeStreakId,
        challengeId,
        teamStreakId,
        activityFeedItemType,
    }: {
        limit?: number;
        createdAtBefore?: Date;
        userIds?: string[];
        soloStreakId?: string;
        challengeStreakId?: string;
        challengeId?: string;
        teamStreakId?: string;
        activityFeedItemType?: ActivityFeedItemTypes;
    }): Promise<GetAllActivityFeedItemsResponse> => {
        try {
            let getAllActivityFeedItemsURL = `/${ApiVersions.v1}/${RouterCategories.activityFeedItems}?limit=${Number(
                limit,
            )}&`;

            if (createdAtBefore) {
                getAllActivityFeedItemsURL = `${getAllActivityFeedItemsURL}createdAtBefore=${createdAtBefore.toISOString()}&`;
            }

            if (userIds) {
                getAllActivityFeedItemsURL = `${getAllActivityFeedItemsURL}userIds=${encodeURIComponent(
                    JSON.stringify(userIds),
                )}&`;
            }

            if (soloStreakId) {
                getAllActivityFeedItemsURL = `${getAllActivityFeedItemsURL}soloStreakId=${soloStreakId}&`;
            }

            if (challengeStreakId) {
                getAllActivityFeedItemsURL = `${getAllActivityFeedItemsURL}challengeStreakId=${challengeStreakId}&`;
            }

            if (challengeId) {
                getAllActivityFeedItemsURL = `${getAllActivityFeedItemsURL}challengeId=${challengeId}&`;
            }

            if (teamStreakId) {
                getAllActivityFeedItemsURL = `${getAllActivityFeedItemsURL}teamStreakId=${teamStreakId}&`;
            }

            if (activityFeedItemType) {
                getAllActivityFeedItemsURL = `${getAllActivityFeedItemsURL}activityFeedItemType=${activityFeedItemType}&`;
            }

            const response = await streakoidClient.get(getAllActivityFeedItemsURL);
            return {
                activityFeedItems: response.data,
                totalCountOfActivityFeedItems: Number(response.headers[SupportedResponseHeaders.TotalCount]),
            };
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const create = async (activityFeedItem: ActivityFeedItemType): Promise<ActivityFeedItemType> => {
        try {
            const { data } = await streakoidClient.post(
                `/${ApiVersions.v1}/${RouterCategories.activityFeedItems}`,
                activityFeedItem,
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

export { activityFeedItems };
