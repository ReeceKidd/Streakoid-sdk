import UserTypes from '../userTypes';
import Friend from './Friend';

interface User {
    _id: string;
    username: string;
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
    profilePicture?: {
        type: string;
    };
}

export default User;
