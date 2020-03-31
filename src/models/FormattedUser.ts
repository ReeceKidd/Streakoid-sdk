import UserTypes from '../userTypes';
import BasicUser from './BasicUser';
import ProfileImages from './ProfileImages';
import Friend from './Friend';

interface FormattedUser {
    _id: string;
    username: string;
    isPayingMember: boolean;
    userType: UserTypes;
    timezone: string;
    followers: BasicUser[];
    following: BasicUser[];
    friends: Friend[];
    badges: string[];
    createdAt: string;
    updatedAt: string;
    profileImages: ProfileImages;
    pushNotificationToken: string;
    hasCompletedIntroduction: boolean;
}

export default FormattedUser;
