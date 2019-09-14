import { CompleteSoloStreakTask } from "./models/CompleteSoloStreakTask";
declare const _default: (
  applicationUrl: string
) => {
  getAll: ({
    userId,
    streakId
  }: {
    userId?: string | undefined;
    streakId?: string | undefined;
  }) => Promise<CompleteSoloStreakTask[]>;
  create: ({
    userId,
    soloStreakId,
    timezone
  }: {
    userId: string;
    soloStreakId: string;
    timezone: string;
  }) => Promise<CompleteSoloStreakTask>;
  deleteOne: (
    completeSoloStreakTaskId: string
  ) => Promise<import("axios").AxiosResponse<any>>;
};
export default _default;
//# sourceMappingURL=completeSoloStreakTasks.d.ts.map
