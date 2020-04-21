import ChallengeMember from './ChallengeMember';

interface PopulatedChallenge {
    _id: string;
    name: string;
    displayName: string;
    description: string;
    members: ChallengeMember[];
    numberOfMembers: number;
    createdAt: string;
    updatedAt: string;
    icon?: string;
    color?: string;
    numberOfMinutes?: number;
    whatsappGroupLink?: string;
    discordGroupLink?: string;
}

export default PopulatedChallenge;
