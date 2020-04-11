import ActivityFeedItemTypes from '../ActivityFeedItemTypes';

export interface CreatedSoloStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.createdSoloStreak;
    userId: string;
    username: string;
    userProfileImage: string;
    soloStreakId: string;
    soloStreakName: string;
}

export interface ArchivedSoloStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.archivedSoloStreak;
    userId: string;
    username: string;
    userProfileImage: string;
    soloStreakId: string;
    soloStreakName: string;
}

export interface RestoredSoloStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.restoredSoloStreak;
    userId: string;
    username: string;
    userProfileImage: string;
    soloStreakId: string;
    soloStreakName: string;
}

export interface DeletedSoloStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.deletedSoloStreak;
    userId: string;
    username: string;
    userProfileImage: string;
    soloStreakId: string;
    soloStreakName: string;
}

export interface EditedSoloStreakNameActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.editedSoloStreakName;
    userId: string;
    username: string;
    userProfileImage: string;
    soloStreakId: string;
    soloStreakName: string;
}

export interface EditedSoloStreakDescriptionActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.editedSoloStreakDescription;
    userId: string;
    username: string;
    userProfileImage: string;
    soloStreakId: string;
    soloStreakName: string;
}

export interface CompletedSoloStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.completedSoloStreak;
    userId: string;
    username: string;
    userProfileImage: string;
    soloStreakId: string;
    soloStreakName: string;
}

export interface IncompletedSoloStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.incompletedSoloStreak;
    userId: string;
    username: string;
    userProfileImage: string;
    soloStreakId: string;
    soloStreakName: string;
}

export interface LostSoloStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.lostSoloStreak;
    userId: string;
    username: string;
    userProfileImage: string;
    soloStreakId: string;
    soloStreakName: string;
    numberOfDaysLost: number;
}

export interface CompletedChallengeStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.completedChallengeStreak;
    userId: string;
    username: string;
    userProfileImage: string;
    challengeStreakId: string;
    challengeId: string;
    challengeName: string;
}

export interface IncompletedChallengeStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.incompletedChallengeStreak;
    userId: string;
    username: string;
    userProfileImage: string;
    challengeStreakId: string;
    challengeId: string;
    challengeName: string;
}

export interface JoinedChallengeActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.joinedChallenge;
    userId: string;
    username: string;
    userProfileImage: string;
    challengeStreakId: string;
    challengeId: string;
    challengeName: string;
}

export interface ArchivedChallengeStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.archivedChallengeStreak;
    userId: string;
    username: string;
    userProfileImage: string;
    challengeStreakId: string;
    challengeId: string;
    challengeName: string;
}

export interface RestoredChallengeStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.restoredChallengeStreak;
    userId: string;
    username: string;
    userProfileImage: string;
    challengeStreakId: string;
    challengeId: string;
    challengeName: string;
}

export interface DeletedChallengeStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.deletedChallengeStreak;
    userId: string;
    username: string;
    userProfileImage: string;
    challengeStreakId: string;
    challengeId: string;
    challengeName: string;
}

export interface LostChallengeStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.lostChallengeStreak;
    userId: string;
    username: string;
    userProfileImage: string;
    challengeStreakId: string;
    challengeId: string;
    challengeName: string;
    numberOfDaysLost: number;
}

export interface CreatedTeamStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.createdTeamStreak;
    userId: string;
    username: string;
    userProfileImage: string;
    teamStreakId: string;
    teamStreakName: string;
}

export interface ArchivedTeamStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.archivedTeamStreak;
    userId: string;
    username: string;
    userProfileImage: string;
    teamStreakId: string;
    teamStreakName: string;
}

export interface RestoredTeamStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.restoredTeamStreak;
    userId: string;
    username: string;
    userProfileImage: string;
    teamStreakId: string;
    teamStreakName: string;
}

export interface DeletedTeamStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.deletedTeamStreak;
    userId: string;
    username: string;
    userProfileImage: string;
    teamStreakId: string;
    teamStreakName: string;
}

export interface CompletedTeamMemberStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.completedTeamMemberStreak;
    userId: string;
    username: string;
    userProfileImage: string;
    teamStreakId: string;
    teamStreakName: string;
}

export interface IncompletedTeamMemberStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.incompletedTeamMemberStreak;
    userId: string;
    username: string;
    userProfileImage: string;
    teamStreakId: string;
    teamStreakName: string;
}

export interface JoinedTeamStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.joinedTeamStreak;
    userId: string;
    username: string;
    userProfileImage: string;
    teamStreakId: string;
    teamStreakName: string;
}

export interface EditedTeamStreakNameActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.editedTeamStreakName;
    userId: string;
    username: string;
    userProfileImage: string;
    teamStreakId: string;
    teamStreakName: string;
}

export interface EditedTeamStreakDescriptionActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.editedTeamStreakDescription;
    userId: string;
    username: string;
    userProfileImage: string;
    teamStreakId: string;
    teamStreakName: string;
}

export interface LostTeamStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.lostTeamStreak;
    userId: string;
    username: string;
    userProfileImage: string;
    teamStreakId: string;
    teamStreakName: string;
    numberOfDaysLost: number;
}

export interface CreatedAccountActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.createdAccount;
    userId: string;
    username: string;
    userProfileImage: string;
}

export interface FollowedUserActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.followedUser;
    userId: string;
    username: string;
    userProfileImage: string;
    userFollowedId: string;
    userFollowedUsername: string;
}

type ActivityFeedItemType =
    | CreatedSoloStreakActivityFeedItem
    | ArchivedSoloStreakActivityFeedItem
    | RestoredSoloStreakActivityFeedItem
    | DeletedSoloStreakActivityFeedItem
    | EditedSoloStreakNameActivityFeedItem
    | EditedSoloStreakDescriptionActivityFeedItem
    | CompletedSoloStreakActivityFeedItem
    | IncompletedSoloStreakActivityFeedItem
    | LostSoloStreakActivityFeedItem
    | CompletedChallengeStreakActivityFeedItem
    | IncompletedChallengeStreakActivityFeedItem
    | JoinedChallengeActivityFeedItem
    | ArchivedChallengeStreakActivityFeedItem
    | RestoredChallengeStreakActivityFeedItem
    | DeletedChallengeStreakActivityFeedItem
    | LostChallengeStreakActivityFeedItem
    | CreatedTeamStreakActivityFeedItem
    | ArchivedTeamStreakActivityFeedItem
    | RestoredTeamStreakActivityFeedItem
    | DeletedTeamStreakActivityFeedItem
    | CompletedTeamMemberStreakActivityFeedItem
    | IncompletedTeamMemberStreakActivityFeedItem
    | JoinedTeamStreakActivityFeedItem
    | EditedTeamStreakNameActivityFeedItem
    | EditedTeamStreakDescriptionActivityFeedItem
    | LostTeamStreakActivityFeedItem
    | CreatedAccountActivityFeedItem
    | FollowedUserActivityFeedItem;

export default ActivityFeedItemType;
