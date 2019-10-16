import { AxiosInstance, AxiosResponse } from 'axios';

import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import TeamMemberStreak from './models/TeamMemberStreak';
import CurrentStreak from './models/CurrentStreak';
import { PastStreak } from '.';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const teamMemberStreaks = (streakoidClient: AxiosInstance) => {
    const getAll = async ({
        userId,
        teamStreakId,
        completedToday,
        timezone,
        active,
    }: {
        userId?: string;
        teamStreakId?: string;
        completedToday?: boolean;
        timezone?: string;
        active?: boolean;
    }): Promise<TeamMemberStreak[]> => {
        try {
            let getAllTeamMemberStreaksURL = `/${ApiVersions.v1}/${RouterCategories.teamMemberStreaks}?`;

            if (userId) {
                getAllTeamMemberStreaksURL = `${getAllTeamMemberStreaksURL}userId=${userId}&`;
            }

            if (teamStreakId) {
                getAllTeamMemberStreaksURL = `${getAllTeamMemberStreaksURL}teamStreakId=${teamStreakId}&`;
            }

            if (completedToday !== undefined) {
                getAllTeamMemberStreaksURL = `${getAllTeamMemberStreaksURL}completedToday=${Boolean(completedToday)}&`;
            }

            if (timezone) {
                getAllTeamMemberStreaksURL = `${getAllTeamMemberStreaksURL}timezone=${timezone}&`;
            }

            if (active !== undefined) {
                getAllTeamMemberStreaksURL = `${getAllTeamMemberStreaksURL}active=${Boolean(active)}`;
            }

            const { data } = await streakoidClient.get(getAllTeamMemberStreaksURL);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const getOne = async (teamMemberStreakId: string): Promise<TeamMemberStreak> => {
        try {
            const { data } = await streakoidClient.get(
                `/${ApiVersions.v1}/${RouterCategories.teamMemberStreaks}/${teamMemberStreakId}`,
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
    }): Promise<TeamMemberStreak> => {
        try {
            const { data } = await streakoidClient.post(`/${ApiVersions.v1}/${RouterCategories.teamMemberStreaks}`, {
                userId,
                teamStreakId,
            });
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const update = async ({
        teamMemberStreakId,
        updateData,
    }: {
        teamMemberStreakId: string;
        updateData?: {
            timezone?: string;
            completedToday?: boolean;
            active?: boolean;
            currentStreak?: CurrentStreak;
            pastStreaks?: PastStreak[];
        };
    }): Promise<TeamMemberStreak> => {
        try {
            const { data } = await streakoidClient.patch(
                `/${ApiVersions.v1}/${RouterCategories.teamMemberStreaks}/${teamMemberStreakId}`,
                updateData,
            );
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const deleteOne = (teamMemberStreakId: string): Promise<AxiosResponse> => {
        try {
            return streakoidClient.delete(
                `/${ApiVersions.v1}/${RouterCategories.teamMemberStreaks}/${teamMemberStreakId}`,
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

export { teamMemberStreaks };
