import StreakStatus from '../StreakStatus';
import { TeamStreakStatus } from '..';

interface TeamStreak {
    _id: string;
    creatorId: string;
    streakName: string;
    status: StreakStatus;
    teamStreakStatus: TeamStreakStatus;
    members: { memberId: string; groupMemberStreakId: string }[];
    timezone: string;
    createdAt: string;
    updatedAt: string;
    streakDescription?: string;
    numberOfMinutes?: number;
}

export default TeamStreak;
