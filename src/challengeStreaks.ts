/* eslint-disable @typescript-eslint/explicit-function-return-type */
import StreakStatus from '@streakoid/streakoid-models/lib/Types/StreakStatus';
import RouterCategories from '@streakoid/streakoid-models/lib/Types/RouterCategories';
import { ChallengeStreak } from '@streakoid/streakoid-models/lib/Models/ChallengeStreak';
import { GetRequest, PostRequest, PatchRequest } from './request';
import { CurrentStreak } from '@streakoid/streakoid-models/lib/Models/CurrentStreak';
import { PastStreak } from '@streakoid/streakoid-models/lib/Models/PastStreak';
import ApiVersions from './ApiVersions';
import IndividualVisibilityTypes from '@streakoid/streakoid-models/lib/Types/IndividualVisibilityTypes';

export enum GetAllChallengeStreaksSortFields {
    currentStreak = 'currentStreak',
    longestChallengeStreak = 'longestChallengeStreak',
}

const challengeStreaks = ({
    getRequest,
    postRequest,
    patchRequest,
}: {
    getRequest: GetRequest;
    postRequest: PostRequest;
    patchRequest: PatchRequest;
}) => {
    const getAll = async ({
        userId,
        challengeId,
        completedToday,
        timezone,
        active,
        status,
        sortField,
        limit,
    }: {
        userId?: string;
        challengeId?: string;
        timezone?: string;
        status?: StreakStatus;
        active?: boolean;
        completedToday?: boolean;
        sortField?: GetAllChallengeStreaksSortFields;
        limit?: number;
    }): Promise<ChallengeStreak[]> => {
        try {
            let getAllChallengeStreaksURL = `/${ApiVersions.v1}/${RouterCategories.challengeStreaks}?`;

            if (userId) {
                getAllChallengeStreaksURL = `${getAllChallengeStreaksURL}userId=${userId}&`;
            }

            if (challengeId) {
                getAllChallengeStreaksURL = `${getAllChallengeStreaksURL}challengeId=${challengeId}&`;
            }

            if (timezone) {
                getAllChallengeStreaksURL = `${getAllChallengeStreaksURL}timezone=${timezone}&`;
            }

            if (status) {
                getAllChallengeStreaksURL = `${getAllChallengeStreaksURL}status=${status}&`;
            }

            if (completedToday !== undefined) {
                getAllChallengeStreaksURL = `${getAllChallengeStreaksURL}completedToday=${Boolean(completedToday)}&`;
            }

            if (active !== undefined) {
                getAllChallengeStreaksURL = `${getAllChallengeStreaksURL}active=${Boolean(active)}&`;
            }

            if (sortField) {
                getAllChallengeStreaksURL = `${getAllChallengeStreaksURL}sortField=${sortField}&`;
            }

            if (limit) {
                getAllChallengeStreaksURL = `${getAllChallengeStreaksURL}limit=${limit}&`;
            }

            return getRequest({ route: getAllChallengeStreaksURL });
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const getOne = async ({ challengeStreakId }: { challengeStreakId: string }): Promise<ChallengeStreak> => {
        try {
            return getRequest({
                route: `/${ApiVersions.v1}/${RouterCategories.challengeStreaks}/${challengeStreakId}`,
            });
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const create = async ({
        userId,
        challengeId,
    }: {
        userId: string;
        challengeId: string;
    }): Promise<ChallengeStreak> => {
        try {
            return postRequest({
                route: `/${ApiVersions.v1}/${RouterCategories.challengeStreaks}`,
                params: { userId, challengeId },
            });
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const update = async ({
        challengeStreakId,
        updateData,
    }: {
        challengeStreakId: string;
        updateData?: {
            status?: StreakStatus;
            completedToday?: boolean;
            timezone?: string;
            active?: boolean;
            currentStreak?: CurrentStreak;
            pastStreaks?: PastStreak[];
            userDefinedIndex?: number;
            visibility?: IndividualVisibilityTypes;
        };
    }): Promise<ChallengeStreak> => {
        try {
            return patchRequest({
                route: `/${ApiVersions.v1}/${RouterCategories.challengeStreaks}/${challengeStreakId}`,
                params: { ...updateData },
            });
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const recover = async ({ challengeStreakId }: { challengeStreakId: string }): Promise<ChallengeStreak> => {
        try {
            return postRequest({
                route: `/${ApiVersions.v1}/${RouterCategories.challengeStreaks}/${challengeStreakId}/recover`,
                params: {},
            });
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        getAll,
        getOne,
        create,
        update,
        recover,
    };
};

export { challengeStreaks };
