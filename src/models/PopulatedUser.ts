import UserTypes from '../userTypes';
import BasicUser from './BasicUser';
import ProfileImages from './ProfileImages';
import Friend from './Friend';
import AchievementType from './Achievements';

interface PopulatedUser {
    _id: string;
    username: string;
    isPayingMember: boolean;
    userType: UserTypes;
    timezone: string;
    friends: Friend[];
    followers: BasicUser[];
    following: BasicUser[];
    achievements: AchievementType[];
    createdAt: string;
    updatedAt: string;
    profileImages: ProfileImages;
    pushNotificationToken: string;
}

export default PopulatedUser;
