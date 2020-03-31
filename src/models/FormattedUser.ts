import UserTypes from '../userTypes';
import Follower from './Follower';
import ProfileImages from './ProfileImages';
import Friend from './Friend';

interface FormattedUser {
    _id: string;
    username: string;
    isPayingMember: boolean;
    userType: UserTypes;
    timezone: string;
    followers: Follower[];
    following: Follower[];
    friends: Friend[];
    badges: string[];
    createdAt: string;
    updatedAt: string;
    profileImages: ProfileImages;
    pushNotificationToken: string;
    hasCompletedIntroduction: boolean;
}

export default FormattedUser;
