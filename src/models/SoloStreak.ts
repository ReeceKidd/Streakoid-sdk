import mongoose from "mongoose";
import { StreakTrackingEventType } from "../types";

interface SoloStreak extends mongoose.Document {
  _id: string;
  userId: string;
  streakName: string;
  streakDescription: string;
  numberOfMinutes: number;
  completedToday: boolean;
  active: boolean;
  activity: [
    {
      type: StreakTrackingEventType;
      time: string;
    }
  ];
  currentStreak: {
    startDate: string;
    numberOfDaysInARow: number;
    endDate: string;
  };
  pastStreaks: [
    {
      endDate: string;
      startDate: string;
      numberOfDaysInARow: number;
    }
  ];
  timezone: string;
  updatedAt: string;
  createdAt: string;
}

export default SoloStreak;
