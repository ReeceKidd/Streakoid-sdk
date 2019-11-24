import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import { AxiosInstance } from 'axios';
import Challenge from './models/Challenge';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const challenges = (streakoidClient: AxiosInstance) => {
    const getAll = async ({ name }: { name?: string }): Promise<Challenge[]> => {
        try {
            let getAllChallengesURL = `/${ApiVersions.v1}/${RouterCategories.challenges}?`;

            if (name) {
                getAllChallengesURL = `${getAllChallengesURL}name=${name}&`;
            }

            const { data } = await streakoidClient.get(getAllChallengesURL);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const getOne = async (challengeId: string): Promise<Challenge> => {
        try {
            const { data } = await streakoidClient.get(
                `/${ApiVersions.v1}/${RouterCategories.challenges}/${challengeId}`,
            );
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const create = async ({
        name,
        description,
        icon,
        color,
        badgeId,
        numberOfMinutes,
        levels,
    }: {
        name: string;
        description: string;
        icon: string;
        color: string;
        badgeId: string;
        levels: { level: number; criteria: string }[];
        numberOfMinutes?: number;
    }): Promise<Challenge> => {
        try {
            const { data } = await streakoidClient.post(`/${ApiVersions.v1}/${RouterCategories.challenges}`, {
                name,
                description,
                icon,
                color,
                badgeId,
                levels,
                numberOfMinutes,
            });
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        getAll,
        getOne,
        create,
    };
};

export { challenges };
