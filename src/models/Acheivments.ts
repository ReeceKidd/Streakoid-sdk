import { AcheivementTypes } from '..';

type AchievementType = OneHundredDaySoloStreak;

export interface OneHundredDaySoloStreak {
    acheivementType: AcheivementTypes.oneHundredDaySoloStreak;
    name: string;
    description: string;
}

export default AchievementType;
