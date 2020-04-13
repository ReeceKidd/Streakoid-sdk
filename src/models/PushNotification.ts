import PushNotificationTypes from '../PushNotificationTypes';
import StreakTypes from '../StreakTypes';

export interface CustomStreakReminder {
    expoId: string;
    type: PushNotificationTypes.customStreakReminder;
    streakId: string;
    streakType: StreakTypes;
    reminderHour: number;
    reminderMinute: number;
}

export interface CompleteAllStreaksReminder {
    expoId: string;
    type: PushNotificationTypes.completeAllStreaksReminder;
    reminderHour: number;
    reminderMinute: number;
}

type PushNotificationType = CustomStreakReminder | CompleteAllStreaksReminder;

export default PushNotificationType;
