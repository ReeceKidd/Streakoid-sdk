import { GroupStreak, PopulatedGroupStreak } from "./models/GroupStreak";
declare const _default: (
  applicationUrl: string
) => {
  getAll: ({
    creatorId,
    memberId,
    timezone
  }: {
    creatorId?: string | undefined;
    memberId?: string | undefined;
    timezone?: string | undefined;
  }) => Promise<PopulatedGroupStreak[]>;
  getOne: (groupStreakId: string) => Promise<PopulatedGroupStreak>;
  create: ({
    creatorId,
    streakName,
    timezone,
    streakDescription,
    numberOfMinutes,
    members
  }: {
    creatorId: string;
    streakName: string;
    timezone: string;
    members: {
      memberId: string;
      groupMemberStreakId?: string | undefined;
    }[];
    streakDescription?: string | undefined;
    numberOfMinutes?: number | undefined;
  }) => Promise<GroupStreak>;
  update: ({
    groupStreakId,
    timezone,
    updateData
  }: {
    groupStreakId: string;
    timezone: string;
    updateData: {
      creatorId?: string | undefined;
      streakName?: string | undefined;
      streakDescription?: string | undefined;
      numberOfMinutes?: number | undefined;
      timezone?: string | undefined;
    };
  }) => Promise<GroupStreak>;
  deleteOne: (
    groupStreakId: string
  ) => Promise<import("axios").AxiosResponse<any>>;
  groupMembers: {
    create: ({
      friendId,
      groupStreakId,
      timezone
    }: {
      friendId: string;
      groupStreakId: string;
      timezone: string;
    }) => Promise<import("./models/GroupMember").GroupMember[]>;
    deleteOne: ({
      groupStreakId,
      memberId
    }: {
      groupStreakId: string;
      memberId: string;
    }) => Promise<import("axios").AxiosResponse<any>>;
  };
};
export default _default;
//# sourceMappingURL=groupStreaks.d.ts.map
