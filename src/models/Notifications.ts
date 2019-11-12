interface Notifications {
    completeStreaksReminder: {
        emailNotification: boolean;
        pushNotification: boolean;
        reminderTime: number;
    };
    friendRequest: {
        emailNotification: boolean;
        pushNotification: boolean;
    };
    teamStreakUpdates: {
        emailNotification: boolean;
        pushNotification: boolean;
    };
}

export default Notifications;
