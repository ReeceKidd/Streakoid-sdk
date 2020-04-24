import { AxiosInstance } from 'axios';

import ApiVersions from './ApiVersions';
import StreakStatus from '@streakoid/streakoid-models/lib/Types/StreakStatus';
import { PopulatedTeamStreak } from '@streakoid/streakoid-models/lib/Models/PopulatedTeamStreak';
import RouterCategories from '@streakoid/streakoid-models/lib/Types/RouterCategories';
import { CurrentStreak } from '@streakoid/streakoid-models/lib/Models/CurrentStreak';
import { PastStreak } from '@streakoid/streakoid-models/lib/Models/PastStreak';
import { TeamStreak } from '@streakoid/streakoid-models/lib/Models/TeamStreak';
import { teamMembers } from './teamMembers';

export enum GetAllTeamStreaksSortFields {
    currentStreak = 'currentStreak',
}

const teamStreaks = (streakoidClient: AxiosInstance) => {
    const getAll = async ({
        creatorId,
        memberId,
        timezone,
        status,
        completedToday,
        active,
        sortField,
    }: {
        creatorId?: string;
        memberId?: string;
        timezone?: string;
        status?: StreakStatus;
        completedToday?: boolean;
        active?: boolean;
        sortField?: GetAllTeamStreaksSortFields;
    }): Promise<PopulatedTeamStreak[]> => {
        try {
            let getAllteamStreaksURL = `/${ApiVersions.v1}/${RouterCategories.teamStreaks}?`;
            if (creatorId) {
                getAllteamStreaksURL = `${getAllteamStreaksURL}creatorId=${creatorId}&`;
            }
            if (memberId) {
                getAllteamStreaksURL = `${getAllteamStreaksURL}memberId=${memberId}&`;
            }
            if (timezone) {
                getAllteamStreaksURL = `${getAllteamStreaksURL}timezone=${timezone}&`;
            }
            if (status) {
                getAllteamStreaksURL = `${getAllteamStreaksURL}status=${status}&`;
            }
            if (completedToday !== undefined) {
                getAllteamStreaksURL = `${getAllteamStreaksURL}completedToday=${Boolean(completedToday)}&`;
            }
            if (active !== undefined) {
                getAllteamStreaksURL = `${getAllteamStreaksURL}active=${Boolean(active)}&`;
            }
            if (sortField) {
                getAllteamStreaksURL = `${getAllteamStreaksURL}sortField=${sortField}&`;
            }
            const { data } = await streakoidClient.get(getAllteamStreaksURL);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const getOne = async (teamStreakId: string): Promise<PopulatedTeamStreak> => {
        try {
            const { data } = await streakoidClient.get(
                `/${ApiVersions.v1}/${RouterCategories.teamStreaks}/${teamStreakId}`,
            );
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const create = async ({
        creatorId,
        streakName,
        streakDescription,
        numberOfMinutes,
        members,
    }: {
        creatorId: string;
        streakName: string;
        members: { memberId: string; teamMemberStreakId?: string }[];
        streakDescription?: string;
        numberOfMinutes?: number;
    }): Promise<PopulatedTeamStreak> => {
        try {
            const { data } = await streakoidClient.post(`/${ApiVersions.v1}/${RouterCategories.teamStreaks}`, {
                creatorId,
                streakName,
                streakDescription,
                numberOfMinutes,
                members,
            });
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const update = async ({
        teamStreakId,
        updateData,
    }: {
        teamStreakId: string;
        updateData: {
            creatorId?: string;
            streakName?: string;
            streakDescription?: string;
            numberOfMinutes?: number;
            timezone?: string;
            status?: StreakStatus;
            currentStreak?: CurrentStreak;
            pastStreaks?: PastStreak[];
            completedToday?: boolean;
            active?: boolean;
        };
    }): Promise<TeamStreak> => {
        try {
            const { data } = await streakoidClient.patch(
                `/${ApiVersions.v1}/${RouterCategories.teamStreaks}/${teamStreakId}`,
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
        teamMembers: teamMembers(streakoidClient),
    };
};

export { teamStreaks };
