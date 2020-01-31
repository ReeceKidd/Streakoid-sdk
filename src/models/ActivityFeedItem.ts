import ActivityFeedItemTypes from '../ActivityFeedItemTypes';

interface ActivityFeedItem {
    _id: string;
    activityFeedItemType: ActivityFeedItemTypes;
    createdAt: string;
    updatedAt: string;
    userId: string;
    subjectId: string;
}

export default ActivityFeedItem;
