import BadgeTypes from '../BadgeTypes';

interface Badge {
    _id: string;
    name: string;
    description: string;
    badgeType: BadgeTypes;
    icon: string;
    createdAt: string;
    updatedAt: string;
    challengeId?: string;
}

export default Badge;
