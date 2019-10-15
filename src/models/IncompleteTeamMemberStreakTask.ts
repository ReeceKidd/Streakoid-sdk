import StreakTypes from '../StreakTypes';

interface IncompleteTeamMemberStreakTask {
    _id: string;
    streakId: string;
    userId: string;
    teamMemberStreakId: string;
    streakType: StreakTypes;
    taskIncompleteTime: Date;
    taskIncompleteDay: string;
    createdAt: string;
    updatedAt: string;
    teamStreakId?: string;
}

export default IncompleteTeamMemberStreakTask;
