import ProfileImages from './ProfileImages';
import PastSubscription from './PastSubscription';
import UserTypes from '../userTypes';

interface CurrentUser {
    _id: string;
    username: string;
    membershipInformation: {
        isPayingMember: boolean;
        pastMemberships: PastSubscription[];
        currentMembershipStartDate: Date | null;
    };
    email: string;
    userType: UserTypes;
    timezone: string;
    notifications: {
        completeSoloStreaksReminder: {
            emailNotification: boolean;
            pushNotification: boolean;
            reminderTime: string;
        };
    };
    profileImages: ProfileImages;
    pushNotificationToken: string;
    createdAt: string;
    updatedAt: string;
}

export default CurrentUser;
