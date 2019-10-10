import GroupStreakTypes from '../GroupStreakTypes';

interface CompleteGroupMemberStreakTask {
    _id: string;
    streakId: string;
    userId: string;
    groupMemberStreakId: string;
    groupStreakType: GroupStreakTypes;
    taskCompleteTime: Date;
    taskCompleteDay: string;
    createdAt: string;
    updatedAt: string;
    teamStreakId?: string;
}

export default CompleteGroupMemberStreakTask;
