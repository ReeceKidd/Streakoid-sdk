import { AxiosInstance, AxiosResponse } from 'axios';
import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import CompleteTeamMemberStreakTask from './models/CompleteTeamMemberStreakTask';
import StreakTypes from './StreakTypes';

export interface CompleteTeamMemberStreakTaskReturnType {
    getAll: ({
        userId,
        teamMemberStreakId,
        streakType,
        teamStreakId,
    }: {
        userId?: string;
        teamMemberStreakId?: string;
        streakType?: StreakTypes.teamMember;
        teamStreakId?: string;
    }) => Promise<CompleteTeamMemberStreakTask[]>;
    create: ({
        userId,
        teamMemberStreakId,
        streakType,
        teamStreakId,
    }: {
        userId: string;
        teamMemberStreakId: string;
        streakType: StreakTypes.teamMember;
        teamStreakId: string;
    }) => Promise<CompleteTeamMemberStreakTask>;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const completeTeamMemberStreakTasks = (streakoidClient: AxiosInstance) => {
    const getAll = async ({
        userId,
        teamMemberStreakId,
        streakType,
        teamStreakId,
    }: {
        userId?: string;
        teamMemberStreakId?: string;
        streakType?: StreakTypes.teamMember;
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
            if (streakType) {
                getAllURL = `${getAllURL}streakType=${streakType}&`;
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
        streakType,
        teamStreakId,
    }: {
        userId: string;
        teamMemberStreakId: string;
        streakType: StreakTypes.teamMember;
        teamStreakId: string;
    }): Promise<CompleteTeamMemberStreakTask> => {
        try {
            const { data } = await streakoidClient.post(
                `/${ApiVersions.v1}/${RouterCategories.completeTeamMemberStreakTasks}`,
                {
                    userId,
                    teamMemberStreakId,
                    streakType,
                    teamStreakId,
                },
            );
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const deleteOne = (completeTeamMemberStreakTaskId: string): Promise<AxiosResponse> => {
        try {
            return streakoidClient.delete(
                `/${ApiVersions.v1}/${RouterCategories.completeTeamMemberStreakTasks}/${completeTeamMemberStreakTaskId}`,
            );
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        getAll,
        create,
        deleteOne,
    };
};

export { completeTeamMemberStreakTasks };
