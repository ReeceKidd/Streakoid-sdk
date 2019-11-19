interface Badge {
    _id: string;
    name: string;
    currentLevel: number;
    description: string;
    levels: Array<{ level: number; criteria: string }>;
    color: string;
    icon: string;
}

export default Badge;
