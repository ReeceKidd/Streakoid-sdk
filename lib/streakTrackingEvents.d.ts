declare const _default: (applicationUrl: string) => {
    getAll: ({ type, userId, streakId }: {
        type?: string | undefined;
        userId?: string | undefined;
        streakId?: string | undefined;
    }) => any;
    getOne: (streakTrackingEventId: string) => any;
    create: (type: any, streakId: string, userId: string) => any;
    deleteOne: (streakTrackingEventId: string) => any;
};
export default _default;
//# sourceMappingURL=streakTrackingEvents.d.ts.map