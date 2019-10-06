import FriendRequestStatus from '../FriendRequestStatus';

interface PopulatedFriendRequest {
    _id: string;
    requester: {
        _id: string;
        username: string;
    };
    requestee: {
        _id: string;
        username: string;
    };
    status: FriendRequestStatus;
    createdAt: string;
    updatedAt: string;
}

export default PopulatedFriendRequest;
