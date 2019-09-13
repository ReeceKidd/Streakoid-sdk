import mongoose from "mongoose";
import { SoloStreak } from "./SoloStreak";

export enum UserTypes {
    basic = "basic",
    premium = "premium",
    admin = "admin"
}

export interface User extends mongoose.Document {
    _id: string;
    username: string;
    email: string;
    createdAt: String;
    updatedAt: String;
    type: UserTypes;
    friends: string[];
    profilePicture?: {
        type: string;
    };
    stripe: {
        customer: string;
        subscription: string;
    };
}