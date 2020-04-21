import ChallengeMember from './ChallengeMember';

interface PopulatedChallenge {
    _id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    members: ChallengeMember[];
    numberOfMembers: number;
    createdAt: string;
    updatedAt: string;
    numberOfMinutes?: number;
    whatsappGroupLink?: string;
    discordGroupLink?: string;
}

export default PopulatedChallenge;
