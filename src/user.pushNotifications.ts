import { AxiosInstance } from 'axios';

import ApiVersions from './ApiVersions';
import {
    CompleteAllStreaksReminder,
    CustomStreakReminder,
} from '@streakoid/streakoid-models/lib/Models/StreakReminders';
import { UserPushNotifications } from '@streakoid/streakoid-models/lib/Models/UserPushNotifications';
import RouterCategories from '@streakoid/streakoid-models/lib/Types/RouterCategories';

const pushNotifications = (streakoidClient: AxiosInstance) => {
    const updatePushNotifications = async ({
        completeAllStreaksReminder,
        customStreakReminders,
        teamStreakUpdates,
        newFollowerUpdates,
        achievementUpdates,
    }: {
        completeAllStreaksReminder?: CompleteAllStreaksReminder;
        customStreakReminders?: CustomStreakReminder[];
        teamStreakUpdates?: { enabled: boolean };
        newFollowerUpdates?: { enabled: boolean };
        achievementUpdates?: { enabled: boolean };
    }): Promise<UserPushNotifications> => {
        try {
            const updateData = {
                completeAllStreaksReminder,
                customStreakReminders,
                teamStreakUpdates,
                newFollowerUpdates,
                achievementUpdates,
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
