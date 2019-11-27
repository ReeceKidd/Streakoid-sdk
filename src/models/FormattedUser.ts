import UserTypes from '../userTypes';
import Friend from './Friend';
import ProfileImages from './ProfileImages';

interface FormattedUser {
    _id: string;
    username: string;
    isPayingMember: boolean;
    userType: UserTypes;
    timezone: string;
    friends: Friend[];
    badges: string[];
    createdAt: string;
    updatedAt: string;
    profileImages: ProfileImages;
    pushNotificationToken: string;
}

export default FormattedUser;
