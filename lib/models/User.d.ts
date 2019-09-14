import mongoose from "mongoose";
export declare enum UserTypes {
  basic = "basic",
  premium = "premium",
  admin = "admin"
}
export interface User extends mongoose.Document {
  _id: string;
  username: string;
  email: string;
  createdAt: String;
  updatedAt: String;
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
//# sourceMappingURL=User.d.ts.map
