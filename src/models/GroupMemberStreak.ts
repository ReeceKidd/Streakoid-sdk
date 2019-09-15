import StreakTrackingEventType from "../streakTrackingEventType";

interface GroupMemberStreak {
  _id: string;
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
  createdAt: string;
  updatedAt: string;
}

export default GroupMemberStreak;
