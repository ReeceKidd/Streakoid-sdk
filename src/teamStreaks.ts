/* eslint-disable @typescript-eslint/explicit-function-return-type */
import StreakStatus from '@streakoid/streakoid-models/lib/Types/StreakStatus';
import RouterCategories from '@streakoid/streakoid-models/lib/Types/RouterCategories';
import { CurrentStreak } from '@streakoid/streakoid-models/lib/Models/CurrentStreak';
import { PastStreak } from '@streakoid/streakoid-models/lib/Models/PastStreak';
import ApiVersions from './ApiVersions';
import { teamMembers } from './teamMembers';
import { PopulatedTeamStreak } from '@streakoid/streakoid-models/lib/Models/PopulatedTeamStreak';
import { GetRequest, PostRequest, PatchRequest, DeleteRequest } from './request';
import TeamStreakRouterCategories from '@streakoid/streakoid-models/lib/Types/TeamStreakRouterCategories';
import TeamVisibilityTypes from '@streakoid/streakoid-models/lib/Types/TeamVisibilityTypes';

export enum GetAllTeamStreaksSortFields {
    currentStreak = 'currentStreak',
    longestTeamStreak = 'longestTeamStreak',
}

const teamStreaks = ({
    getRequest,
    postRequest,
    patchRequest,
    deleteRequest,
}: {
    getRequest: GetRequest;
    postRequest: PostRequest;
    patchRequest: PatchRequest;
    deleteRequest: DeleteRequest;
}) => {
    const getAll = async ({
        creatorId,
        memberId,
        timezone,
        status,
        completedToday,
        active,
        sortField,
        limit,
    }: {
        creatorId?: string;
        memberId?: string;
        timezone?: string;
        status?: StreakStatus;
        completedToday?: boolean;
        active?: boolean;
        sortField?: GetAllTeamStreaksSortFields;
        limit?: number;
    }): Promise<PopulatedTeamStreak[]> => {
        try {
            let getAllTeamStreaksURL = `/${ApiVersions.v1}/${RouterCategories.teamStreaks}?`;
            if (creatorId) {
                getAllTeamStreaksURL = `${getAllTeamStreaksURL}creatorId=${creatorId}&`;
            }
            if (memberId) {
                getAllTeamStreaksURL = `${getAllTeamStreaksURL}memberId=${memberId}&`;
            }
            if (timezone) {
                getAllTeamStreaksURL = `${getAllTeamStreaksURL}timezone=${timezone}&`;
            }
            if (status) {
                getAllTeamStreaksURL = `${getAllTeamStreaksURL}status=${status}&`;
            }
            if (completedToday !== undefined) {
                getAllTeamStreaksURL = `${getAllTeamStreaksURL}completedToday=${Boolean(completedToday)}&`;
            }
            if (active !== undefined) {
                getAllTeamStreaksURL = `${getAllTeamStreaksURL}active=${Boolean(active)}&`;
            }
            if (sortField) {
                getAllTeamStreaksURL = `${getAllTeamStreaksURL}sortField=${sortField}&`;
            }
            if (limit) {
                getAllTeamStreaksURL = `${getAllTeamStreaksURL}limit=${limit}&`;
            }

            return getRequest({ route: getAllTeamStreaksURL });
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const getOne = async (teamStreakId: string): Promise<PopulatedTeamStreak> => {
        try {
            return getRequest({ route: `/${ApiVersions.v1}/${RouterCategories.teamStreaks}/${teamStreakId}` });
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
        visibility,
    }: {
        creatorId: string;
        streakName: string;
        members: { memberId: string; teamMemberStreakId?: string }[];
        streakDescription?: string;
        numberOfMinutes?: number;
        visibility?: TeamVisibilityTypes;
    }): Promise<PopulatedTeamStreak> => {
        try {
            return postRequest({
                route: `/${ApiVersions.v1}/${RouterCategories.teamStreaks}`,
                params: {
                    creatorId,
                    streakName,
                    streakDescription,
                    numberOfMinutes,
                    members,
                    visibility,
                },
            });
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
            visibility?: TeamVisibilityTypes;
        };
    }): Promise<PopulatedTeamStreak> => {
        try {
            return patchRequest({
                route: `/${ApiVersions.v1}/${RouterCategories.teamStreaks}/${teamStreakId}`,
                params: updateData,
            });
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const inviteKey = async ({ teamStreakId }: { teamStreakId: string }): Promise<{ inviteKey: string }> => {
        try {
            return getRequest({
                route: `/${ApiVersions.v1}/${RouterCategories.teamStreaks}/${teamStreakId}/${TeamStreakRouterCategories.inviteKey}`,
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
        inviteKey,
        teamMembers: teamMembers({ postRequest, deleteRequest }),
    };
};

export { teamStreaks };
