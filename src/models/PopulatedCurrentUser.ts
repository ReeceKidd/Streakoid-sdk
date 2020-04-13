import ProfileImages from './ProfileImages';
import PastSubscription from './PastSubscription';
import UserTypes from '../userTypes';
import Badge from './Badge';
import Friend from './Friend';
import BasicUser from './BasicUser';
import { PushNotifications } from '..';

interface PopulatedCurrentUser {
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
    badges: Badge[];
    following: BasicUser[];
    followers: BasicUser[];
    friends: Friend[];
    profileImages: ProfileImages;
    pushNotificationToken: string;
    pushNotifications: PushNotifications;
    hasCompletedIntroduction: boolean;
    createdAt: string;
    updatedAt: string;
}

export default PopulatedCurrentUser;
