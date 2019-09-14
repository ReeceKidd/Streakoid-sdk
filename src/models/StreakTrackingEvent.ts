import mongoose from "mongoose";

interface StreakTrackingEvent extends mongoose.Document {
  type: StreakTrackingEvent;
  streakId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export default StreakTrackingEvent;
