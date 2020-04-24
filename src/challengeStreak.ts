import { AxiosInstance } from 'axios';

import ApiVersions from './ApiVersions';
import StreakStatus from '@streakoid/streakoid-models/lib/Types/StreakStatus';
import RouterCategories from '@streakoid/streakoid-models/lib/Types/RouterCategories';
import { ChallengeStreak } from '@streakoid/streakoid-models/lib/Models/ChallengeStreak';
import { CurrentStreak } from '@streakoid/streakoid-models/lib/Models/CurrentStreak';
import { PastStreak } from '@streakoid/streakoid-models/lib/Models/PastStreak';

export enum GetAllChallengeStreaksSortFields {
    currentStreak = 'currentStreak',
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const challengeStreaks = (streakoidClient: AxiosInstance) => {
    const getAll = async ({
        userId,
        challengeId,
        completedToday,
        timezone,
        active,
        status,
        sortField,
    }: {
        userId?: string;
        challengeId?: string;
        timezone?: string;
        status?: StreakStatus;
        active?: boolean;
        completedToday?: boolean;
        sortField?: GetAllChallengeStreaksSortFields;
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

            const { data } = await streakoidClient.get(getAllChallengeStreaksURL);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const getOne = async ({ challengeStreakId }: { challengeStreakId: string }): Promise<ChallengeStreak> => {
        try {
            const { data } = await streakoidClient.get(
                `/${ApiVersions.v1}/${RouterCategories.challengeStreaks}/${challengeStreakId}`,
            );
            return data;
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
            const { data } = await streakoidClient.post(`/${ApiVersions.v1}/${RouterCategories.challengeStreaks}`, {
                userId,
                challengeId,
            });
            return data;
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
        };
    }): Promise<ChallengeStreak> => {
        try {
            const { data } = await streakoidClient.patch(
                `/${ApiVersions.v1}/${RouterCategories.challengeStreaks}/${challengeStreakId}`,
                updateData,
            );
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        getAll,
        getOne,
        update,
        create,
    };
};

export { challengeStreaks };
