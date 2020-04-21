interface Challenge {
    _id: string;
    name: string;
    displayName: string;
    description: string;
    members: string[];
    numberOfMembers: number;
    createdAt: string;
    updatedAt: string;
    icon?: string;
    color?: string;
    numberOfMinutes?: number;
    whatsappGroupLink?: string;
    discordGroupLink?: string;
}

export default Challenge;
