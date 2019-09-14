import { User } from "./models/User";
import { Friend } from "./models/Friend";
declare const _default: (
  applicationUrl: string
) => {
  getAll: (userId: string) => Promise<Friend[]>;
  addFriend: ({
    userId,
    friendId
  }: {
    userId: string;
    friendId: string;
  }) => Promise<User>;
  deleteOne: (
    userId: string,
    friendId: string
  ) => Promise<import("axios").AxiosResponse<any>>;
};
export default _default;
//# sourceMappingURL=friends.d.ts.map
