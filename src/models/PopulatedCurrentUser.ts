import ProfileImages from './ProfileImages';
import PastSubscription from './PastSubscription';
import UserTypes from '../userTypes';
import Notifications from './Notifications';
import Badge from './Badge';
import { Friend } from '..';

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
    friends: Friend[];
    notifications: Notifications;
    profileImages: ProfileImages;
    pushNotificationToken: string;
    hasCompletedIntroduction: boolean;
    createdAt: string;
    updatedAt: string;
}

export default PopulatedCurrentUser;
