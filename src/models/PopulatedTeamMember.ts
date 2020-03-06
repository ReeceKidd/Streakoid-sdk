import { CurrentStreak } from '..';

interface PopulatedTeamMember {
    _id: string;
    teamMemberStreakId: string;
    username: string;
    profileImage: string;
    currentStreak: CurrentStreak;
    longestStreak: number;
    joinedStreak: Date;
}

export default PopulatedTeamMember;
