interface StreakTrackingEvent {
  _id: string;
  type: StreakTrackingEvent;
  streakId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export default StreakTrackingEvent;
