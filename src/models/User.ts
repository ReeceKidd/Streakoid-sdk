import UserTypes from "../userTypes";

interface User {
  _id: string;
  username: string;
  email: string;
  type: UserTypes;
  timezone: string;
  friends: string[];
  profilePicture?: {
    type: string;
  };
  stripe: {
    customer: string;
    subscription: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default User;
