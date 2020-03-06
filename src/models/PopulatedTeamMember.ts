import TeamMemberStreak from './TeamMemberStreak';

interface PopulatedTeamMember {
    _id: string;
    teamMemberStreakId: string;
    username: string;
    profileImage: string;
    teamMemberStreak: TeamMemberStreak;
}

export default PopulatedTeamMember;
