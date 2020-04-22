type AcheivementEventType = UnlockedAcheivement;

interface UnlockedAcheivement {
    _id: string;
    streakId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export default AcheivementEventType;
