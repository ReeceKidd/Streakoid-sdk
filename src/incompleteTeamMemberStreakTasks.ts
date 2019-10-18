import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import IncompleteTeamMemberStreakTask from './models/IncompleteTeamMemberStreakTask';
import { AxiosInstance } from 'axios';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const incompleteTeamMemberStreakTasks = (streakoidClient: AxiosInstance) => {
    const getAll = async ({
        userId,
        teamMemberStreakId,
        teamStreakId,
    }: {
        userId?: string;
        teamMemberStreakId?: string;
        teamStreakId?: string;
    }): Promise<IncompleteTeamMemberStreakTask[]> => {
        try {
            let getAllURL = `/${ApiVersions.v1}/${RouterCategories.incompleteTeamMemberStreakTasks}?`;
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
    }): Promise<IncompleteTeamMemberStreakTask> => {
        try {
            const { data } = await streakoidClient.post(
                `/${ApiVersions.v1}/${RouterCategories.incompleteTeamMemberStreakTasks}`,
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

export { incompleteTeamMemberStreakTasks };
