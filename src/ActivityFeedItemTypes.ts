export enum ActivityFeedItemTypes {
    // Solo Streak
    createdSoloStreak = 'createdSoloStreak',
    archivedSoloStreak = 'archivedSoloStreak',
    restoredSoloStreak = 'restoredSoloStreak',
    deletedSoloStreak = 'deletedSoloStreak',
    editedSoloStreakName = 'editedSoloStreakName',
    editedSoloStreakDescription = 'editedSoloStreakDescription',
    completedSoloStreak = 'completedSoloStreak',
    incompletedSoloStreak = 'incompletedSoloStreak',
    //Challenge Streak
    completedChallengeStreak = 'completedChallengeStreak',
    incompletedChallengeStreak = 'incompletedChallengeStreak',
    joinedChallenge = 'joinedChallenge',
    archivedChallengeStreak = 'archivedChallengeStreak',
    restoredChallengeStreak = 'restoreChallengeStreak',
    deletedChallengeStreak = 'deletedChallengeStreak',
    unlockedNewBadge = 'unlockedNewBadge',
    //Team Streak
    createdTeamStreak = 'createdTeamStreak',
    archivedTeamStreak = 'archivedTeamStreak',
    restoredTeamStreak = 'restoredTeamStreak',
    deletedTeamStreak = 'deletedTeamStreak',
    completedTeamMemberStreak = 'completedTeamMemberStreak',
    incompletedTeamMemberStreak = 'incompletedTeamMemberStreak',
    lostTeamStreak = 'lostTeamStreak',
    joinedTeamStreak = 'joinedTeamStreak',
    editedTeamStreakName = 'editedTeamStreakName',
    editedTeamStreakDescription = 'editedTeamStreakDescription',
    //General
    addedNewFriend = 'addedNewFriend',
}

export default ActivityFeedItemTypes;
