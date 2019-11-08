import { AxiosInstance } from 'axios';

import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';

const registerDeviceForNotifications = (streakoidClient: AxiosInstance) => {
    const create = async ({
        pushNotificationToken,
        userId,
        platform,
    }: {
        pushNotificationToken: string;
        userId: string;
        platform: string;
    }): Promise<void> => {
        try {
            console.log('Register device for notification');
            console.log(pushNotificationToken, userId, platform);
            const { data } = await streakoidClient.post(
                `/${ApiVersions.v1}/${RouterCategories.registerDeviceForNotifications}`,
                {
                    pushNotificationToken,
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
