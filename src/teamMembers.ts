import { AxiosInstance, AxiosResponse } from 'axios';

import ApiVersions from './ApiVersions';

import { TeamMember } from '@streakoid/streakoid-models/lib/Models/TeamMember';
import RouterCategories from '@streakoid/streakoid-models/lib/Types/RouterCategories';
import TeamStreakRouterCategories from '@streakoid/streakoid-models/lib/Types/TeamStreakRouterCategories';

const teamMembers = (streakoidClient: AxiosInstance) => {
    const create = async ({
        followerId,
        teamStreakId,
    }: {
        followerId: string;
        teamStreakId: string;
    }): Promise<TeamMember> => {
        try {
            const { data } = await streakoidClient.post(
                `/${ApiVersions.v1}/${RouterCategories.teamStreaks}/${teamStreakId}/${TeamStreakRouterCategories.members}`,
                { followerId },
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
