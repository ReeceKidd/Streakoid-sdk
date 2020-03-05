import ChallengeMember from './ChallengeMember';

interface PopulatedChallenge {
    _id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    badgeId: string;
    levels: { _id: string; level: number; badgeId: string; criteria: string }[];
    members: ChallengeMember[];
    createdAt: string;
    updatedAt: string;
    longestCurrentStreakForChallenge: number;
    longestEverStreakForChallenge: number;
    challengeMemberWithLongestStreakForChallenge: ChallengeMember;
    numberOfMinutes?: number;
}

export default PopulatedChallenge;
