import ActivityFeedItemTypes from '../ActivityFeedItemTypes';

interface CreatedSoloStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.createdSoloStreak;
    userId: string;
    username: string;
    soloStreakId: string;
    soloStreakName: string;
}

interface ArchivedSoloStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.archivedSoloStreak;
    userId: string;
    username: string;
    soloStreakId: string;
    soloStreakName: string;
}

interface RestoredSoloStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.restoredSoloStreak;
    userId: string;
    username: string;
    soloStreakId: string;
    soloStreakName: string;
}

interface DeletedSoloStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.deletedSoloStreak;
    userId: string;
    username: string;
    soloStreakId: string;
    soloStreakName: string;
}

interface EditedSoloStreakNameActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.editedSoloStreakName;
    userId: string;
    username: string;
    soloStreakId: string;
    soloStreakName: string;
}

interface EditedSoloStreakDescriptionActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.editedSoloStreakDescription;
    userId: string;
    username: string;
    soloStreakId: string;
    soloStreakName: string;
}

interface CompletedSoloStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.completedSoloStreak;
    userId: string;
    username: string;
    soloStreakId: string;
    soloStreakName: string;
}

interface IncompletedSoloStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.incompletedSoloStreak;
    userId: string;
    username: string;
    soloStreakId: string;
    soloStreakName: string;
}

interface LostSoloStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.lostSoloStreak;
    userId: string;
    username: string;
    soloStreakId: string;
    soloStreakName: string;
}

interface CompletedChallengeStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.completedChallengeStreak;
    userId: string;
    username: string;
    challengeStreakId: string;
    challengeId: string;
    challengeName: string;
}

interface IncompletedChallengeStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.incompletedChallengeStreak;
    userId: string;
    username: string;
    challengeStreakId: string;
    challengeId: string;
    challengeName: string;
}

interface JoinedChallengeActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.joinedChallenge;
    userId: string;
    username: string;
    challengeStreakId: string;
    challengeId: string;
    challengeName: string;
}

interface ArchivedChallengeStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.archivedChallengeStreak;
    userId: string;
    username: string;
    challengeStreakId: string;
    challengeId: string;
    challengeName: string;
}

interface RestoredChallengeStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.restoredChallengeStreak;
    userId: string;
    username: string;
    challengeStreakId: string;
    challengeId: string;
    challengeName: string;
}

interface DeletedChallengeStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.deletedChallengeStreak;
    userId: string;
    username: string;
    challengeStreakId: string;
    challengeId: string;
    challengeName: string;
}

interface LostChallengeStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.lostChallengeStreak;
    userId: string;
    username: string;
    challengeStreakId: string;
    challengeId: string;
    challengeName: string;
}

interface CreatedTeamStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.createdTeamStreak;
    userId: string;
    username: string;
    teamStreakId: string;
    teamStreakName: string;
}

interface ArchivedTeamStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.archivedTeamStreak;
    userId: string;
    username: string;
    teamStreakId: string;
    teamStreakName: string;
}

interface RestoredTeamStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.restoredTeamStreak;
    userId: string;
    username: string;
    teamStreakId: string;
    teamStreakName: string;
}

interface DeletedTeamStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.deletedTeamStreak;
    userId: string;
    username: string;
    teamStreakId: string;
    teamStreakName: string;
}

interface CompletedTeamMemberStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.completedTeamMemberStreak;
    userId: string;
    username: string;
    teamStreakId: string;
    teamStreakName: string;
}

interface IncompletedTeamMemberStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.incompletedTeamMemberStreak;
    userId: string;
    username: string;
    teamStreakId: string;
    teamStreakName: string;
}

interface JoinedTeamStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.joinedTeamStreak;
    userId: string;
    username: string;
    teamStreakId: string;
    teamStreakName: string;
}

interface EditedTeamStreakNameActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.editedTeamStreakName;
    userId: string;
    username: string;
    teamStreakId: string;
    teamStreakName: string;
}

interface EditedTeamStreakDescriptionActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.editedTeamStreakDescription;
    userId: string;
    username: string;
    teamStreakId: string;
    teamStreakName: string;
}

interface LostTeamStreakActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.lostTeamStreak;
    userId: string;
    username: string;
    teamStreakId: string;
    teamStreakName: string;
}

interface CreatedAccountActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.createdAccount;
    userId: string;
    username: string;
}

interface FollowedUserActivityFeedItem {
    activityFeedItemType: typeof ActivityFeedItemTypes.followedUser;
    userId: string;
    username: string;
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
