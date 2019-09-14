import mongoose from "mongoose";
import { StreakTypes } from "../types";

interface CompleteGroupMemberStreakTask extends mongoose.Document {
  streakId: string;
  userId: string;
  groupStreakId: string;
  groupMemberStreakId: string;
  taskCompleteTime: Date;
  taskCompleteDay: string;
  streakType: StreakTypes;
  createdAt: string;
  updatedAt: string;
}

export default CompleteGroupMemberStreakTask;
