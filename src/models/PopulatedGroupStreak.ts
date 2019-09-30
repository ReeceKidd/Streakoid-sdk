import PopulatedMember from "./PopulatedMember";
import StreakStatus from "../StreakStatus";

interface PopulatedGroupStreak {
  _id: string;
  creatorId: string;
  streakName: string;
  status: StreakStatus.active;
  members: PopulatedMember[];
  timezone: string;
  creator: {
    _id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
  streakDescription?: string;
  numberOfMinutes?: number;
}

export default PopulatedGroupStreak;
