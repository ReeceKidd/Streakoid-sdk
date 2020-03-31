import UserTypes from '../userTypes';
import BasicUser from './BasicUser';
import ProfileImages from './ProfileImages';
import { Badge } from '..';

interface PopulatedUser {
    _id: string;
    username: string;
    isPayingMember: boolean;
    userType: UserTypes;
    timezone: string;
    followers: BasicUser[];
    following: BasicUser[];
    badges: Badge[];
    createdAt: string;
    updatedAt: string;
    profileImages: ProfileImages;
    pushNotificationToken: string;
}

export default PopulatedUser;
