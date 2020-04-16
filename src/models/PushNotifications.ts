import PushNotificationTypes from '../PushNotificationTypes';

export type CustomStreakReminder =
    | CustomSoloStreakReminder
    | CustomChallengeStreakReminder
    | CustomTeamMemberStreakReminder;

export interface StreakReminder {
    enabled: boolean;
    expoId: string;
}

export interface CustomSoloStreakReminder extends StreakReminder {
    type: PushNotificationTypes.customSoloStreakReminder;
    soloStreakId: string;
    soloStreakName: string;
    reminderHour: number;
    reminderMinute: number;
}

export interface CustomChallengeStreakReminder extends StreakReminder {
    type: PushNotificationTypes.customChallengeStreakReminder;
    challengeStreakId: string;
    challengeId: string;
    challengeName: string;
    reminderHour: number;
    reminderMinute: number;
}

export interface CustomTeamMemberStreakReminder extends StreakReminder {
    type: PushNotificationTypes.customTeamMemberStreakReminder;
    teamMemberStreakId: string;
    teamStreakId: string;
    teamStreakName: string;
    reminderHour: number;
    reminderMinute: number;
}

export interface CompleteAllStreaksReminder extends StreakReminder {
    reminderHour: number;
    reminderMinute: number;
}