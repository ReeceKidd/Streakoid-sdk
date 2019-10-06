import StreakStatus from "../StreakStatus";
import GroupStreakType from "../GroupStreakType";

interface GroupStreak {
  _id: string;
  groupStreakType: GroupStreakType;
  creatorId: string;
  streakName: string;
  status: StreakStatus;
  members: { memberId: string; groupMemberStreakId: string }[];
  timezone: string;
  createdAt: string;
  updatedAt: string;
  streakDescription?: string;
  numberOfMinutes?: number;
}

export default GroupStreak;
