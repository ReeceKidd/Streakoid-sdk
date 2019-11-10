interface Notifications {
    completeSoloStreaksReminder: {
        emailNotification: boolean;
        pushNotification: boolean;
        reminderTime: string;
    };
    friendRequest: {
        emailNotification: boolean;
        pushNotification: boolean;
    };
}

export default Notifications;
