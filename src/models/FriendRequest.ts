import FriendRequestStatus from "../friendRequestStatus";

interface FriendRequest {
  id: string;
  requesterId: string;
  requesteeId: string;
  status: FriendRequestStatus;
  createdAt: string;
  updatedAt: string;
}

export default FriendRequest;
