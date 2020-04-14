import { CompleteAllStreaksReminder } from './PushNotifications';

interface UserPushNotifications {
    teamStreakUpdates: {
        enabled: boolean;
    };
    newFollowerUpdates: {
        enabled: boolean;
    };
    badgeUpdates: {
        enabled: boolean;
    };
    completeAllStreaksReminder?: CompleteAllStreaksReminder;
}

export default UserPushNotifications;
