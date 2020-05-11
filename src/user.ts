import { AxiosInstance } from 'axios';

import ApiVersions from './ApiVersions';
import { pushNotifications } from './user.pushNotifications';
import { PopulatedCurrentUser } from '@streakoid/streakoid-models/lib/Models/PopulatedCurrentUser';
import RouterCategories from '@streakoid/streakoid-models/lib/Types/RouterCategories';
import PushNotificationSupportedDeviceTypes from '@streakoid/streakoid-models/lib/Types/PushNotificationSupportedDeviceTypes';

const user = (streakoidClient: AxiosInstance) => {
    const getCurrentUser = async (): Promise<PopulatedCurrentUser> => {
        try {
            const { data } = await streakoidClient.get(`/${ApiVersions.v1}/${RouterCategories.user}`);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const updateCurrentUser = async ({
        updateData,
    }: {
        updateData?: {
            email?: string;
            timezone?: string;
            pushNotification?: {
                pushNotificationToken: string;
                deviceType: PushNotificationSupportedDeviceTypes;
            };
            hasCompletedIntroduction?: boolean;
        };
    }): Promise<PopulatedCurrentUser> => {
        try {
            const { data } = await streakoidClient.patch(`/${ApiVersions.v1}/${RouterCategories.user}`, updateData);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        getCurrentUser,
        updateCurrentUser,
        pushNotifications: pushNotifications(streakoidClient),
    };
};

export { user };
