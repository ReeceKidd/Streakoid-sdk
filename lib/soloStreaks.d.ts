declare const _default: (applicationUrl: string) => {
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
export default _default;
//# sourceMappingURL=soloStreaks.d.ts.map