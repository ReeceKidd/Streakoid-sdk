import UserTypes from '../userTypes';
import Follower from './Follower';
import ProfileImages from './ProfileImages';
import { Badge } from '..';

interface PopulatedUser {
    _id: string;
    username: string;
    isPayingMember: boolean;
    userType: UserTypes;
    timezone: string;
    followers: Follower[];
    following: Follower[];
    badges: Badge[];
    createdAt: string;
    updatedAt: string;
    profileImages: ProfileImages;
    pushNotificationToken: string;
}

export default PopulatedUser;
