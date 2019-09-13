import mongoose from "mongoose";
import { StreakTypes } from "./StreakTypes";

export interface CompleteGroupMemberStreakTask extends mongoose.Document {
    streakId: string;
    userId: string;
    groupStreakId: string;
    groupMemberStreakId: string;
    taskCompleteTime: Date;
    taskCompleteDay: string;
    streakType: StreakTypes;
    createdAt: String;
    updatedAt: String;
}