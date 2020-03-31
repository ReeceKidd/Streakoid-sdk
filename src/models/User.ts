import BasicUser from './BasicUser';
import ProfileImages from './ProfileImages';
import PastSubscription from './PastSubscription';
import UserTypes from '../userTypes';
import Notifications from './Notifications';
import Friend from './Friend';

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
    followers: BasicUser[];
    following: BasicUser[];
    friends: Friend[];
    notifications: Notifications;
    badges: string[];
    stripe: {
        customer: string;
        subscription: string;
    };
    profileImages: ProfileImages;
    pushNotificationToken: string;
    hasCompletedIntroduction: boolean;
    createdAt: string;
    updatedAt: string;
}

export default User;
