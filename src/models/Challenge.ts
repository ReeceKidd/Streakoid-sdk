interface Challenge {
    _id: string;
    name: string;
    description: string;
    color: string;
    icon: string;
    members: string[];
    numberOfMembers: number;
    createdAt: string;
    updatedAt: string;
    numberOfMinutes?: number;
    whatsappGroupLink?: string;
    discordGroupLink?: string;
}

export default Challenge;
