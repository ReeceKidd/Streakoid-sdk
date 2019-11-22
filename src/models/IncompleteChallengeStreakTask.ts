interface IncompleteChallengeStreakTask {
    _id: string;
    challengeStreakId: string;
    userId: string;
    taskIncompleteTime: Date;
    taskIncompleteDay: string;
    createdAt: string;
    updatedAt: string;
}

export default IncompleteChallengeStreakTask;
