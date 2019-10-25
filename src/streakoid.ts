import { completeSoloStreakTasks } from './completeSoloStreakTasks';
import { incompleteSoloStreakTasks } from './incompleteSoloStreakTasks';
import { completeTeamMemberStreakTasks } from './completeTeamMemberStreakTasks';
import { incompleteTeamMemberStreakTasks } from './incompleteTeamMemberStreakTasks';
import { soloStreaks } from './soloStreaks';
import { stripe } from './stripe';
import { users, Users } from './users';
import { teamStreaks, TeamStreaks } from './teamStreaks';
import { streakTrackingEvents } from './streakTrackingEvents';
import { feedbacks } from './feedbacks';
import { dailyJobs } from './dailyJobs';
import { completeTeamStreaks } from './completeTeamStreaks';
import { teamMemberStreaks } from './teamMemberStreaks';
import { friendRequests } from './friendRequests';

import { AxiosInstance } from 'axios';
import { streakoidClientFactory } from './streakoidClient';
import { emails } from './emails';

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
    soloStreaks: ReturnType<typeof soloStreaks>;
    stripe: ReturnType<typeof stripe>;
    users: Users;
    teamStreaks: TeamStreaks;
    streakTrackingEvents: ReturnType<typeof streakTrackingEvents>;
    feedbacks: ReturnType<typeof feedbacks>;
    teamMemberStreaks: ReturnType<typeof teamMemberStreaks>;
    friendRequests: ReturnType<typeof friendRequests>;
    dailyJobs: ReturnType<typeof dailyJobs>;
    emails: ReturnType<typeof emails>;
}

export const streakoidFactory = (streakoidClient: AxiosInstance): StreakoidFactory => {
    return {
        completeSoloStreakTasks: completeSoloStreakTasks(streakoidClient),
        incompleteSoloStreakTasks: incompleteSoloStreakTasks(streakoidClient),
        completeTeamMemberStreakTasks: completeTeamMemberStreakTasks(streakoidClient),
        incompleteTeamMemberStreakTasks: incompleteTeamMemberStreakTasks(streakoidClient),
        completeTeamStreaks: completeTeamStreaks(streakoidClient),
        soloStreaks: soloStreaks(streakoidClient),
        stripe: stripe(streakoidClient),
        users: users(streakoidClient),
        teamStreaks: teamStreaks(streakoidClient),
        streakTrackingEvents: streakTrackingEvents(streakoidClient),
        feedbacks: feedbacks(streakoidClient),
        teamMemberStreaks: teamMemberStreaks(streakoidClient),
        friendRequests: friendRequests(streakoidClient),
        dailyJobs: dailyJobs(streakoidClient),
        emails: emails(streakoidClient),
    };
};

export const streakoid = streakoidFactory(streakoidClient);
