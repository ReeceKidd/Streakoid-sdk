import { AxiosInstance } from 'axios';

import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import User from './models/User';

const user = (streakoidClient: AxiosInstance) => {
    const getCurrentUser = async (): Promise<User> => {
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
            notifications?: {
                completeSoloStreaksReminder?: {
                    emailNotification: boolean;
                    pushNotification: boolean;
                    reminderTime: string;
                };
            };
            timezone?: string;
            pushNotificationToken?: string;
        };
    }): Promise<User> => {
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
    };
};

export { user };
