import mongoose from "mongoose";
export declare enum StreakTrackingEventType {
  LostStreak = "lost-streak",
  MaintainedStreak = "maintained-streak",
  InactiveStreak = "inactive-streak"
}
export interface StreakTrackingEvent extends mongoose.Document {
  type: StreakTrackingEvent;
  streakId: string;
  userId: string;
  createdAt: String;
  updatedAt: String;
}
//# sourceMappingURL=StreakTrackingEvent.d.ts.map
