import PushNotificationTypes from '../PushNotificationTypes';

export type PushNotificationType = CustomSoloStreakReminder & CompleteAllStreaksReminder;

export type CustomStreakReminder =
    | CustomSoloStreakReminder
    | CustomChallengeStreakReminder
    | CustomTeamMemberStreakReminder;

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

export interface CustomTeamMemberStreakReminder extends StreakReminder {
    pushNotificationType: PushNotificationTypes.customTeamMemberStreakReminder;
    teamMemberStreakId: string;
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
