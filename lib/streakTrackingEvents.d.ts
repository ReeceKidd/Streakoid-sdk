import { StreakTrackingEvent } from "./models/StreakTrackingEvent";
declare const _default: (
  applicationUrl: string
) => {
  getAll: ({
    type,
    userId,
    streakId
  }: {
    type?: string | undefined;
    userId?: string | undefined;
    streakId?: string | undefined;
  }) => Promise<StreakTrackingEvent[]>;
  getOne: (streakTrackingEventId: string) => Promise<StreakTrackingEvent>;
  create: ({
    type,
    streakId,
    userId
  }: {
    type: string;
    streakId: string;
    userId: string;
  }) => Promise<StreakTrackingEvent>;
  deleteOne: (
    streakTrackingEventId: string
  ) => Promise<import("axios").AxiosResponse<any>>;
};
export default _default;
//# sourceMappingURL=streakTrackingEvents.d.ts.map
