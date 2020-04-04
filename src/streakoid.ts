import { completeSoloStreakTasks } from './completeSoloStreakTasks';
import { incompleteSoloStreakTasks } from './incompleteSoloStreakTasks';
import { completeTeamMemberStreakTasks } from './completeTeamMemberStreakTasks';
import { incompleteTeamMemberStreakTasks } from './incompleteTeamMemberStreakTasks';
import { soloStreaks } from './soloStreaks';
import { stripe } from './stripe';
import { users } from './users';
import { user } from './user';
import { teamStreaks } from './teamStreaks';
import { streakTrackingEvents } from './streakTrackingEvents';
import { feedbacks } from './feedbacks';
import { dailyJobs } from './dailyJobs';
import { completeTeamStreaks } from './completeTeamStreaks';
import { teamMemberStreaks } from './teamMemberStreaks';
import { streakRecommendations } from './streakRecommendations';
import { badges } from './badges';
import { challenges } from './challenges';
import { challengeStreaks } from './challengeStreak';

import { AxiosInstance } from 'axios';
import { streakoidClientFactory } from './streakoidClient';
import { emails } from './emails';
import { incompleteTeamStreaks } from './incompleteTeamStreaks';
import { completeChallengeStreakTasks } from './completeChallengeStreakTask';
import { incompleteChalllengeStreakTasks } from './incompleteChallengeStreakTask';
import { notes } from './notes';
import { activityFeedItems } from './activityFeedItems';
import { databaseStats } from './databaseStats';

export const londonTimezone = 'Europe/London';

const applicationUrl = 'http://localhost:3001';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const streakoidClient = streakoidClientFactory(applicationUrl, londonTimezone);

export interface StreakoidFactory {
    completeSoloStreakTasks: ReturnType<typeof completeSoloStreakTasks>;
    incompleteSoloStreakTasks: ReturnType<typeof incompleteSoloStreakTasks>;
    completeTeamMemberStreakTasks: ReturnType<typeof completeTeamMemberStreakTasks>;
    incompleteTeamMemberStreakTasks: ReturnType<typeof incompleteTeamMemberStreakTasks>;
    completeTeamStreaks: ReturnType<typeof completeTeamStreaks>;
    incompleteTeamStreaks: ReturnType<typeof incompleteTeamStreaks>;
    completeChallengeStreakTasks: ReturnType<typeof completeChallengeStreakTasks>;
    incompleteChallengeStreakTasks: ReturnType<typeof incompleteChalllengeStreakTasks>;
    soloStreaks: ReturnType<typeof soloStreaks>;
    stripe: ReturnType<typeof stripe>;
    users: ReturnType<typeof users>;
    user: ReturnType<typeof user>;
    teamStreaks: ReturnType<typeof teamStreaks>;
    streakTrackingEvents: ReturnType<typeof streakTrackingEvents>;
    feedbacks: ReturnType<typeof feedbacks>;
    teamMemberStreaks: ReturnType<typeof teamMemberStreaks>;
    dailyJobs: ReturnType<typeof dailyJobs>;
    emails: ReturnType<typeof emails>;
    streakRecommendations: ReturnType<typeof streakRecommendations>;
    badges: ReturnType<typeof badges>;
    challenges: ReturnType<typeof challenges>;
    challengeStreaks: ReturnType<typeof challengeStreaks>;
    notes: ReturnType<typeof notes>;
    activityFeedItems: ReturnType<typeof activityFeedItems>;
    databaseStats: ReturnType<typeof databaseStats>;
}

export const streakoidFactory = (streakoidClient: AxiosInstance): StreakoidFactory => {
    return {
        completeSoloStreakTasks: completeSoloStreakTasks(streakoidClient),
        incompleteSoloStreakTasks: incompleteSoloStreakTasks(streakoidClient),
        completeTeamMemberStreakTasks: completeTeamMemberStreakTasks(streakoidClient),
        completeChallengeStreakTasks: completeChallengeStreakTasks(streakoidClient),
        incompleteChallengeStreakTasks: incompleteChalllengeStreakTasks(streakoidClient),
        incompleteTeamMemberStreakTasks: incompleteTeamMemberStreakTasks(streakoidClient),
        completeTeamStreaks: completeTeamStreaks(streakoidClient),
        incompleteTeamStreaks: incompleteTeamStreaks(streakoidClient),
        soloStreaks: soloStreaks(streakoidClient),
        stripe: stripe(streakoidClient),
        users: users(streakoidClient),
        user: user(streakoidClient),
        teamStreaks: teamStreaks(streakoidClient),
        streakTrackingEvents: streakTrackingEvents(streakoidClient),
        feedbacks: feedbacks(streakoidClient),
        teamMemberStreaks: teamMemberStreaks(streakoidClient),
        dailyJobs: dailyJobs(streakoidClient),
        emails: emails(streakoidClient),
        streakRecommendations: streakRecommendations(streakoidClient),
        badges: badges(streakoidClient),
        challenges: challenges(streakoidClient),
        challengeStreaks: challengeStreaks(streakoidClient),
        notes: notes(streakoidClient),
        activityFeedItems: activityFeedItems(streakoidClient),
        databaseStats: databaseStats(streakoidClient),
    };
};

export const streakoid = streakoidFactory(streakoidClient);
