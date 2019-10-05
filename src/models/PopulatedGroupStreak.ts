import PopulatedMember from "./PopulatedMember";
import StreakStatus from "../StreakStatus";
import GroupStreakType from "../GroupStreakType";

interface PopulatedGroupStreak {
  _id: string;
  type: GroupStreakType;
  creatorId: string;
  streakName: string;
  status: StreakStatus;
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
