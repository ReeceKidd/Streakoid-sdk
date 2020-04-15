import PushNotificationTypes from '../PushNotificationTypes';

export type CustomStreakReminder =
    | CustomSoloStreakReminder
    | CustomChallengeStreakReminder
    | CustomTeamMemberStreakReminder;

export interface CustomSoloStreakReminder {
    enabled: boolean;
    expoId: string;
    type: PushNotificationTypes.customSoloStreakReminder;
    soloStreakId: string;
    soloStreakName: string;
    reminderHour: number;
    reminderMinute: number;
}

export interface CustomChallengeStreakReminder {
    enabled: boolean;
    expoId: string;
    type: PushNotificationTypes.customChallengeStreakReminder;
    challengeStreakId: string;
    challengeId: string;
    challengeName: string;
    reminderHour: number;
    reminderMinute: number;
}

export interface CustomTeamMemberStreakReminder {
    enabled: boolean;
    expoId: string;
    type: PushNotificationTypes.customTeamMemberStreakReminder;
    teamMemberStreakId: string;
    teamStreakId: string;
    teamStreakName: string;
    reminderHour: number;
    reminderMinute: number;
}

export interface CompleteAllStreaksReminder {
    enabled: boolean;
    type: PushNotificationTypes.completeAllStreaksReminder;
    reminderHour: number;
    reminderMinute: number;
    expoId: string;
}
