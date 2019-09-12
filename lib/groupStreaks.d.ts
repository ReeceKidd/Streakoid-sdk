declare const _default: (applicationUrl: string) => {
    getAll: ({ creatorId, memberId, timezone }: {
        creatorId?: string | undefined;
        memberId?: string | undefined;
        timezone?: string | undefined;
    }) => any;
    getOne: (groupStreakId: string) => any;
    create: ({ creatorId, streakName, timezone, streakDescription, numberOfMinutes, members }: {
        creatorId: string;
        streakName: string;
        timezone: string;
        members: {
            memberId: string;
            groupMemberStreakId?: string | undefined;
        }[];
        streakDescription?: string | undefined;
        numberOfMinutes?: number | undefined;
    }) => any;
    update: (groupStreakId: string, timezone: string, data?: {
        creatorId?: string | undefined;
        streakName?: string | undefined;
        streakDescription?: string | undefined;
        numberOfMinutes?: number | undefined;
        timezone?: string | undefined;
    } | undefined) => any;
    deleteOne: (groupStreakId: string) => any;
    groupMembers: (applicationUrl: string) => {
        create: ({ friendId, groupStreakId, timezone }: {
            friendId: string;
            groupStreakId: string;
            timezone: string;
        }) => any;
        deleteOne: ({ groupStreakId, memberId }: {
            groupStreakId: string;
            memberId: string;
        }) => any;
    };
};
export default _default;
//# sourceMappingURL=groupStreaks.d.ts.map