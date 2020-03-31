import ProfileImages from './ProfileImages';
import PastSubscription from './PastSubscription';
import UserTypes from '../userTypes';
import Notifications from './Notifications';
import Badge from './Badge';
import { Follower } from '..';
import Friend from './Friend';

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
    following: Follower[];
    followers: Follower[];
    friends: Friend;
    notifications: Notifications;
    profileImages: ProfileImages;
    pushNotificationToken: string;
    hasCompletedIntroduction: boolean;
    createdAt: string;
    updatedAt: string;
}

export default PopulatedCurrentUser;
