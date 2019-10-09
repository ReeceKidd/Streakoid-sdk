interface IncompleteSoloStreakTask {
    _id: string;
    streakId: string;
    userId: string;
    taskIncompleteTime: Date;
    taskIncompleteDay: string;
    createdAt: string;
    updatedAt: string;
}

export default IncompleteSoloStreakTask;
