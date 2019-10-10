import GroupStreakTypes from '../GroupStreakTypes';

interface IncompleteGroupMemberStreakTask {
    _id: string;
    streakId: string;
    userId: string;
    groupMemberStreakId: string;
    groupStreakType: GroupStreakTypes;
    taskIncompleteTime: Date;
    taskIncompleteDay: string;
    createdAt: string;
    updatedAt: string;
    teamStreakId?: string;
}

export default IncompleteGroupMemberStreakTask;
