import ActivityFeedItemTypes from '../ActivityFeedItemTypes';

interface ActivityFeedItem {
    _id: string;
    activityFeedItemType: ActivityFeedItemTypes;
    createdAt: string;
    updatedAt: string;
    userId: string;
    username: string;
    subjectId?: string;
    subjectName?: string;
    parentSubjectId?: string;
    parentSubjectName?: string;
}

export default ActivityFeedItem;
