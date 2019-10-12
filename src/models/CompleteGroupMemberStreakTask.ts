import StreakTypes from '../StreakTypes';

interface CompleteGroupMemberStreakTask {
    _id: string;
    streakId: string;
    userId: string;
    groupMemberStreakId: string;
    streakType: StreakTypes;
    taskCompleteTime: Date;
    taskCompleteDay: string;
    createdAt: string;
    updatedAt: string;
    teamStreakId?: string;
}

export default CompleteGroupMemberStreakTask;
