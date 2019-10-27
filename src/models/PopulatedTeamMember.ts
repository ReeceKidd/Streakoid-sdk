import TeamMemberStreak from './TeamMemberStreak';

interface PopulatedTeamMember {
    _id: string;
    username: string;
    profileImage: string;
    teamMemberStreak: TeamMemberStreak;
}

export default PopulatedTeamMember;
