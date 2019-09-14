import { GroupMember } from "./models/GroupMember";
declare const _default: (
  applicationUrl: string
) => {
  create: ({
    friendId,
    groupStreakId,
    timezone
  }: {
    friendId: string;
    groupStreakId: string;
    timezone: string;
  }) => Promise<GroupMember[]>;
  deleteOne: ({
    groupStreakId,
    memberId
  }: {
    groupStreakId: string;
    memberId: string;
  }) => Promise<import("axios").AxiosResponse<any>>;
};
export default _default;
//# sourceMappingURL=groupMembers.d.ts.map
