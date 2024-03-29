import { TeamMemberStreak } from '@streakoid/streakoid-models/lib/Models/TeamMemberStreak';
import RouterCategories from '@streakoid/streakoid-models/lib/Types/RouterCategories';
import { CurrentStreak } from '@streakoid/streakoid-models/lib/Models/CurrentStreak';
import { PastStreak } from '@streakoid/streakoid-models/lib/Models/PastStreak';
import ApiVersions from './ApiVersions';
import { GetRequest, PostRequest, PatchRequest } from './request';
import TeamVisibilityTypes from '@streakoid/streakoid-models/lib/Types/TeamVisibilityTypes';
import StreakStatus from '@streakoid/streakoid-models/lib/Types/StreakStatus';

export enum GetAllTeamMemberStreaksSortFields {
    currentStreak = 'currentStreak',
    longestTeamMemberStreak = 'longestTeamMemberStreak',
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const teamMemberStreaks = ({
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
        teamStreakId,
        completedToday,
        timezone,
        active,
        sortField,
        limit,
        status,
    }: {
        userId?: string;
        teamStreakId?: string;
        completedToday?: boolean;
        timezone?: string;
        active?: boolean;
        sortField?: GetAllTeamMemberStreaksSortFields;
        limit?: number;
        status?: StreakStatus;
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
                getAllTeamMemberStreaksURL = `${getAllTeamMemberStreaksURL}active=${Boolean(active)}&`;
            }
            if (sortField) {
                getAllTeamMemberStreaksURL = `${getAllTeamMemberStreaksURL}sortField=${sortField}&`;
            }
            if (limit) {
                getAllTeamMemberStreaksURL = `${getAllTeamMemberStreaksURL}limit=${limit}&`;
            }
            if (status) {
                getAllTeamMemberStreaksURL = `${getAllTeamMemberStreaksURL}status=${status}&`;
            }

            return getRequest({ route: getAllTeamMemberStreaksURL });
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const getOne = async (teamMemberStreakId: string): Promise<TeamMemberStreak> => {
        try {
            return getRequest({
                route: `/${ApiVersions.v1}/${RouterCategories.teamMemberStreaks}/${teamMemberStreakId}`,
            });
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
            return postRequest({
                route: `/${ApiVersions.v1}/${RouterCategories.teamMemberStreaks}`,
                params: { userId, teamStreakId },
            });
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
            visibility?: TeamVisibilityTypes;
        };
    }): Promise<TeamMemberStreak> => {
        try {
            return patchRequest({
                route: `/${ApiVersions.v1}/${RouterCategories.teamMemberStreaks}/${teamMemberStreakId}`,
                params: updateData,
            });
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const recover = async ({ teamMemberStreakId }: { teamMemberStreakId: string }): Promise<TeamMemberStreak> => {
        try {
            return postRequest({
                route: `/${ApiVersions.v1}/${RouterCategories.teamMemberStreaks}/${teamMemberStreakId}/recover`,
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

export { teamMemberStreaks };
