import StreakTypes from '../StreakTypes';
import { AgendaJobNames } from '..';

interface TimezoneJob {
    _id: string;
    agendaJobId: string;
    jobName: AgendaJobNames;
    timezone: string;
    localisedJobCompleteTime: string;
    streakType: StreakTypes;
    numberOfStreaks: number;
    createdAt: string;
    updatedAt: string;
}

export default TimezoneJob;
