import ActivityArray from "./ActivityArray";
import CurrentStreak from "./CurrentStreak";
import PastStreakArray from "./PastStreakArray";
import StreakStatus from "../StreakStatus";

interface SoloStreak {
  _id: string;
  userId: string;
  streakName: string;
  status: StreakStatus;
  completedToday: boolean;
  active: boolean;
  activity: ActivityArray;
  currentStreak: CurrentStreak;
  pastStreaks: PastStreakArray;
  timezone: string;
  updatedAt: string;
  createdAt: string;
  streakDescription?: string;
  numberOfMinutes?: number;
}

export default SoloStreak;
