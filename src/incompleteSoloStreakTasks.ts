import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import IncompleteSoloStreakTask from './models/IncompleteSoloStreakTask';
import { AxiosInstance, AxiosResponse } from 'axios';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const incompleteSoloStreakTasks = (streakoidClient: AxiosInstance) => {
    const getAll = async ({
        userId,
        streakId,
    }: {
        userId?: string;
        streakId?: string;
    }): Promise<IncompleteSoloStreakTask[]> => {
        try {
            let getAllURL = `/${ApiVersions.v1}/${RouterCategories.incompleteSoloStreakTasks}?`;
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
    }): Promise<IncompleteSoloStreakTask> => {
        try {
            const { data } = await streakoidClient.post(
                `/${ApiVersions.v1}/${RouterCategories.incompleteSoloStreakTasks}`,
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

    const deleteOne = (IncompleteSoloStreakTaskId: string): Promise<AxiosResponse> => {
        try {
            return streakoidClient.delete(
                `/${ApiVersions.v1}/${RouterCategories.incompleteSoloStreakTasks}/${IncompleteSoloStreakTaskId}`,
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

export { incompleteSoloStreakTasks };
