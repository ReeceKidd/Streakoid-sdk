import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import { AxiosInstance } from 'axios';
import Challenge from './models/Challenge';
import PopulatedChallenge from './models/PopulatedChallenge';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const challenges = (streakoidClient: AxiosInstance) => {
    const getAll = async ({ searchQuery, limit }: { searchQuery?: string; limit?: number }): Promise<Challenge[]> => {
        try {
            let getAllChallengesURL = `/${ApiVersions.v1}/${RouterCategories.challenges}?`;

            if (searchQuery) {
                getAllChallengesURL = `${getAllChallengesURL}searchQuery=${searchQuery}&`;
            }

            if (limit) {
                getAllChallengesURL = `${getAllChallengesURL}limit=${limit}&`;
            }

            const { data } = await streakoidClient.get(getAllChallengesURL);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const getOne = async ({ challengeId }: { challengeId: string }): Promise<PopulatedChallenge> => {
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
        numberOfMinutes,
        whatsappGroupLink,
        discordGroupLink,
    }: {
        name: string;
        description: string;
        icon?: string;
        color?: string;
        numberOfMinutes?: number;
        whatsappGroupLink?: string;
        discordGroupLink?: string;
    }): Promise<{ challenge: Challenge }> => {
        try {
            const { data } = await streakoidClient.post(`/${ApiVersions.v1}/${RouterCategories.challenges}`, {
                name,
                description,
                icon,
                color,
                numberOfMinutes,
                whatsappGroupLink,
                discordGroupLink,
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
