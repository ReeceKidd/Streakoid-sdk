import GroupStreakTypes from '../GroupStreakTypes';

interface CompleteGroupMemberStreakTask {
    _id: string;
    streakId: string;
    userId: string;
    teamStreakId: string;
    groupMemberStreakId: string;
    groupStreakType: GroupStreakTypes;
    taskCompleteTime: Date;
    taskCompleteDay: string;
    createdAt: string;
    updatedAt: string;
}

export default CompleteGroupMemberStreakTask;
