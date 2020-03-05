import CurrentStreak from './CurrentStreak';

interface ChallengeMember {
    username: string;
    userId: string;
    profileImage: string;
    currentStreak: CurrentStreak;
    longestPastStreak: number;
}

export default ChallengeMember;
