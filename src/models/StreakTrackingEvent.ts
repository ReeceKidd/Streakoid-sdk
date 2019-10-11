import StreakTypes from '../StreakTypes';
import GroupStreakTypes from '../GroupStreakTypes';
import StreakTrackingEventTypes from '../StreakTrackingEventTypes';

interface StreakTrackingEvent {
    _id: string;
    type: StreakTrackingEventTypes;
    streakId: string;
    streakType: StreakTypes;
    userId: string;
    createdAt: string;
    updatedAt: string;
    groupStreakType: GroupStreakTypes;
}

export default StreakTrackingEvent;
