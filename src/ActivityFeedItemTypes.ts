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
    lostSoloStreak = 'lostSoloStreak',
    //Challenge Streak
    completedChallengeStreak = 'completedChallengeStreak',
    incompletedChallengeStreak = 'incompletedChallengeStreak',
    joinedChallenge = 'joinedChallenge',
    archivedChallengeStreak = 'archivedChallengeStreak',
    restoredChallengeStreak = 'restoredChallengeStreak',
    deletedChallengeStreak = 'deletedChallengeStreak',
    lostChallengeStreak = 'lostChallengeStreak',
    //Team Streak
    createdTeamStreak = 'createdTeamStreak',
    archivedTeamStreak = 'archivedTeamStreak',
    restoredTeamStreak = 'restoredTeamStreak',
    deletedTeamStreak = 'deletedTeamStreak',
    completedTeamMemberStreak = 'completedTeamMemberStreak',
    incompletedTeamMemberStreak = 'incompletedTeamMemberStreak',
    joinedTeamStreak = 'joinedTeamStreak',
    editedTeamStreakName = 'editedTeamStreakName',
    editedTeamStreakDescription = 'editedTeamStreakDescription',
    lostTeamStreak = 'lostTeamStreak',
    // User
    createdAccount = 'createdAccount',
    followedUser = 'followedAccount',
}

export default ActivityFeedItemTypes;
