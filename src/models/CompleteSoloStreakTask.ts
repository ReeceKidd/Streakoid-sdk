import mongoose from "mongoose";
import StreakTypes from "../streakTypes";

interface CompleteSoloStreakTask extends mongoose.Document {
  streakId: string;
  userId: string;
  taskCompleteTime: Date;
  taskCompleteDay: string;
  streakType: StreakTypes;
  createdAt: string;
  updatedAt: string;
}

export default CompleteSoloStreakTask;
