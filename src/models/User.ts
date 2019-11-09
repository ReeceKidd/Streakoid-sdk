import Friend from './Friend';
import ProfileImages from './ProfileImages';
import PastSubscription from './PastSubscription';
import UserTypes from '../userTypes';

interface User {
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
    friends: Friend[];
    notifications: {
        completeSoloStreaksReminder: {
            emailNotification: boolean;
            pushNotification: boolean;
            reminderTime: string;
        };
    };
    stripe: {
        customer: string;
        subscription: string;
    };
    profileImages: ProfileImages;
    pushNotificationToken: string;
    createdAt: string;
    updatedAt: string;
}

export default User;
