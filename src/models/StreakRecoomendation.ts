interface StreakRecommendation {
    _id: string;
    streakName: string;
    updatedAt: string;
    createdAt: string;
    streakDescription?: string;
    numberOfMinutes?: number;
}

export default StreakRecommendation;
