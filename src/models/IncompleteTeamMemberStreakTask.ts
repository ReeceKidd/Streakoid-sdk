interface IncompleteTeamMemberStreakTask {
    _id: string;
    streakId: string;
    userId: string;
    teamMemberStreakId: string;
    taskIncompleteTime: Date;
    taskIncompleteDay: string;
    createdAt: string;
    updatedAt: string;
    teamStreakId?: string;
}

export default IncompleteTeamMemberStreakTask;
