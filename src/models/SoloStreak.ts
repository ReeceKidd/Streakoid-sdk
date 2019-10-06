import CurrentStreak from './CurrentStreak';
import StreakStatus from '../StreakStatus';
import Activity from './Activity';
import PastStreak from './PastStreak';

interface SoloStreak {
    _id: string;
    userId: string;
    streakName: string;
    status: StreakStatus;
    completedToday: boolean;
    active: boolean;
    activity: Array<Activity>;
    currentStreak: CurrentStreak;
    pastStreaks: Array<PastStreak>;
    timezone: string;
    updatedAt: string;
    createdAt: string;
    streakDescription?: string;
    numberOfMinutes?: number;
}

export default SoloStreak;
