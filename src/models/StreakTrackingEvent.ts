import mongoose from "mongoose";

export enum StreakTrackingEventType {
    LostStreak = "lost-streak",
    MaintainedStreak = "maintained-streak",
    InactiveStreak = "inactive-streak"
}

export interface StreakTrackingEvent extends mongoose.Document {
    type: StreakTrackingEvent;
    streakId: string;
    userId: string;
    createdAt: String;
    updatedAt: String;
}