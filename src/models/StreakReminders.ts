import StreakReminderTypes from '../StreakReminderTypes';

export type StreakReminderType = CustomStreakReminder | CompleteAllStreaksReminder;

export type CustomStreakReminder = CustomSoloStreakReminder | CustomChallengeStreakReminder | CustomTeamStreakReminder;

export interface StreakReminder {
    enabled: boolean;
    expoId: string;
}

export interface CustomSoloStreakReminder extends StreakReminder {
    streakReminderType: StreakReminderTypes.customSoloStreakReminder;
    soloStreakId: string;
    soloStreakName: string;
    reminderHour: number;
    reminderMinute: number;
}

export interface CustomChallengeStreakReminder extends StreakReminder {
    streakReminderType: StreakReminderTypes.customChallengeStreakReminder;
    challengeStreakId: string;
    challengeId: string;
    challengeName: string;
    reminderHour: number;
    reminderMinute: number;
}

export interface CustomTeamStreakReminder extends StreakReminder {
    streakReminderType: StreakReminderTypes.customTeamStreakReminder;
    teamStreakId: string;
    teamStreakName: string;
    reminderHour: number;
    reminderMinute: number;
}

export interface CompleteAllStreaksReminder extends StreakReminder {
    streakReminderType: StreakReminderTypes.completeAllStreaksReminder;
    reminderHour: number;
    reminderMinute: number;
}
