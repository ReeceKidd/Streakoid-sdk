import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import CompleteSoloStreakTask from './models/CompleteSoloStreakTask';
import { AxiosInstance, AxiosResponse } from 'axios';

export interface CompleteSoloStreakTasksReturnType {
    getAll: ({ userId, streakId }: { userId?: string; streakId?: string }) => Promise<CompleteSoloStreakTask[]>;
    create: ({ userId, soloStreakId }: { userId: string; soloStreakId: string }) => Promise<CompleteSoloStreakTask>;
    deleteOne: (completeSoloStreakTaskId: string) => Promise<AxiosResponse>;
}

const completeSoloStreakTasks = (streakoidClient: AxiosInstance): CompleteSoloStreakTasksReturnType => {
    const getAll = async ({
        userId,
        streakId,
    }: {
        userId?: string;
        streakId?: string;
    }): Promise<CompleteSoloStreakTask[]> => {
        try {
            let getAllURL = `/${ApiVersions.v1}/${RouterCategories.completeSoloStreakTasks}?`;
            if (userId) {
                getAllURL = `${getAllURL}userId=${userId}&`;
            }
            if (streakId) {
                getAllURL = `${getAllURL}streakId=${streakId}`;
            }
            const { data } = await streakoidClient.get(getAllURL);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const create = async ({
        userId,
        soloStreakId,
    }: {
        userId: string;
        soloStreakId: string;
    }): Promise<CompleteSoloStreakTask> => {
        try {
            const { data } = await streakoidClient.post(
                `/${ApiVersions.v1}/${RouterCategories.completeSoloStreakTasks}`,
                {
                    userId,
                    soloStreakId,
                },
            );
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const deleteOne = (completeSoloStreakTaskId: string): Promise<AxiosResponse> => {
        try {
            return streakoidClient.delete(
                `/${ApiVersions.v1}/${RouterCategories.completeSoloStreakTasks}/${completeSoloStreakTaskId}`,
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

export { completeSoloStreakTasks };
