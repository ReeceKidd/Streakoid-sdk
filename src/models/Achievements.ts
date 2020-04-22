import AcheivmentTypes from '../AchievementTypes';

type AchievementType = OneHundredDaySoloStreak;

export interface OneHundredDaySoloStreak {
    acheivementType: AcheivmentTypes.oneHundredDaySoloStreak;
    name: string;
    description: string;
}

export default AchievementType;
