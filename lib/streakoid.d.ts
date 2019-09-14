declare const streakoidFactory: (
  applicationUrl: string
) => {
  completeSoloStreakTasks: {
    getAll: ({
      userId,
      streakId
    }: {
      userId?: string | undefined;
      streakId?: string | undefined;
    }) => Promise<
      import("./models/CompleteSoloStreakTask").CompleteSoloStreakTask[]
    >;
    create: ({
      userId,
      soloStreakId,
      timezone
    }: {
      userId: string;
      soloStreakId: string;
      timezone: string;
    }) => Promise<
      import("./models/CompleteSoloStreakTask").CompleteSoloStreakTask
    >;
    deleteOne: (
      completeSoloStreakTaskId: string
    ) => Promise<import("axios").AxiosResponse<any>>;
  };
  completeGroupMemberStreakTasks: {
    getAll: ({
      userId,
      groupStreakId,
      groupMemberStreakId
    }: {
      userId?: string | undefined;
      groupStreakId?: string | undefined;
      groupMemberStreakId?: string | undefined;
    }) => Promise<
      import("./models/CompleteGroupMemberStreak").CompleteGroupMemberStreakTask[]
    >;
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
    }) => Promise<
      import("./models/CompleteGroupMemberStreak").CompleteGroupMemberStreakTask
    >;
    deleteOne: (
      completeGroupMemberStreakTaskId: string
    ) => Promise<import("axios").AxiosResponse<any>>;
  };
  soloStreaks: {
    getAll: ({
      userId,
      completedToday,
      timezone,
      active
    }: {
      userId?: string | undefined;
      completedToday?: boolean | undefined;
      timezone?: string | undefined;
      active?: boolean | undefined;
    }) => Promise<import("./models/SoloStreak").SoloStreak[]>;
    getOne: (
      soloStreakId: string
    ) => Promise<import("./models/SoloStreak").SoloStreak>;
    deleteOne: (
      soloStreakId: string
    ) => Promise<import("axios").AxiosResponse<any>>;
    create: ({
      userId,
      streakName,
      streakDescription,
      timezone,
      numberOfMinutes
    }: {
      userId: string;
      streakName: string;
      timezone: string;
      streakDescription?: string | undefined;
      numberOfMinutes?: number | undefined;
    }) => Promise<import("./models/SoloStreak").SoloStreak>;
    update: ({
      soloStreakId,
      timezone,
      updateData
    }: {
      soloStreakId: string;
      timezone: string;
      updateData?:
        | {
            streakName?: string | undefined;
            streakDescription?: string | undefined;
            completedToday?: boolean | undefined;
            active?: boolean | undefined;
            currentStreak?:
              | {
                  startDate?: Date | undefined;
                  numberOfDaysInARow?: number | undefined;
                }
              | undefined;
            pastStreaks?:
              | [
                  {
                    startDate: Date;
                    numberOfDaysInARow: number;
                    endDate: Date;
                  }
                ]
              | undefined;
            activity?:
              | {
                  type: string;
                  time: Date;
                }[]
              | undefined;
          }
        | undefined;
    }) => Promise<import("./models/SoloStreak").SoloStreak>;
  };
  stripe: {
    createSubscription: ({
      token,
      id
    }: {
      token: string;
      id: string;
    }) => Promise<import("./models/User").User>;
    deleteSubscription: ({
      subscription,
      userId
    }: {
      subscription: string;
      userId: string;
    }) => Promise<import("./models/User").User>;
  };
  users: {
    friends: {
      getAll: (userId: string) => Promise<import("./models/Friend").Friend[]>;
      addFriend: ({
        userId,
        friendId
      }: {
        userId: string;
        friendId: string;
      }) => Promise<import("./models/User").User>;
      deleteOne: (
        userId: string,
        friendId: string
      ) => Promise<import("axios").AxiosResponse<any>>;
    };
    getAll: (
      searchQuery?: string | undefined
    ) => Promise<import("./models/User").User[]>;
    getOne: (userId: string) => Promise<import("./models/User").User>;
    create: ({
      username,
      email
    }: {
      username: string;
      email: string;
    }) => Promise<import("./models/User").User>;
    deleteOne: (userId: string) => Promise<import("axios").AxiosResponse<any>>;
  };
  groupStreaks: {
    getAll: ({
      creatorId,
      memberId,
      timezone
    }: {
      creatorId?: string | undefined;
      memberId?: string | undefined;
      timezone?: string | undefined;
    }) => Promise<import("./models/GroupStreak").PopulatedGroupStreak[]>;
    getOne: (
      groupStreakId: string
    ) => Promise<import("./models/GroupStreak").PopulatedGroupStreak>;
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
    }) => Promise<import("./models/GroupStreak").GroupStreak>;
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
    }) => Promise<import("./models/GroupStreak").GroupStreak>;
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
  streakTrackingEvents: {
    getAll: ({
      type,
      userId,
      streakId
    }: {
      type?: string | undefined;
      userId?: string | undefined;
      streakId?: string | undefined;
    }) => Promise<import("./models/StreakTrackingEvent").StreakTrackingEvent[]>;
    getOne: (
      streakTrackingEventId: string
    ) => Promise<import("./models/StreakTrackingEvent").StreakTrackingEvent>;
    create: ({
      type,
      streakId,
      userId
    }: {
      type: string;
      streakId: string;
      userId: string;
    }) => Promise<import("./models/StreakTrackingEvent").StreakTrackingEvent>;
    deleteOne: (
      streakTrackingEventId: string
    ) => Promise<import("axios").AxiosResponse<any>>;
  };
  agendaJobs: {
    deleteOne: (
      agendaJobId: string
    ) => Promise<import("axios").AxiosResponse<any>>;
  };
  feedbacks: {
    create: ({
      userId,
      pageUrl,
      username,
      userEmail,
      feedbackText
    }: {
      userId: string;
      pageUrl: string;
      username: string;
      userEmail: string;
      feedbackText: string;
    }) => Promise<import("./models/Feedback").Feedback>;
    deleteOne: (
      feedbackId: string
    ) => Promise<import("axios").AxiosResponse<any>>;
  };
  groupMemberStreaks: {
    getOne: (
      groupMemberStreakId: string
    ) => Promise<import("./models/GroupMemberStreak").GroupMemberStreak>;
    create: ({
      userId,
      groupStreakId,
      timezone
    }: {
      userId: string;
      groupStreakId: string;
      timezone: string;
    }) => Promise<import("./models/GroupMemberStreak").GroupMemberStreak>;
    deleteOne: (
      groupMemberStreakId: string
    ) => Promise<import("axios").AxiosResponse<any>>;
  };
};
export default streakoidFactory;
export declare const streakoid: {
  completeSoloStreakTasks: {
    getAll: ({
      userId,
      streakId
    }: {
      userId?: string | undefined;
      streakId?: string | undefined;
    }) => Promise<
      import("./models/CompleteSoloStreakTask").CompleteSoloStreakTask[]
    >;
    create: ({
      userId,
      soloStreakId,
      timezone
    }: {
      userId: string;
      soloStreakId: string;
      timezone: string;
    }) => Promise<
      import("./models/CompleteSoloStreakTask").CompleteSoloStreakTask
    >;
    deleteOne: (
      completeSoloStreakTaskId: string
    ) => Promise<import("axios").AxiosResponse<any>>;
  };
  completeGroupMemberStreakTasks: {
    getAll: ({
      userId,
      groupStreakId,
      groupMemberStreakId
    }: {
      userId?: string | undefined;
      groupStreakId?: string | undefined;
      groupMemberStreakId?: string | undefined;
    }) => Promise<
      import("./models/CompleteGroupMemberStreak").CompleteGroupMemberStreakTask[]
    >;
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
    }) => Promise<
      import("./models/CompleteGroupMemberStreak").CompleteGroupMemberStreakTask
    >;
    deleteOne: (
      completeGroupMemberStreakTaskId: string
    ) => Promise<import("axios").AxiosResponse<any>>;
  };
  soloStreaks: {
    getAll: ({
      userId,
      completedToday,
      timezone,
      active
    }: {
      userId?: string | undefined;
      completedToday?: boolean | undefined;
      timezone?: string | undefined;
      active?: boolean | undefined;
    }) => Promise<import("./models/SoloStreak").SoloStreak[]>;
    getOne: (
      soloStreakId: string
    ) => Promise<import("./models/SoloStreak").SoloStreak>;
    deleteOne: (
      soloStreakId: string
    ) => Promise<import("axios").AxiosResponse<any>>;
    create: ({
      userId,
      streakName,
      streakDescription,
      timezone,
      numberOfMinutes
    }: {
      userId: string;
      streakName: string;
      timezone: string;
      streakDescription?: string | undefined;
      numberOfMinutes?: number | undefined;
    }) => Promise<import("./models/SoloStreak").SoloStreak>;
    update: ({
      soloStreakId,
      timezone,
      updateData
    }: {
      soloStreakId: string;
      timezone: string;
      updateData?:
        | {
            streakName?: string | undefined;
            streakDescription?: string | undefined;
            completedToday?: boolean | undefined;
            active?: boolean | undefined;
            currentStreak?:
              | {
                  startDate?: Date | undefined;
                  numberOfDaysInARow?: number | undefined;
                }
              | undefined;
            pastStreaks?:
              | [
                  {
                    startDate: Date;
                    numberOfDaysInARow: number;
                    endDate: Date;
                  }
                ]
              | undefined;
            activity?:
              | {
                  type: string;
                  time: Date;
                }[]
              | undefined;
          }
        | undefined;
    }) => Promise<import("./models/SoloStreak").SoloStreak>;
  };
  stripe: {
    createSubscription: ({
      token,
      id
    }: {
      token: string;
      id: string;
    }) => Promise<import("./models/User").User>;
    deleteSubscription: ({
      subscription,
      userId
    }: {
      subscription: string;
      userId: string;
    }) => Promise<import("./models/User").User>;
  };
  users: {
    friends: {
      getAll: (userId: string) => Promise<import("./models/Friend").Friend[]>;
      addFriend: ({
        userId,
        friendId
      }: {
        userId: string;
        friendId: string;
      }) => Promise<import("./models/User").User>;
      deleteOne: (
        userId: string,
        friendId: string
      ) => Promise<import("axios").AxiosResponse<any>>;
    };
    getAll: (
      searchQuery?: string | undefined
    ) => Promise<import("./models/User").User[]>;
    getOne: (userId: string) => Promise<import("./models/User").User>;
    create: ({
      username,
      email
    }: {
      username: string;
      email: string;
    }) => Promise<import("./models/User").User>;
    deleteOne: (userId: string) => Promise<import("axios").AxiosResponse<any>>;
  };
  groupStreaks: {
    getAll: ({
      creatorId,
      memberId,
      timezone
    }: {
      creatorId?: string | undefined;
      memberId?: string | undefined;
      timezone?: string | undefined;
    }) => Promise<import("./models/GroupStreak").PopulatedGroupStreak[]>;
    getOne: (
      groupStreakId: string
    ) => Promise<import("./models/GroupStreak").PopulatedGroupStreak>;
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
    }) => Promise<import("./models/GroupStreak").GroupStreak>;
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
    }) => Promise<import("./models/GroupStreak").GroupStreak>;
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
  streakTrackingEvents: {
    getAll: ({
      type,
      userId,
      streakId
    }: {
      type?: string | undefined;
      userId?: string | undefined;
      streakId?: string | undefined;
    }) => Promise<import("./models/StreakTrackingEvent").StreakTrackingEvent[]>;
    getOne: (
      streakTrackingEventId: string
    ) => Promise<import("./models/StreakTrackingEvent").StreakTrackingEvent>;
    create: ({
      type,
      streakId,
      userId
    }: {
      type: string;
      streakId: string;
      userId: string;
    }) => Promise<import("./models/StreakTrackingEvent").StreakTrackingEvent>;
    deleteOne: (
      streakTrackingEventId: string
    ) => Promise<import("axios").AxiosResponse<any>>;
  };
  agendaJobs: {
    deleteOne: (
      agendaJobId: string
    ) => Promise<import("axios").AxiosResponse<any>>;
  };
  feedbacks: {
    create: ({
      userId,
      pageUrl,
      username,
      userEmail,
      feedbackText
    }: {
      userId: string;
      pageUrl: string;
      username: string;
      userEmail: string;
      feedbackText: string;
    }) => Promise<import("./models/Feedback").Feedback>;
    deleteOne: (
      feedbackId: string
    ) => Promise<import("axios").AxiosResponse<any>>;
  };
  groupMemberStreaks: {
    getOne: (
      groupMemberStreakId: string
    ) => Promise<import("./models/GroupMemberStreak").GroupMemberStreak>;
    create: ({
      userId,
      groupStreakId,
      timezone
    }: {
      userId: string;
      groupStreakId: string;
      timezone: string;
    }) => Promise<import("./models/GroupMemberStreak").GroupMemberStreak>;
    deleteOne: (
      groupMemberStreakId: string
    ) => Promise<import("axios").AxiosResponse<any>>;
  };
};
//# sourceMappingURL=streakoid.d.ts.map
