import CurrentStreak from './CurrentStreak';
import StreakStatus from '../StreakStatus';
import PastStreak from './PastStreak';

interface ChallengeStreak {
    _id: string;
    challengeId: string;
    userId: string;
    streakName: string;
    status: StreakStatus;
    completedToday: boolean;
    active: boolean;
    currentStreak: CurrentStreak;
    pastStreaks: Array<PastStreak>;
    timezone: string;
    updatedAt: string;
    createdAt: string;
    streakDescription?: string;
    numberOfMinutes?: number;
}

export default ChallengeStreak;
