import UserTypes from '../userTypes';
import BasicUser from './BasicUser';
import ProfileImages from './ProfileImages';
import Friend from './Friend';

interface PopulatedUser {
    _id: string;
    username: string;
    isPayingMember: boolean;
    userType: UserTypes;
    timezone: string;
    friends: Friend[];
    followers: BasicUser[];
    following: BasicUser[];
    createdAt: string;
    updatedAt: string;
    profileImages: ProfileImages;
    pushNotificationToken: string;
}

export default PopulatedUser;
