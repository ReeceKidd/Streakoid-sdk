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
    numberOfMembers: number;
    createdAt: string;
    updatedAt: string;
    numberOfMinutes?: number;
    whatsappGroupLink?: string;
    discordGroupLink?: string;
}

export default PopulatedChallenge;
