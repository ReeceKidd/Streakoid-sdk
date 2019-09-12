declare const _default: (applicatonUrl: string) => {
    getAll: ({ userId, groupStreakId, groupMemberStreakId }: {
        userId?: string | undefined;
        groupStreakId?: string | undefined;
        groupMemberStreakId?: string | undefined;
    }) => any;
    create: (userId: string, groupStreakId: string, groupMemberStreakId: string, timezone: string) => any;
    deleteOne: (completeGroupMemberStreakTaskId: string) => any;
};
export default _default;
//# sourceMappingURL=completeGroupMemberStreakTasks.d.ts.map