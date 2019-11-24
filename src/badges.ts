import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import { AxiosInstance } from 'axios';
import Badge from './models/Badge';
import BadgeTypes from './BadgeTypes';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const badges = (streakoidClient: AxiosInstance) => {
    const getAll = async ({ name, badgeType }: { name?: string; badgeType?: BadgeTypes }): Promise<Badge[]> => {
        try {
            let getAllBadgesURL = `/${ApiVersions.v1}/${RouterCategories.badges}?`;

            if (name) {
                getAllBadgesURL = `${getAllBadgesURL}name=${name}&`;
            }

            if (badgeType) {
                getAllBadgesURL = `${getAllBadgesURL}badgeType=${badgeType}&`;
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
        badgeType,
        icon,
    }: {
        name: string;
        description: string;
        badgeType: BadgeTypes;
        icon: string;
    }): Promise<Badge> => {
        try {
            const { data } = await streakoidClient.post(`/${ApiVersions.v1}/${RouterCategories.badges}`, {
                name,
                description,
                badgeType,
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
