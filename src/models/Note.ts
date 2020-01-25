import { StreakTypes } from '..';

interface Note {
    _id: string;
    userId: string;
    streakId: string;
    streakType: StreakTypes;
    text: string;
    updatedAt: string;
    createdAt: string;
}

export default Note;
