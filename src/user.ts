import { AxiosInstance } from 'axios';

import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import CurrentUser from './models/CurrentUser';

const user = (streakoidClient: AxiosInstance) => {
    const getCurrentUser = async (): Promise<CurrentUser> => {
        try {
            const { data } = await streakoidClient.get(`/${ApiVersions.v1}/${RouterCategories.user}`);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const create = async ({ username, email }: { username: string; email: string }): Promise<CurrentUser> => {
        try {
            const response = await streakoidClient.post(`/${ApiVersions.v1}/${RouterCategories.user}`, {
                username,
                email,
            });
            return response.data;
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
                completeSoloStreaksReminder: {
                    emailNotification: boolean;
                    pushNotification: boolean;
                    reminderTime: string;
                };
                friendRequest: {
                    emailNotification: boolean;
                    pushNotification: boolean;
                };
            };
            timezone?: string;
            pushNotificationToken?: string;
        };
    }): Promise<CurrentUser> => {
        try {
            const { data } = await streakoidClient.patch(`/${ApiVersions.v1}/${RouterCategories.user}`, updateData);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        getCurrentUser,
        create,
        updateCurrentUser,
    };
};

export { user };
