import mongoose from "mongoose";
import { StreakTrackingEventType } from "../types";

export interface GroupMemberStreak extends mongoose.Document {
    userId: string;
    groupStreakId: string;
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
    createdAt: String;
    updatedAt: String;
}