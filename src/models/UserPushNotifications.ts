import { CompleteAllStreaksReminderPushNotification, CustomStreakReminderPushNotification } from './PushNotifications';

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
    customStreakReminders: CustomStreakReminderPushNotification[];
    completeAllStreaksReminder?: CompleteAllStreaksReminderPushNotification;
}

export default UserPushNotifications;
