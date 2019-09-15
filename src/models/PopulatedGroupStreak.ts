import PopulatedMember from "./PopulatedMember";

interface PopulatedGroupStreak {
  _id: string;
  creatorId: string;
  streakName: string;
  members: PopulatedMember[];
  timezone: string;
  creator: {
    _id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
  streakDescription?: string;
  numberOfMinutes?: number;
}

export default PopulatedGroupStreak;
