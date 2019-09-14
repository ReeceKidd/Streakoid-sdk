import { User } from "./models/User";
declare const _default: (
  applicationUrl: string
) => {
  getAll: (searchQuery?: string | undefined) => Promise<User[]>;
  getOne: (userId: string) => Promise<User>;
  create: ({
    username,
    email
  }: {
    username: string;
    email: string;
  }) => Promise<User>;
  deleteOne: (userId: string) => Promise<import("axios").AxiosResponse<any>>;
};
export default _default;
//# sourceMappingURL=users.d.ts.map
