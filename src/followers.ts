import { AxiosInstance } from 'axios';

import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const followers = (streakoidClient: AxiosInstance) => {
    const getAll = async (userId: string): Promise<string[]> => {
        const { data } = await streakoidClient.get(
            `/${ApiVersions.v1}/${RouterCategories.users}/${userId}/${RouterCategories.followers}`,
        );
        return data;
    };

    return {
        getAll,
    };
};

export { followers };
