import PopulatedMember from "./PopulatedMember";

interface PopulatedGroupStreak {
  creatorId: string;
  streakName: string;
  streakDescription: string;
  numberOfMinutes: number;
  members: PopulatedMember[];
  timezone: string;
  creator: {
    _id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default PopulatedGroupStreak;
