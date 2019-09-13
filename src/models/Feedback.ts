import mongoose from "mongoose";
export interface Feedback extends mongoose.Document {
    userId: string;
    pageUrl: string;
    username: string;
    userEmail: string;
    feedbackText: string;
}