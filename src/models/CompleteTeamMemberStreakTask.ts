interface CompleteTeamMemberStreakTask {
    _id: string;
    streakId: string;
    userId: string;
    teamMemberStreakId: string;
    taskCompleteTime: Date;
    taskCompleteDay: string;
    createdAt: string;
    updatedAt: string;
    teamStreakId?: string;
}

export default CompleteTeamMemberStreakTask;
