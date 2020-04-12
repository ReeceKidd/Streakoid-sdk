interface Notifications {
    completeStreaksReminder: {
        emailNotification: boolean;
        pushNotification: boolean;
        reminderHour: number;
        reminderMinute: number;
    };
    teamStreakUpdates: {
        emailNotification: boolean;
        pushNotification: boolean;
    };
    newFollowerUpdates: {
        emailNotification: boolean;
        pushNotification: boolean;
    };
    badgeUpdates: {
        emailNotification: boolean;
        pushNotification: boolean;
    };
}

export default Notifications;
