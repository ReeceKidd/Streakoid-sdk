import StreakTypes from '../StreakTypes';
import { GroupStreakTypes, AgendaJobNames } from '..';

interface TimezoneJob {
    _id: string;
    jobName: AgendaJobNames;
    streakType: StreakTypes;
    completedTime: string;
    completedDay: string;
    numberOfStreaks: number;
    createdAt: string;
    updatedAt: string;
    groupStreakType: GroupStreakTypes;
}

export default TimezoneJob;
