import UserTypes from '../userTypes';
import Friend from './Friend';
import ProfileImages from './ProfileImages';

interface User {
    _id: string;
    username: string;
    isMember: boolean;
    email: string;
    userType: UserTypes;
    timezone: string;
    friends: Friend[];
    stripe: {
        customer: string;
        subscription: string;
    };
    createdAt: string;
    updatedAt: string;
    profileImages: ProfileImages;
}

export default User;
