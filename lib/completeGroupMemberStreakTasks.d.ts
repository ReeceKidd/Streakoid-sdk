import { CompleteGroupMemberStreakTask } from "./models/CompleteGroupMemberStreak";
declare const _default: (
  applicatonUrl: string
) => {
  getAll: ({
    userId,
    groupStreakId,
    groupMemberStreakId
  }: {
    userId?: string | undefined;
    groupStreakId?: string | undefined;
    groupMemberStreakId?: string | undefined;
  }) => Promise<CompleteGroupMemberStreakTask[]>;
  create: ({
    userId,
    groupStreakId,
    groupMemberStreakId,
    timezone
  }: {
    userId: string;
    groupStreakId: string;
    groupMemberStreakId: string;
    timezone: string;
  }) => Promise<CompleteGroupMemberStreakTask>;
  deleteOne: (
    completeGroupMemberStreakTaskId: string
  ) => Promise<import("axios").AxiosResponse<any>>;
};
export default _default;
//# sourceMappingURL=completeGroupMemberStreakTasks.d.ts.map
