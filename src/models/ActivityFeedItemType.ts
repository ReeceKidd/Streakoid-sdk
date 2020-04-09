import ActivityFeedItemTypes from '../ActivityFeedItemTypes';

interface CreatedSoloStreakActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.createdSoloStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface ArchivedSoloStreakActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.archivedSoloStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface RestoredSoloStreakActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.restoredSoloStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface DeletedSoloStreakActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.deletedSoloStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface EditedSoloStreakNameActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.editedSoloStreakName;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface EditedSoloStreakDescriptionActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.editedSoloStreakDescription;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface CompletedSoloStreakActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.completedSoloStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface IncompletedSoloStreakActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.incompletedSoloStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface LostSoloStreakActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.lostSoloStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface CompletedChallengeStreakActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.completedChallengeStreak;
    userId: string;
    username: string;
    challengeStreakId: string;
    challengeId: string;
    challengeName: string;
}

interface IncompletedChallengeStreakActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.incompletedChallengeStreak;
    userId: string;
    username: string;
    challengeStreakId: string;
    challengeId: string;
    challengeName: string;
}

interface JoinedChallengeActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.joinedChallenge;
    userId: string;
    username: string;
    challengeStreakId: string;
    challengeId: string;
    challengeName: string;
}

interface ArchivedChallengeStreakActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.archivedChallengeStreak;
    userId: string;
    username: string;
    challengeStreakId: string;
    challengeId: string;
    challengeName: string;
}

interface RestoredChallengeStreakActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.restoredChallengeStreak;
    userId: string;
    username: string;
    challengeStreakId: string;
    challengeId: string;
    challengeName: string;
}

interface DeletedChallengeStreakActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.deletedChallengeStreak;
    userId: string;
    username: string;
    challengeStreakId: string;
    challengeId: string;
    challengeName: string;
}

interface LostChallengeStreakActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.lostChallengeStreak;
    userId: string;
    username: string;
    challengeStreakId: string;
    challengeId: string;
    challengeName: string;
}

interface CreatedTeamStreakActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.createdTeamStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface ArchivedTeamStreakActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.archivedTeamStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface RestoredTeamStreakActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.restoredTeamStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface DeletedTeamStreakActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.deletedTeamStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface CompletedTeamMemberStreakActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.completedTeamMemberStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface IncompletedTeamMemberStreakActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.incompletedTeamMemberStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface JoinedTeamStreakActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.joinedTeamStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface EditedTeamStreakNameActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.editedTeamStreakName;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface EditedTeamStreakDescriptionActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.editedTeamStreakDescription;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface LostTeamStreakActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.lostTeamStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface CreatedAccountActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.createdAccount;
    userId: string;
    username: string;
}

interface FollowedUserActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.followedUser;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
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
