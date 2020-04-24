import { AxiosInstance } from 'axios';
import ApiVersions from './ApiVersions';
import { CompleteTeamMemberStreakTask } from '@streakoid/streakoid-models/lib/Models/CompleteTeamMemberStreakTask';
import RouterCategories from '@streakoid/streakoid-models/lib/Types/RouterCategories';

export interface CompleteTeamMemberStreakTaskReturnType {
    getAll: ({
        userId,
        teamMemberStreakId,
        teamStreakId,
    }: {
        userId?: string;
        teamMemberStreakId?: string;
        teamStreakId?: string;
    }) => Promise<CompleteTeamMemberStreakTask[]>;
    create: ({
        userId,
        teamMemberStreakId,
        teamStreakId,
    }: {
        userId: string;
        teamMemberStreakId: string;
        teamStreakId: string;
    }) => Promise<CompleteTeamMemberStreakTask>;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const completeTeamMemberStreakTasks = (streakoidClient: AxiosInstance) => {
    const getAll = async ({
        userId,
        teamMemberStreakId,
        teamStreakId,
    }: {
        userId?: string;
        teamMemberStreakId?: string;
        teamStreakId?: string;
    }): Promise<CompleteTeamMemberStreakTask[]> => {
        try {
            let getAllURL = `/${ApiVersions.v1}/${RouterCategories.completeTeamMemberStreakTasks}?`;
            if (userId) {
                getAllURL = `${getAllURL}userId=${userId}&`;
            }
            if (teamMemberStreakId) {
                getAllURL = `${getAllURL}teamMemberStreakId=${teamMemberStreakId}&`;
            }
            if (teamStreakId) {
                getAllURL = `${getAllURL}teamStreakId=${teamStreakId}&`;
            }

            const { data } = await streakoidClient.get(getAllURL);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const create = async ({
        userId,
        teamMemberStreakId,
        teamStreakId,
    }: {
        userId: string;
        teamMemberStreakId: string;
        teamStreakId: string;
    }): Promise<CompleteTeamMemberStreakTask> => {
        try {
            const { data } = await streakoidClient.post(
                `/${ApiVersions.v1}/${RouterCategories.completeTeamMemberStreakTasks}`,
                {
                    userId,
                    teamMemberStreakId,
                    teamStreakId,
                },
            );
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        getAll,
        create,
    };
};

export { completeTeamMemberStreakTasks };
