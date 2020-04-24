import ApiVersions from './ApiVersions';
import { IncompleteSoloStreakTask } from '@streakoid/streakoid-models/lib/Models/IncompleteSoloStreakTask';
import { AxiosInstance } from 'axios';
import RouterCategories from '@streakoid/streakoid-models/lib/Types/RouterCategories';

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

    return {
        getAll,
        create,
    };
};

export { incompleteSoloStreakTasks };
