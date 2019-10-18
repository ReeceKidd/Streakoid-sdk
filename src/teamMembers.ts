import { AxiosInstance, AxiosResponse } from 'axios';

import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';

import TeamMember from './models/TeamMember';
import TeamStreakRouterCategories from './TeamStreakRouterCategories';

export interface TeamMembers {
    create: ({ friendId, teamStreakId }: { friendId: string; teamStreakId: string }) => Promise<TeamMember[]>;
    deleteOne: ({ teamStreakId, memberId }: { teamStreakId: string; memberId: string }) => Promise<AxiosResponse>;
}

const teamMembers = (streakoidClient: AxiosInstance): TeamMembers => {
    const create = async ({
        friendId,
        teamStreakId,
    }: {
        friendId: string;
        teamStreakId: string;
    }): Promise<TeamMember[]> => {
        try {
            const { data } = await streakoidClient.post(
                `/${ApiVersions.v1}/${RouterCategories.teamStreaks}/${teamStreakId}/${TeamStreakRouterCategories.members}`,
                { friendId },
            );
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const deleteOne = ({
        teamStreakId,
        memberId,
    }: {
        teamStreakId: string;
        memberId: string;
    }): Promise<AxiosResponse> => {
        try {
            return streakoidClient.delete(
                `/${ApiVersions.v1}/${RouterCategories.teamStreaks}/${teamStreakId}/${TeamStreakRouterCategories.members}/${memberId}`,
            );
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        create,
        deleteOne,
    };
};

export { teamMembers };
