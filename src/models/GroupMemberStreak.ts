import StreakTrackingEventType from '../streakTrackingEventType';

interface GroupMemberStreak {
    _id: string;
    userId: string;
    teamStreakId: string;
    completedToday: boolean;
    active: boolean;
    activity: Array<{
        type: StreakTrackingEventType;
        time: string;
    }>;
    currentStreak: {
        startDate: string;
        numberOfDaysInARow: number;
        endDate: string;
    };
    pastStreaks: Array<{
        endDate: string;
        startDate: string;
        numberOfDaysInARow: number;
    }>;
    timezone: string;
    createdAt: string;
    updatedAt: string;
}

export default GroupMemberStreak;
