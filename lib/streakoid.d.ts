declare const _default: (applicationUrl: string) => {
    completeSoloStreakTasks: {
        getAll: (userId?: string | undefined, streakId?: string | undefined) => any;
        create: (userId: string, soloStreakId: string, timezone: string) => any;
        deleteOne: (completeSoloStreakTaskId: string) => any;
    };
    completeGroupMemberStreakTasks: {
        getAll: ({ userId, groupStreakId, groupMemberStreakId }: {
            userId?: string | undefined;
            groupStreakId?: string | undefined;
            groupMemberStreakId?: string | undefined;
        }) => any;
        create: (userId: string, groupStreakId: string, groupMemberStreakId: string, timezone: string) => any;
        deleteOne: (completeGroupMemberStreakTaskId: string) => any;
    };
    soloStreaks: {
        getAll: ({ userId, completedToday, timezone, active }: {
            userId?: string | undefined;
            completedToday?: boolean | undefined;
            timezone?: string | undefined;
            active?: boolean | undefined;
        }) => any;
        getOne: (soloStreakId: string) => any;
        deleteOne: (soloStreakId: string) => any;
        create: (userId: string, name: string, timezone: string, description?: string | undefined, numberOfMinutes?: number | undefined) => any;
        update: (soloStreakId: string, timezone: string, data?: {
            name?: string | undefined;
            description?: string | undefined;
            completedToday?: boolean | undefined;
            active?: boolean | undefined;
            currentStreak?: {
                startDate?: Date | undefined;
                numberOfDaysInARow?: number | undefined;
            } | undefined;
            pastStreaks?: [{
                startDate: Date;
                numberOfDaysInARow: number;
                endDate: Date;
            }] | undefined;
            activity?: {
                type: string;
                time: Date;
            }[] | undefined;
        } | undefined) => any;
    };
    stripe: {
        createSubscription: (token: string, id: string) => any;
        deleteSubscription: (subscription: string, id: string) => any;
    };
    users: {
        friends: {
            getAll: (userId: string) => any;
            addFriend: (userId: string, friendId: string) => any;
            deleteOne: (userId: string, friendId: string) => any;
        };
        getAll: (searchQuery?: string | undefined) => any;
        getOne: (userId: string) => any;
        create: (username: string, email: string) => any;
        deleteOne: (userId: string) => any;
    };
    groupStreaks: {
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
    streakTrackingEvents: {
        getAll: ({ type, userId, streakId }: {
            type?: string | undefined;
            userId?: string | undefined;
            streakId?: string | undefined;
        }) => any;
        getOne: (streakTrackingEventId: string) => any;
        create: (type: any, streakId: string, userId: string) => any;
        deleteOne: (streakTrackingEventId: string) => any;
    };
    agendaJobs: {
        deleteOne: (agendaJobId: string) => any;
    };
    feedbacks: {
        create: (userId: string, pageUrl: string, username: string, userEmail: string, feedback: string) => any;
        deleteOne: (feedbackId: string) => any;
    };
    groupMemberStreaks: {
        getOne: (groupMemberStreakId: string) => any;
        create: (userId: string, groupStreakId: string, timezone: string) => any;
        deleteOne: (groupMemberStreakId: string) => any;
    };
};
export default _default;
//# sourceMappingURL=streakoid.d.ts.map