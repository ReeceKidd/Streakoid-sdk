import StreakTypes from '../StreakTypes';
import StreakTrackingEventTypes from '../StreakTrackingEventTypes';

interface StreakTrackingEvent {
    _id: string;
    type: StreakTrackingEventTypes;
    streakId: string;
    streakType: StreakTypes;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export default StreakTrackingEvent;
