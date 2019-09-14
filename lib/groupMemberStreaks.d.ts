import { GroupMemberStreak } from "./models/GroupMemberStreak";
declare const _default: (
  applicationUrl: string
) => {
  getOne: (groupMemberStreakId: string) => Promise<GroupMemberStreak>;
  create: ({
    userId,
    groupStreakId,
    timezone
  }: {
    userId: string;
    groupStreakId: string;
    timezone: string;
  }) => Promise<GroupMemberStreak>;
  deleteOne: (
    groupMemberStreakId: string
  ) => Promise<import("axios").AxiosResponse<any>>;
};
export default _default;
//# sourceMappingURL=groupMemberStreaks.d.ts.map
