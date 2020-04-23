import { AchievementTypes } from '..';

type DatabaseAchievementType = OneHundredDaySoloStreakDatabaseAchievement;

interface DatabaseAchievement {
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export interface OneHundredDaySoloStreakDatabaseAchievement extends DatabaseAchievement {
    achievementType: AchievementTypes.oneHundredDaySoloStreak;
    name: string;
    description: string;
}

export default DatabaseAchievementType;
