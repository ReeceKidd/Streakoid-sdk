import PopulatedMember from './PopulatedMember';
import StreakStatus from '../StreakStatus';
import TeamStreakStatus from '../TeamStreakStatus';

interface PopulatedTeamStreak {
    _id: string;
    creatorId: string;
    streakName: string;
    status: StreakStatus;
    teamStreakStatus: TeamStreakStatus;
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
