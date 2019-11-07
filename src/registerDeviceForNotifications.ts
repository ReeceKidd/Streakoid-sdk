import { AxiosInstance } from 'axios';

import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';

const registerDeviceForNotifications = (streakoidClient: AxiosInstance) => {
    const create = async ({
        token,
        userId,
        platform,
    }: {
        token: string;
        userId: string;
        platform: string;
    }): Promise<void> => {
        try {
            const { data } = await streakoidClient.post(
                `/${ApiVersions.v1}/${RouterCategories.registerDeviceForNotifications}`,
                {
                    token,
                    userId,
                    platform,
                },
            );
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        create,
    };
};

export { registerDeviceForNotifications };
