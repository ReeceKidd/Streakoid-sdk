import mongoose from "mongoose";

interface Feedback extends mongoose.Document {
  userId: string;
  pageUrl: string;
  username: string;
  userEmail: string;
  feedbackText: string;
}

export default Feedback;
