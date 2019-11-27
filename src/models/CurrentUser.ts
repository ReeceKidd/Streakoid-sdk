import ProfileImages from './ProfileImages';
import PastSubscription from './PastSubscription';
import UserTypes from '../userTypes';
import Notifications from './Notifications';

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
    badges: string[];
    notifications: Notifications;
    profileImages: ProfileImages;
    pushNotificationToken: string;
    createdAt: string;
    updatedAt: string;
}

export default CurrentUser;
