interface Badge {
    _id: string;
    parentBadge: Badge;
    name: string;
    description: string;
    color: string;
    icon: string;
    nextLevel?: Badge;
}

export default Badge;
