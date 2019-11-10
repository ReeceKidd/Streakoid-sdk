interface Notifications {
    completeSoloStreaksReminder: {
        emailNotification: boolean;
        pushNotification: boolean;
        reminderTime: number;
    };
    friendRequest: {
        emailNotification: boolean;
        pushNotification: boolean;
    };
}

export default Notifications;
