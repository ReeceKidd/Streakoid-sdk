import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import CompleteTeamStreakTask from './models/CompleteTeamStreakTask';
import { AxiosInstance, AxiosResponse } from 'axios';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const completeTeamStreakTasks = (streakoidClient: AxiosInstance) => {
    const getAll = async ({ teamStreakId }: { teamStreakId?: string }): Promise<CompleteTeamStreakTask[]> => {
        try {
            let getAllURL = `/${ApiVersions.v1}/${RouterCategories.completeTeamStreakTasks}?`;
            if (teamStreakId) {
                getAllURL = `${getAllURL}teamStreakId=${teamStreakId}`;
            }
            const { data } = await streakoidClient.get(getAllURL);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const create = async ({ teamStreakId }: { teamStreakId: string }): Promise<CompleteTeamStreakTask> => {
        try {
            const { data } = await streakoidClient.post(
                `/${ApiVersions.v1}/${RouterCategories.completeTeamStreakTasks}`,
                {
                    teamStreakId,
                },
            );
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const deleteOne = (completeTeamStreakTaskId: string): Promise<AxiosResponse> => {
        try {
            return streakoidClient.delete(
                `/${ApiVersions.v1}/${RouterCategories.completeTeamStreakTasks}/${completeTeamStreakTaskId}`,
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

export { completeTeamStreakTasks };
