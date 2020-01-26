import { completeSoloStreakTasks } from './completeSoloStreakTasks';
import { incompleteSoloStreakTasks } from './incompleteSoloStreakTasks';
import { completeTeamMemberStreakTasks } from './completeTeamMemberStreakTasks';
import { incompleteTeamMemberStreakTasks } from './incompleteTeamMemberStreakTasks';
import { soloStreaks } from './soloStreaks';
import { stripe } from './stripe';
import { users } from './users';
import { user } from './user';
import { teamStreaks, TeamStreaks } from './teamStreaks';
import { streakTrackingEvents } from './streakTrackingEvents';
import { feedbacks } from './feedbacks';
import { dailyJobs } from './dailyJobs';
import { completeTeamStreaks } from './completeTeamStreaks';
import { teamMemberStreaks } from './teamMemberStreaks';
import { friendRequests } from './friendRequests';
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
import { activities } from './activities';

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
    teamStreaks: TeamStreaks;
    streakTrackingEvents: ReturnType<typeof streakTrackingEvents>;
    feedbacks: ReturnType<typeof feedbacks>;
    teamMemberStreaks: ReturnType<typeof teamMemberStreaks>;
    friendRequests: ReturnType<typeof friendRequests>;
    dailyJobs: ReturnType<typeof dailyJobs>;
    emails: ReturnType<typeof emails>;
    streakRecommendations: ReturnType<typeof streakRecommendations>;
    badges: ReturnType<typeof badges>;
    challenges: ReturnType<typeof challenges>;
    challengeStreaks: ReturnType<typeof challengeStreaks>;
    notes: ReturnType<typeof notes>;
    activities: ReturnType<typeof activities>;
}

export const streakoidFactory = (streakoidClient: AxiosInstance): StreakoidFactory => {
    return {
        completeSoloStreakTasks: completeSoloStreakTasks(streakoidClient),
        incompleteSoloStreakTasks: incompleteSoloStreakTasks(streakoidClient),
        completeTeamMemberStreakTasks: completeTeamMemberStreakTasks(streakoidClient),
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
        friendRequests: friendRequests(streakoidClient),
        dailyJobs: dailyJobs(streakoidClient),
        emails: emails(streakoidClient),
        streakRecommendations: streakRecommendations(streakoidClient),
        badges: badges(streakoidClient),
        challenges: challenges(streakoidClient),
        challengeStreaks: challengeStreaks(streakoidClient),
        completeChallengeStreakTasks: completeChallengeStreakTasks(streakoidClient),
        incompleteChallengeStreakTasks: incompleteChalllengeStreakTasks(streakoidClient),
        notes: notes(streakoidClient),
        activities: activities(streakoidClient),
    };
};

export const streakoid = streakoidFactory(streakoidClient);
