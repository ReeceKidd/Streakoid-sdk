import mongoose from "mongoose";

import ActivityArray from "./ActivityArray";
import CurrentStreak from "./CurrentStreak";
import PastStreakArray from "./PastStreakArray";

interface SoloStreak extends mongoose.Document {
  _id: string;
  userId: string;
  streakName: string;
  streakDescription: string;
  numberOfMinutes: number;
  completedToday: boolean;
  active: boolean;
  activity: ActivityArray;
  currentStreak: CurrentStreak;
  pastStreaks: PastStreakArray;
  timezone: string;
  updatedAt: string;
  createdAt: string;
}

export default SoloStreak;
