import PushNotificationTypes from '../PushNotificationTypes';

export type PushNotificationType =
    | CustomStreakReminderPushNotification
    | CompleteAllStreaksReminderPushNotification
    | CompletedTeamStreakUpdatePushNotification
    | IncompletedTeamStreakUpdatePushNotification
    | AddedNoteToTeamStreakPushNotification
    | NewFollowerPushNotification
    | UnlockedAchievementPushNotification;

export type CustomStreakReminderPushNotification =
    | CustomSoloStreakReminderPushNotification
    | CustomChallengeStreakReminderPushNotification
    | CustomTeamStreakReminderPushNotification;

export interface CustomSoloStreakReminderPushNotification {
    pushNotificationType: PushNotificationTypes.customSoloStreakReminder;
    soloStreakId: string;
    soloStreakName: string;
}

export interface CustomChallengeStreakReminderPushNotification {
    pushNotificationType: PushNotificationTypes.customChallengeStreakReminder;
    challengeStreakId: string;
    challengeName: string;
}

export interface CustomTeamStreakReminderPushNotification {
    pushNotificationType: PushNotificationTypes.customTeamStreakReminder;
    teamStreakId: string;
    teamStreakName: string;
}

export interface CompleteAllStreaksReminderPushNotification {
    pushNotificationType: PushNotificationTypes.completeAllStreaksReminder;
}

export interface CompletedTeamStreakUpdatePushNotification {
    pushNotificationType: PushNotificationTypes.completedTeamStreakUpdate;
    teamStreakId: string;
    teamStreakName: string;
    title: string;
    body: string;
}

export interface IncompletedTeamStreakUpdatePushNotification {
    pushNotificationType: PushNotificationTypes.incompletedTeamStreakUpdate;
    teamStreakId: string;
    teamStreakName: string;
    title: string;
    body: string;
}

export interface AddedNoteToTeamStreakPushNotification {
    pushNotificationType: PushNotificationTypes.addedNoteToTeamStreak;
    userId: string;
    username: string;
    teamStreakId: string;
    teamStreakName: string;
    note: string;
    title: string;
    body: string;
}

export interface NewFollowerPushNotification {
    pushNotificationType: PushNotificationTypes.newFollower;
    followerId: string;
    followerUsername: string;
    title: string;
    body: string;
}

export interface UnlockedAchievementPushNotification {
    pushNotificationType: PushNotificationTypes.unlockedAchievement;
    achievementId: string;
    title: string;
    body: string;
}
