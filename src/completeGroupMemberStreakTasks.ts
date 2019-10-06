import { AxiosInstance, AxiosResponse } from 'axios';
import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import CompleteGroupMemberStreakTask from './models/CompleteGroupMemberStreakTask';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (streakoidClient: AxiosInstance) => {
    const getAll = async ({
        userId,
        teamStreakId,
        groupMemberStreakId,
    }: {
        userId?: string;
        teamStreakId?: string;
        groupMemberStreakId?: string;
    }): Promise<CompleteGroupMemberStreakTask[]> => {
        try {
            let getAllURL = `/${ApiVersions.v1}/${RouterCategories.completeGroupMemberStreakTasks}?`;
            if (userId) {
                getAllURL = `${getAllURL}userId=${userId}&`;
            }
            if (teamStreakId) {
                getAllURL = `${getAllURL}teamStreakId=${teamStreakId}&`;
            }
            if (groupMemberStreakId) {
                getAllURL = `${getAllURL}groupMemberStreakId=${groupMemberStreakId}`;
            }

            const { data } = await streakoidClient.get(getAllURL);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const create = async ({
        userId,
        teamStreakId,
        groupMemberStreakId,
    }: {
        userId: string;
        teamStreakId: string;
        groupMemberStreakId: string;
    }): Promise<CompleteGroupMemberStreakTask> => {
        try {
            const { data } = await streakoidClient.post(
                `/${ApiVersions.v1}/${RouterCategories.completeGroupMemberStreakTasks}`,
                {
                    userId,
                    teamStreakId,
                    groupMemberStreakId,
                },
            );
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const deleteOne = (completeGroupMemberStreakTaskId: string): Promise<AxiosResponse> => {
        try {
            return streakoidClient.delete(
                `/${ApiVersions.v1}/${RouterCategories.completeGroupMemberStreakTasks}/${completeGroupMemberStreakTaskId}`,
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
