import ProfileImages from './ProfileImages';
import PastSubscription from './PastSubscription';
import UserTypes from '../userTypes';
import Notifications from './Notifications';
import Friend from './Friend';
import { PushNotificationType } from '..';

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
    followers: string[];
    following: string[];
    friends: Friend[];
    notifications: Notifications;
    badges: string[];
    stripe: {
        customer: string;
        subscription: string;
    };
    profileImages: ProfileImages;
    pushNotificationToken: string;
    pushNotifications: PushNotificationType[];
    hasCompletedIntroduction: boolean;
    createdAt: string;
    updatedAt: string;
}

export default User;
