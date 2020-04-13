import PushNotificationTypes from '../PushNotificationTypes';
import StreakTypes from '../StreakTypes';

export interface CustomStreakReminder {
    enabled: boolean;
    expoId: string;
    type: PushNotificationTypes.customStreakReminder;
    streakId: string;
    streakType: StreakTypes;
    reminderHour: number;
    reminderMinute: number;
}

export interface CompleteAllStreaksReminder {
    enabled: boolean;
    expoId?: string;
    type?: PushNotificationTypes.completeAllStreaksReminder;
    reminderHour?: number;
    reminderMinute?: number;
}

interface PushNotifications {
    customStreakReminders: CustomStreakReminder[];
    completeStreaksReminder: {
        enabled: boolean;
    };
    teamStreakUpdates: {
        enabled: boolean;
    };
    newFollowerUpdates: {
        enabled: boolean;
    };
    badgeUpdates: {
        enabled: boolean;
    };
    completeAllStreaksReminder: CompleteAllStreaksReminder;
}

export default PushNotifications;
