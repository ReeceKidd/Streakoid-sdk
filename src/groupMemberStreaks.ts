import { AxiosInstance, AxiosResponse } from 'axios';

import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import GroupMemberStreak from './models/GroupMemberStreak';
import CurrentStreak from './models/CurrentStreak';
import { PastStreak } from '.';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const groupMemberStreaks = (streakoidClient: AxiosInstance) => {
    const getAll = async ({
        userId,
        completedToday,
        timezone,
        active,
    }: {
        userId?: string;
        completedToday?: boolean;
        timezone?: string;
        active?: boolean;
    }): Promise<GroupMemberStreak[]> => {
        try {
            let getAllGroupMemberStreaksURL = `/${ApiVersions.v1}/${RouterCategories.groupMemberStreaks}?`;

            if (userId) {
                getAllGroupMemberStreaksURL = `${getAllGroupMemberStreaksURL}userId=${userId}&`;
            }

            if (completedToday !== undefined) {
                getAllGroupMemberStreaksURL = `${getAllGroupMemberStreaksURL}completedToday=${Boolean(
                    completedToday,
                )}&`;
            }

            if (timezone) {
                getAllGroupMemberStreaksURL = `${getAllGroupMemberStreaksURL}timezone=${timezone}&`;
            }

            if (active !== undefined) {
                getAllGroupMemberStreaksURL = `${getAllGroupMemberStreaksURL}active=${Boolean(active)}`;
            }

            const { data } = await streakoidClient.get(getAllGroupMemberStreaksURL);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const getOne = async (groupMemberStreakId: string): Promise<GroupMemberStreak> => {
        try {
            const { data } = await streakoidClient.get(
                `/${ApiVersions.v1}/${RouterCategories.groupMemberStreaks}/${groupMemberStreakId}`,
            );
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const create = async ({
        userId,
        teamStreakId,
    }: {
        userId: string;
        teamStreakId: string;
    }): Promise<GroupMemberStreak> => {
        try {
            const { data } = await streakoidClient.post(`/${ApiVersions.v1}/${RouterCategories.groupMemberStreaks}`, {
                userId,
                teamStreakId,
            });
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const update = async ({
        groupMemberStreakId,
        updateData,
    }: {
        groupMemberStreakId: string;
        updateData?: {
            timezone?: string;
            completedToday?: boolean;
            active?: boolean;
            currentStreak?: CurrentStreak;
            pastStreaks?: PastStreak[];
        };
    }): Promise<GroupMemberStreak> => {
        try {
            const { data } = await streakoidClient.patch(
                `/${ApiVersions.v1}/${RouterCategories.groupMemberStreaks}/${groupMemberStreakId}`,
                updateData,
            );
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const deleteOne = (groupMemberStreakId: string): Promise<AxiosResponse> => {
        try {
            return streakoidClient.delete(
                `/${ApiVersions.v1}/${RouterCategories.groupMemberStreaks}/${groupMemberStreakId}`,
            );
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        getAll,
        getOne,
        create,
        update,
        deleteOne,
    };
};

export { groupMemberStreaks };
