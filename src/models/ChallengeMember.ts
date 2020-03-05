import CurrentStreak from './CurrentStreak';

interface ChallengeMember {
    username: string;
    userId: string;
    profileImage: string;
    currentStreak: CurrentStreak;
    longestStreak: number;
}

export default ChallengeMember;
