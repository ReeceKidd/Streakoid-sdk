import ProfileImages from './ProfileImages';
import PastSubscription from './PastSubscription';
import UserTypes from '../userTypes';
import Friend from './Friend';
import BasicUser from './BasicUser';
import { UserPushNotifications } from '..';
import AchievementType from './Achievements';

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
    following: BasicUser[];
    followers: BasicUser[];
    friends: Friend[];
    achievements: AchievementType[];
    profileImages: ProfileImages;
    pushNotificationToken: string;
    pushNotifications: UserPushNotifications;
    hasCompletedIntroduction: boolean;
    createdAt: string;
    updatedAt: string;
}

export default PopulatedCurrentUser;
