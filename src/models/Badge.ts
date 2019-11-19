interface Badge {
    _id: string;
    name: string;
    description: string;
    levels: Array<{ _id: string; level: number; criteria: string; color: string }>;
    icon: string;
    createdAt: string;
    updatedAt: string;
}

export default Badge;
