import StreakStatus from "../StreakStatus";

interface TeamStreak {
  _id: string;
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

export default TeamStreak;
