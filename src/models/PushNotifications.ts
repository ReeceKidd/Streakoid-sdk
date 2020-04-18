import PushNotificationTypes from '../PushNotificationTypes';

export type PushNotificationType = CustomStreakReminder | CompleteAllStreaksReminder;

export type CustomStreakReminder = CustomSoloStreakReminder | CustomChallengeStreakReminder | CustomTeamStreakReminder;

export interface StreakReminder {
    enabled: boolean;
    expoId: string;
}

export interface CustomSoloStreakReminder extends StreakReminder {
    pushNotificationType: PushNotificationTypes.customSoloStreakReminder;
    soloStreakId: string;
    soloStreakName: string;
    reminderHour: number;
    reminderMinute: number;
}

export interface CustomChallengeStreakReminder extends StreakReminder {
    pushNotificationType: PushNotificationTypes.customChallengeStreakReminder;
    challengeStreakId: string;
    challengeId: string;
    challengeName: string;
    reminderHour: number;
    reminderMinute: number;
}

export interface CustomTeamStreakReminder extends StreakReminder {
    pushNotificationType: PushNotificationTypes.customTeamStreakReminder;
    teamStreakId: string;
    teamStreakName: string;
    reminderHour: number;
    reminderMinute: number;
}

export interface CompleteAllStreaksReminder extends StreakReminder {
    pushNotificationType: PushNotificationTypes.completeAllStreaksReminder;
    reminderHour: number;
    reminderMinute: number;
}
