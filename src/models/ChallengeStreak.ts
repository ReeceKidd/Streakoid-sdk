import CurrentStreak from './CurrentStreak';
import StreakStatus from '../StreakStatus';
import PastStreak from './PastStreak';

interface ChallengeStreak {
    _id: string;
    challengeId: string;
    userId: string;
    status: StreakStatus;
    completedToday: boolean;
    active: boolean;
    currentStreak: CurrentStreak;
    pastStreaks: Array<PastStreak>;
    timezone: string;
    updatedAt: string;
    createdAt: string;
}

export default ChallengeStreak;
