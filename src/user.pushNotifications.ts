import { AxiosInstance } from 'axios';

import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import UserPushNotifications from './models/UserPushNotifications';

const pushNotifications = (streakoidClient: AxiosInstance) => {
    const updatePushNotifications = async ({
        updateData,
    }: {
        updateData?: UserPushNotifications;
    }): Promise<UserPushNotifications> => {
        try {
            const { data } = await streakoidClient.patch(
                `/${ApiVersions.v1}/${RouterCategories.user}/push-notifications`,
                updateData,
            );
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        updatePushNotifications,
    };
};

export { pushNotifications };
