import UserTypes from '../userTypes';
import Friend from './Friend';
import ProfileImages from './ProfileImages';
import PastSubscription from './PastSubscription';

interface User {
    _id: string;
    username: string;
    isPayingMember: boolean;
    memberHistory: {
        becameAMemberDate: string,
        currentSubscription: {
            startDate: string
        }
        pastSubscriptions: PastSubscription[]
    }
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
