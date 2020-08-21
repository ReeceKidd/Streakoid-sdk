import { SoloStreak } from '@streakoid/streakoid-models/lib/Models/SoloStreak';
import StreakStatus from '@streakoid/streakoid-models/lib/Types/StreakStatus';

import RouterCategories from '@streakoid/streakoid-models/lib/Types/RouterCategories';
import ApiVersions from './ApiVersions';
import { GetRequest, PostRequest, PatchRequest } from './request';
import { CurrentStreak } from '@streakoid/streakoid-models/lib/Models/CurrentStreak';
import { PastStreak } from '@streakoid/streakoid-models/lib/Models/PastStreak';
import IndividualVisibilityTypes from '@streakoid/streakoid-models/lib/Types/IndividualVisibilityTypes';

export enum GetAllSoloStreaksSortFields {
    currentStreak = 'currentStreak',
    longestSoloStreak = 'longestSoloStreak',
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const soloStreaks = ({
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
        completedToday,
        timezone,
        active,
        status,
        sortField,
        limit,
    }: {
        userId?: string;
        timezone?: string;
        status?: StreakStatus;
        active?: boolean;
        completedToday?: boolean;
        sortField?: GetAllSoloStreaksSortFields;
        limit?: number;
    }): Promise<SoloStreak[]> => {
        try {
            let getAllSoloStreaksURL = `/${ApiVersions.v1}/${RouterCategories.soloStreaks}?`;

            if (userId) {
                getAllSoloStreaksURL = `${getAllSoloStreaksURL}userId=${userId}&`;
            }

            if (timezone) {
                getAllSoloStreaksURL = `${getAllSoloStreaksURL}timezone=${timezone}&`;
            }

            if (status) {
                getAllSoloStreaksURL = `${getAllSoloStreaksURL}status=${status}&`;
            }

            if (completedToday !== undefined) {
                getAllSoloStreaksURL = `${getAllSoloStreaksURL}completedToday=${Boolean(completedToday)}&`;
            }

            if (active !== undefined) {
                getAllSoloStreaksURL = `${getAllSoloStreaksURL}active=${Boolean(active)}&`;
            }

            if (sortField) {
                getAllSoloStreaksURL = `${getAllSoloStreaksURL}sortField=${sortField}&`;
            }

            if (limit) {
                getAllSoloStreaksURL = `${getAllSoloStreaksURL}limit=${limit}&`;
            }

            return getRequest({ route: getAllSoloStreaksURL });
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const getOne = async (soloStreakId: string): Promise<SoloStreak> => {
        try {
            return getRequest({ route: `/${ApiVersions.v1}/${RouterCategories.soloStreaks}/${soloStreakId}` });
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const create = async ({
        userId,
        streakName,
        streakDescription,
        numberOfMinutes,
        visibility,
    }: {
        userId: string;
        streakName: string;
        streakDescription?: string;
        numberOfMinutes?: number;
        visibility?: IndividualVisibilityTypes;
    }): Promise<SoloStreak> => {
        try {
            return postRequest({
                route: `/${ApiVersions.v1}/${RouterCategories.soloStreaks}`,
                params: { userId, streakName, streakDescription, numberOfMinutes, visibility },
            });
        } catch (err) {
            return Promise.reject(err);
        }
    };
    const update = async ({
        soloStreakId,
        updateData,
    }: {
        soloStreakId: string;
        updateData?: {
            streakName?: string;
            streakDescription?: string;
            status?: StreakStatus;
            numberOfMinutes?: number;
            completedToday?: boolean;
            timezone?: string;
            active?: boolean;
            currentStreak?: CurrentStreak;
            pastStreaks?: PastStreak[];
            userDefinedIndex?: number;
            visibility?: IndividualVisibilityTypes;
        };
    }): Promise<SoloStreak> => {
        try {
            return patchRequest({
                route: `/${ApiVersions.v1}/${RouterCategories.soloStreaks}/${soloStreakId}`,
                params: updateData,
            });
        } catch (err) {
            return Promise.reject(err);
        }
    };
    const recover = async ({ soloStreakId }: { soloStreakId: string }): Promise<SoloStreak> => {
        try {
            return patchRequest({
                route: `/${ApiVersions.v1}/${RouterCategories.soloStreaks}/${soloStreakId}/recover`,
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

export { soloStreaks };
