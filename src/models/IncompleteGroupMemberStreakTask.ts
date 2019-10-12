import StreakTypes from '../StreakTypes';

interface IncompleteGroupMemberStreakTask {
    _id: string;
    streakId: string;
    userId: string;
    groupMemberStreakId: string;
    streakType: StreakTypes;
    taskIncompleteTime: Date;
    taskIncompleteDay: string;
    createdAt: string;
    updatedAt: string;
    teamStreakId?: string;
}

export default IncompleteGroupMemberStreakTask;
