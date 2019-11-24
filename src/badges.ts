import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import { AxiosInstance } from 'axios';
import Badge from './models/Badge';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const badges = (streakoidClient: AxiosInstance) => {
    const getAll = async ({ name }: { name?: string }): Promise<Badge[]> => {
        try {
            let getAllBadgesURL = `/${ApiVersions.v1}/${RouterCategories.badges}?`;

            if (name) {
                getAllBadgesURL = `${getAllBadgesURL}name=${name}&`;
            }

            const { data } = await streakoidClient.get(getAllBadgesURL);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };
    const create = async ({
        name,
        description,
        icon,
    }: {
        name: string;
        description: string;
        icon: string;
    }): Promise<Badge> => {
        try {
            const { data } = await streakoidClient.post(`/${ApiVersions.v1}/${RouterCategories.badges}`, {
                name,
                description,
                icon,
            });
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

export { badges };
