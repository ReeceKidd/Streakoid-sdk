import StreakStatus from '../StreakStatus';
import { TeamStreakStatus, CurrentStreak, PastStreak } from '..';

interface TeamStreak {
    _id: string;
    creatorId: string;
    streakName: string;
    status: StreakStatus;
    completedToday: boolean;
    active: boolean;
    teamStreakStatus: TeamStreakStatus;
    currentStreak: CurrentStreak;
    pastStreaks: Array<PastStreak>;
    members: { memberId: string; groupMemberStreakId: string }[];
    timezone: string;
    createdAt: string;
    updatedAt: string;
    streakDescription?: string;
    numberOfMinutes?: number;
}

export default TeamStreak;
