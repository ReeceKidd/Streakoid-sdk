import mongoose from "mongoose";
import { StreakTypes } from "./StreakTypes";
export interface CompleteSoloStreakTask extends mongoose.Document {
  streakId: string;
  userId: string;
  taskCompleteTime: Date;
  taskCompleteDay: string;
  streakType: StreakTypes;
  createdAt: String;
  updatedAt: String;
}
//# sourceMappingURL=CompleteSoloStreakTask.d.ts.map
