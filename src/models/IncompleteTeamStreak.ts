interface IncompleteTeamStreak {
    _id: string;
    teamStreakId: string;
    userId: string;
    taskIncompleteTime: Date;
    taskIncompleteDay: string;
    createdAt: string;
    updatedAt: string;
}

export default IncompleteTeamStreak;
