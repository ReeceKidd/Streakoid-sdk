import AcheivmentTypes from '../AchievementTypes';

type AchievementType = OneHundredDaySoloStreakAchievement;

export interface OneHundredDaySoloStreakAchievement {
    achievementType: AcheivmentTypes.oneHundredDaySoloStreak;
    name: string;
    description: string;
}

export default AchievementType;
