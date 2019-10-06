import StreakTypes from "../streakTypes";

interface CompleteGroupMemberStreakTask {
  _id: string;
  streakId: string;
  userId: string;
  teamStreakId: string;
  groupMemberStreakId: string;
  taskCompleteTime: Date;
  taskCompleteDay: string;
  streakType: StreakTypes;
  createdAt: string;
  updatedAt: string;
}

export default CompleteGroupMemberStreakTask;
