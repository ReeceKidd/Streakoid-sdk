import { AcheivementTypes } from '..';

type AcheivmentType = OneHundredDaySoloStreak;

export interface OneHundredDaySoloStreak {
    acheivementType: AcheivementTypes.oneHundredDaySoloStreak;
    name: string;
    description: string;
}

export default AcheivmentType;
