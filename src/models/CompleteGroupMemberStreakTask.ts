import StreakTypes from "../streakTypes";

interface CompleteGroupMemberStreakTask {
  streakId: string;
  userId: string;
  groupStreakId: string;
  groupMemberStreakId: string;
  taskCompleteTime: Date;
  taskCompleteDay: string;
  streakType: StreakTypes;
  createdAt: string;
  updatedAt: string;
}

export default CompleteGroupMemberStreakTask;
