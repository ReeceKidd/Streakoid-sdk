interface Challenge {
    _id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    badgeId: string;
    levels: { _id: string; level: number; badgeId: string; criteria: string }[];
    members: string[];
    numberOfMembers: number;
    createdAt: string;
    updatedAt: string;
    numberOfMinutes?: number;
}

export default Challenge;
