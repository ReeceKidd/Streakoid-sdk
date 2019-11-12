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
    teamUpdates: {
        emailNotification: boolean;
        pushNotification: boolean;
    };
}

export default Notifications;
