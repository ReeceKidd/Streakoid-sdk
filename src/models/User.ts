import UserTypes from "../userTypes";

interface User {
  _id: string;
  username: string;
  email: string;
  type: UserTypes;
  timezone: string;
  friends: {
    friendId: string;
    username: string;
  }[];
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
