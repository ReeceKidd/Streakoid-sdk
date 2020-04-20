import { CustomStreakReminder, CompleteAllStreaksReminder } from './StreakReminders';

interface UserPushNotifications {
    teamStreakUpdates: {
        enabled: boolean;
    };
    newFollowerUpdates: {
        enabled: boolean;
    };
    customStreakReminders: CustomStreakReminder[];
    completeAllStreaksReminder?: CompleteAllStreaksReminder;
}

export default UserPushNotifications;
