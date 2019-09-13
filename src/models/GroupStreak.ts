import mongoose from "mongoose";
import { GroupMemberStreak } from "./GroupMemberStreak";
export interface GroupStreak extends mongoose.Document {
    creatorId: string;
    streakName: string;
    streakDescription: string;
    numberOfMinutes: number;
    members: { memberId: string; groupMemberStreakId: string }[];
    timezone: string;
    createdAt: string;
    updatedAt: string;
}

export interface PopulatedMember {
    _id: string,
    username: string,
    groupMemberStreak: GroupMemberStreak
}

// Group Streak with information retreived from other collections. 
export interface PopulatedGroupStreak extends mongoose.Document {
    creatorId: string;
    streakName: string;
    streakDescription: string;
    numberOfMinutes: number;
    members: PopulatedMember[];
    timezone: string;
    creator: {
        _id: string,
        username: string
    },
    createdAt: string;
    updatedAt: string;
}
