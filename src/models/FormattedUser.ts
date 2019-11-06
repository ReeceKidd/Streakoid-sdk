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
    createdAt: string;
    updatedAt: string;
    profileImages: ProfileImages;
    endpointArn: string;
}

export default FormattedUser;
