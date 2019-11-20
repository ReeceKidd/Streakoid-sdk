import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

interface Badge {
    _id: string;
    name: string;
    description: string;
    levels: Array<{ _id: string; level: number; criteria: string; color: string }>;
    icon: FontAwesomeIconProps;
    createdAt: string;
    updatedAt: string;
}

export default Badge;
