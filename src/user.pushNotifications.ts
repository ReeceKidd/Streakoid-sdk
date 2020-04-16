import { AxiosInstance } from 'axios';

import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import UserPushNotifications from './models/UserPushNotifications';
import { CompleteAllStreaksReminder, CustomStreakReminder } from './models/PushNotifications';

const pushNotifications = (streakoidClient: AxiosInstance) => {
    const updatePushNotifications = async ({
        completeAllStreaksReminder,
        customStreakReminders,
        teamStreakUpdates,
        newFollowerUpdates,
        badgeUpdates,
    }: {
        completeAllStreaksReminder?: CompleteAllStreaksReminder;
        customStreakReminders?: CustomStreakReminder[];
        teamStreakUpdates?: { enabled: boolean };
        newFollowerUpdates?: { enabled: boolean };
        badgeUpdates?: { enabled: boolean };
    }): Promise<UserPushNotifications> => {
        try {
            const updateData = {
                completeAllStreaksReminder,
                customStreakReminders,
                teamStreakUpdates,
                newFollowerUpdates,
                badgeUpdates,
            };
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
