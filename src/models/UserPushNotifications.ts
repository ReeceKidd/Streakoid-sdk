import { CompleteAllStreaksReminder, CustomStreakReminder } from './PushNotifications';

interface UserPushNotifications {
    teamStreakUpdates: {
        enabled: boolean;
    };
    newFollowerUpdates: {
        enabled: boolean;
    };
    badgeUpdates: {
        enabled: boolean;
    };
    customStreakReminders: CustomStreakReminder[];
    completeAllStreaksReminder?: CompleteAllStreaksReminder;
}

export default UserPushNotifications;
