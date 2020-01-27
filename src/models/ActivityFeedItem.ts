import ActivityFeedItemTypes from '../ActivityFeedItemTypes';

interface ActivityFeedItem {
    _id: string;
    activityType: ActivityFeedItemTypes;
    createdAt: string;
    updatedAt: string;
    userId?: string;
    streakId?: string;
}

export default ActivityFeedItem;
