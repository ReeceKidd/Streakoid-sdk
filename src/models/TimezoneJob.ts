import StreakTypes from '../StreakTypes';
import { GroupStreakTypes, AgendaJobNames } from '..';

interface TimezoneJob {
    _id: string;
    jobName: AgendaJobNames;
    timezone: string;
    localisedJobCompleteTime: string;
    streakType: StreakTypes;
    numberOfStreaks: number;
    createdAt: string;
    updatedAt: string;
    groupStreakType: GroupStreakTypes;
}

export default TimezoneJob;
