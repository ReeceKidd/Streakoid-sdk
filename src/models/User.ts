import UserTypes from "../userTypes";

interface User {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  type: UserTypes;
  friends: string[];
  profilePicture?: {
    type: string;
  };
  stripe: {
    customer: string;
    subscription: string;
  };
}

export default User;
