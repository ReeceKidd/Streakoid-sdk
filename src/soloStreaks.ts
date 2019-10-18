import { AxiosInstance } from 'axios';

import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import SoloStreak from './models/SoloStreak';
import CurrentStreak from './models/CurrentStreak';
import StreakStatus from './StreakStatus';
import { PastStreak } from '.';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const soloStreaks = (streakoidClient: AxiosInstance) => {
    const getAll = async ({
        userId,
        completedToday,
        timezone,
        active,
        status,
    }: {
        userId?: string;
        timezone?: string;
        status?: StreakStatus;
        active?: boolean;
        completedToday?: boolean;
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

            const { data } = await streakoidClient.get(getAllSoloStreaksURL);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const getOne = async (soloStreakId: string): Promise<SoloStreak> => {
        try {
            const { data } = await streakoidClient.get(
                `/${ApiVersions.v1}/${RouterCategories.soloStreaks}/${soloStreakId}`,
            );
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const create = async ({
        userId,
        streakName,
        streakDescription,
        numberOfMinutes,
    }: {
        userId: string;
        streakName: string;
        streakDescription?: string;
        numberOfMinutes?: number;
    }): Promise<SoloStreak> => {
        try {
            const { data } = await streakoidClient.post(`/${ApiVersions.v1}/${RouterCategories.soloStreaks}`, {
                userId,
                streakName,
                streakDescription,
                numberOfMinutes,
            });
            return data;
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
        };
    }): Promise<SoloStreak> => {
        try {
            const { data } = await streakoidClient.patch(
                `/${ApiVersions.v1}/${RouterCategories.soloStreaks}/${soloStreakId}`,
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
        create,
        update,
    };
};

export { soloStreaks };
