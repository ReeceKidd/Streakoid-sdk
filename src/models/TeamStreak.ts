import StreakStatus from '../StreakStatus';
import { CurrentStreak, PastStreak } from '..';

interface TeamStreak {
    _id: string;
    creatorId: string;
    streakName: string;
    completedToday: boolean;
    active: boolean;
    status: StreakStatus;
    currentStreak: CurrentStreak;
    pastStreaks: Array<PastStreak>;
    members: { memberId: string; teamMemberStreakId: string }[];
    timezone: string;
    createdAt: string;
    updatedAt: string;
    streakDescription?: string;
    numberOfMinutes?: number;
}

export default TeamStreak;
