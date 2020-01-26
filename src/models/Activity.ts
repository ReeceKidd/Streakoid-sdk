import ActivityTypes from '../ActivityTypes';

interface Activity {
    _id: string;
    activityType: ActivityTypes;
    createdAt: string;
    updatedAt: string;
    userId?: string;
    streakId?: string;
}

export default Activity;
