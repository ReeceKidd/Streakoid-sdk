import ActivityFeedItemTypes from '../ActivityFeedItemTypes';

interface ActivityFeedItem {
    _id: string;
    createdAt: string;
    updatedAt: string;
}

interface CreatedSoloStreakActivityFeedItem extends ActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.createdSoloStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface ArchivedSoloStreakActivityFeedItem extends ActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.archivedSoloStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface RestoredSoloStreakActivityFeedItem extends ActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.restoredSoloStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface DeletedSoloStreakActivityFeedItem extends ActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.deletedSoloStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface EditedSoloStreakNameActivityFeedItem extends ActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.editedSoloStreakName;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface EditedSoloStreakDescriptionActivityFeedItem extends ActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.editedSoloStreakDescription;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface CompletedSoloStreakActivityFeedItem extends ActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.completedSoloStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface IncompletedSoloStreakActivityFeedItem extends ActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.incompletedSoloStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface LostSoloStreakActivityFeedItem extends ActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.lostSoloStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface CompletedChallengeStreakActivityFeedItem extends ActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.completedChallengeStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface IncompletedChallengeStreakActivityFeedItem extends ActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.incompletedChallengeStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface JoinedChallengeActivityFeedItem extends ActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.joinedChallenge;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface ArchivedChallengeStreakActivityFeedItem extends ActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.archivedChallengeStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface RestoredChallengeStreakActivityFeedItem extends ActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.restoredChallengeStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface DeletedChallengeStreakActivityFeedItem extends ActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.deletedChallengeStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface LostChallengeStreakActivityFeedItem extends ActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.lostChallengeStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface CreatedTeamStreakActivityFeedItem extends ActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.createdTeamStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface ArchivedTeamStreakActivityFeedItem extends ActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.archivedTeamStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface RestoredTeamStreakActivityFeedItem extends ActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.restoredTeamStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface DeletedTeamStreakActivityFeedItem extends ActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.deletedTeamStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface CompletedTeamMemberStreakActivityFeedItem extends ActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.completedTeamMemberStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface IncompletedTeamMemberStreakActivityFeedItem extends ActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.incompletedTeamMemberStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface JoinedTeamStreakActivityFeedItem extends ActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.joinedTeamStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface EditedTeamStreakNameActivityFeedItem extends ActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.editedTeamStreakName;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface EditedTeamStreakDescriptionActivityFeedItem extends ActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.editedTeamStreakDescription;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface LostTeamStreakActivityFeedItem extends ActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.lostTeamStreak;
    userId: string;
    username: string;
    subjectId: string;
    subjectName: string;
}

interface CreatedAccountActivityFeedItem extends ActivityFeedItem {
    acitivityFeedItemType: typeof ActivityFeedItemTypes.createdAccount;
    userId: string;
    username: string;
}

interface FollowedUserActivityFeedItem extends ActivityFeedItem {
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
