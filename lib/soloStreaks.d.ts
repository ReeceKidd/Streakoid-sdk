import { SoloStreak } from "./models/SoloStreak";
declare const _default: (
  applicationUrl: string
) => {
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
  }) => Promise<SoloStreak[]>;
  getOne: (soloStreakId: string) => Promise<SoloStreak>;
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
  }) => Promise<SoloStreak>;
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
  }) => Promise<SoloStreak>;
};
export default _default;
//# sourceMappingURL=soloStreaks.d.ts.map
