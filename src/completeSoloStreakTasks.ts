import ApiVersions from './ApiVersions';
import { AxiosInstance } from 'axios';
import { CompleteSoloStreakTask } from '@streakoid/streakoid-models/lib/Models/CompleteSoloStreakTask';
import RouterCategories from '@streakoid/streakoid-models/lib/Types/RouterCategories';

export interface CompleteSoloStreakTasksReturnType {
    getAll: ({ userId, streakId }: { userId?: string; streakId?: string }) => Promise<CompleteSoloStreakTask[]>;
    create: ({ userId, soloStreakId }: { userId: string; soloStreakId: string }) => Promise<CompleteSoloStreakTask>;
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

    return {
        getAll,
        create,
    };
};

export { completeSoloStreakTasks };
