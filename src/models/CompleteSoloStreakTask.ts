import StreakTypes from "../streakTypes";

interface CompleteSoloStreakTask {
  streakId: string;
  userId: string;
  taskCompleteTime: Date;
  taskCompleteDay: string;
  streakType: StreakTypes;
  createdAt: string;
  updatedAt: string;
}

export default CompleteSoloStreakTask;
