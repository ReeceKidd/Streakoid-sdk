import PushNotificationTypes from '../PushNotificationTypes';

export type PushNotificationType =
    | CustomStreakReminderPushNotification
    | CompleteAllStreaksReminderPushNotification
    | CompletedTeamStreakUpdatePushNotification
    | IncompletedTeamStreakUpdatePushNotification
    | AddedNoteToTeamStreakPushNotification
    | NewFollowerPushNotification;

export type CustomStreakReminderPushNotification =
    | CustomSoloStreakReminderPushNotification
    | CustomChallengeStreakReminderPushNotification
    | CustomTeamStreakReminderPushNotification;

export interface CustomSoloStreakReminderPushNotification {
    pushNotificationType: PushNotificationTypes.customSoloStreakReminder;
    soloStreakId: string;
    soloStreakName: string;
    reminderHour: number;
    reminderMinute: number;
}

export interface CustomChallengeStreakReminderPushNotification {
    pushNotificationType: PushNotificationTypes.customChallengeStreakReminder;
    challengeStreakId: string;
    challengeId: string;
    challengeName: string;
    reminderHour: number;
    reminderMinute: number;
}

export interface CustomTeamStreakReminderPushNotification {
    pushNotificationType: PushNotificationTypes.customTeamStreakReminder;
    teamStreakId: string;
    teamStreakName: string;
    reminderHour: number;
    reminderMinute: number;
}

export interface CompleteAllStreaksReminderPushNotification {
    pushNotificationType: PushNotificationTypes.completeAllStreaksReminder;
}

export interface CompletedTeamStreakUpdatePushNotification {
    pushNotificationType: PushNotificationTypes.completedTeamStreakUpdate;
    teamStreakId: string;
    teamStreakName: string;
}

export interface IncompletedTeamStreakUpdatePushNotification {
    pushNotificationType: PushNotificationTypes.incompletedTeamStreakUpdate;
    teamStreakId: string;
    teamStreakName: string;
}

export interface AddedNoteToTeamStreakPushNotification {
    pushNotificationType: PushNotificationTypes.addedNoteToTeamStreak;
    userId: string;
    username: string;
    teamStreakId: string;
    teamStreakName: string;
    note: string;
}

export interface NewFollowerPushNotification {
    pushNotificationType: PushNotificationTypes.newFollower;
    followerId: string;
    followerUsername: string;
}
