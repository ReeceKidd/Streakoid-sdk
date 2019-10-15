import PopulatedMember from './PopulatedTeamMember';
import StreakStatus from '../StreakStatus';
import { CurrentStreak } from '..';
import PastStreak from './PastStreak';

interface PopulatedTeamStreak {
    _id: string;
    creatorId: string;
    streakName: string;
    completedToday: boolean;
    active: boolean;
    status: StreakStatus;
    currentStreak: CurrentStreak;
    pastStreaks: Array<PastStreak>;
    members: PopulatedMember[];
    timezone: string;
    creator: {
        _id: string;
        username: string;
    };
    createdAt: string;
    updatedAt: string;
    streakDescription?: string;
    numberOfMinutes?: number;
}

export default PopulatedTeamStreak;
