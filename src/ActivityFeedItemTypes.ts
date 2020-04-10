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
    editedTeamStreakName = 'editedTeamStreakName',
    editedTeamStreakDescription = 'editedTeamStreakDescription',
    completedTeamMemberStreak = 'completedTeamMemberStreak',
    incompletedTeamMemberStreak = 'incompletedTeamMemberStreak',
    joinedTeamStreak = 'joinedTeamStreak',
    lostTeamStreak = 'lostTeamStreak',
    // User
    createdAccount = 'createdAccount',
    followedUser = 'followedUser',
}

export default ActivityFeedItemTypes;
