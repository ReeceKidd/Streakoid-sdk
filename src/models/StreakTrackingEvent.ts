import StreakTypes from '../streakTypes';
import GroupStreakTypes from '../GroupStreakTypes';

interface StreakTrackingEvent {
    _id: string;
    type: StreakTrackingEvent;
    streakId: string;
    streakType: StreakTypes;
    userId: string;
    createdAt: string;
    updatedAt: string;
    groupStreakType: GroupStreakTypes;
}

export default StreakTrackingEvent;
