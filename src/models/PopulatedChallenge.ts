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
    topUserForChallenge: {
        userId: string;
        username: string;
        profileImage: string;
    };
    numberOfMinutes?: number;
}

export default PopulatedChallenge;
