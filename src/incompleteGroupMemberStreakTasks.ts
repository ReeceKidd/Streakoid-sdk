import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import IncompleteGroupMemberStreakTask from './models/IncompleteGroupMemberStreakTask';
import { AxiosInstance, AxiosResponse } from 'axios';
import StreakTypes from './StreakTypes';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (streakoidClient: AxiosInstance) => {
    const getAll = async ({
        userId,
        groupMemberStreakId,
        streakType,
        teamStreakId,
    }: {
        userId?: string;
        groupMemberStreakId?: string;
        streakType?: StreakTypes;
        teamStreakId?: string;
    }): Promise<IncompleteGroupMemberStreakTask[]> => {
        try {
            let getAllURL = `/${ApiVersions.v1}/${RouterCategories.incompleteGroupMemberStreakTasks}?`;
            if (userId) {
                getAllURL = `${getAllURL}userId=${userId}&`;
            }
            if (groupMemberStreakId) {
                getAllURL = `${getAllURL}groupMemberStreakId=${groupMemberStreakId}&`;
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
        groupMemberStreakId,
        streakType,
        teamStreakId,
    }: {
        userId: string;
        groupMemberStreakId: string;
        streakType: StreakTypes;
        teamStreakId: string;
    }): Promise<IncompleteGroupMemberStreakTask> => {
        try {
            const { data } = await streakoidClient.post(
                `/${ApiVersions.v1}/${RouterCategories.incompleteGroupMemberStreakTasks}`,
                {
                    userId,
                    groupMemberStreakId,
                    streakType,
                    teamStreakId,
                },
            );
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const deleteOne = (IncompleteGroupMemberStreakTaskId: string): Promise<AxiosResponse> => {
        try {
            return streakoidClient.delete(
                `/${ApiVersions.v1}/${RouterCategories.incompleteGroupMemberStreakTasks}/${IncompleteGroupMemberStreakTaskId}`,
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
