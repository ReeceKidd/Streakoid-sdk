import mongoose from "mongoose";

interface GroupStreak extends mongoose.Document {
  creatorId: string;
  streakName: string;
  streakDescription: string;
  numberOfMinutes: number;
  members: { memberId: string; groupMemberStreakId: string }[];
  timezone: string;
  createdAt: string;
  updatedAt: string;
}

export default GroupStreak;
