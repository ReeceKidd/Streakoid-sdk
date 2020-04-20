import ProfileImages from './ProfileImages';
import PastSubscription from './PastSubscription';
import UserTypes from '../userTypes';
import Friend from './Friend';
import { UserPushNotifications } from '..';

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
    stripe: {
        customer: string;
        subscription: string;
    };
    profileImages: ProfileImages;
    pushNotificationToken: string;
    pushNotifications: UserPushNotifications;
    hasCompletedIntroduction: boolean;
    createdAt: string;
    updatedAt: string;
}

export default User;
