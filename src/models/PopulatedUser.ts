import UserTypes from '../userTypes';
import Friend from './Friend';
import ProfileImages from './ProfileImages';
import Badge from './Badge';

interface PopulatedUser {
    _id: string;
    username: string;
    isPayingMember: boolean;
    userType: UserTypes;
    timezone: string;
    friends: Friend[];
    badges: Badge[];
    createdAt: string;
    updatedAt: string;
    profileImages: ProfileImages;
    pushNotificationToken: string;
}

export default PopulatedUser;
