import mongoose from "mongoose";
import { StreakTrackingEventType } from "./StreakTrackingEvent";
export interface SoloStreak extends mongoose.Document {
  _id: string;
  userId: string;
  streakName: string;
  streakDescription: string;
  numberOfMinutes: number;
  completedToday: boolean;
  active: boolean;
  activity: Array<{
    type: StreakTrackingEventType;
    time: Date;
  }>;
  currentStreak: {
    startDate: Date;
    numberOfDaysInARow: number;
    endDate: Date;
  };
  pastStreaks: Array<{
    endDate: Date;
    startDate: Date;
    numberOfDaysInARow: number;
  }>;
  timezone: string;
  updatedAt: Date;
  createdAt: Date;
}
//# sourceMappingURL=SoloStreak.d.ts.map
