import { completeSoloStreakTasks } from './completeSoloStreakTasks';
import { incompleteSoloStreakTasks } from './incompleteSoloStreakTasks';
import { completeGroupMemberStreakTasks } from './completeGroupMemberStreakTasks';
import { incompleteGroupMemberStreakTasks } from './incompleteGroupMemberStreakTasks';
import { soloStreaks } from './soloStreaks';
import { stripe } from './stripe';
import { users } from './users';
import { friends } from './friends';
import { teamStreaks } from './teamStreaks';
import { streakTrackingEvents } from './streakTrackingEvents';
import { agendaJobs } from './agendaJobs';
import { feedbacks } from './feedbacks';
import { dailyJobs } from './dailyJobs';
import { completeTeamStreakTasks } from './completeTeamStreakTasks';
import { groupMemberStreaks } from './groupMemberStreaks';
import { friendRequests } from './friendRequests';

import { getServiceConfig } from './getServiceConfig';
import { AxiosInstance, AxiosResponse } from 'axios';
import { streakoidClientFactory } from './streakoidClient';
import User from './models/User';

const { APPLICATION_URL } = getServiceConfig();

export const londonTimezone = 'Europe/London';

export const streakoidClient = streakoidClientFactory(APPLICATION_URL, londonTimezone);

export interface StreakoidFactory {
    completeSoloStreakTasks: ReturnType<typeof completeSoloStreakTasks>;
    incompleteSoloStreakTasks: ReturnType<typeof incompleteSoloStreakTasks>;
    completeGroupMemberStreakTasks: ReturnType<typeof completeGroupMemberStreakTasks>;
    incompleteGroupMemberStreakTasks: ReturnType<typeof incompleteGroupMemberStreakTasks>;
    completeTeamStreakTasks: ReturnType<typeof completeTeamStreakTasks>;
    soloStreaks: ReturnType<typeof soloStreaks>;
    stripe: ReturnType<typeof stripe>;
    users: {
        getAll: ({
            searchQuery,
            username,
            email,
        }: {
            searchQuery?: string;
            username?: string;
            email?: string;
        }) => Promise<User[]>;
        getOne: (userId: string) => Promise<User>;
        create: ({ username, email }: { username: string; email: string }) => Promise<User>;
        update: ({
            userId,
            updateData,
        }: {
            userId: string;
            updateData?: {
                timezone?: string;
            };
        }) => Promise<User>;
        deleteOne: (userId: string) => Promise<AxiosResponse>;
        friends: ReturnType<typeof friends>;
    };
    teamStreaks: ReturnType<typeof teamStreaks>;
    streakTrackingEvents: ReturnType<typeof streakTrackingEvents>;
    agendaJobs: ReturnType<typeof agendaJobs>;
    feedbacks: ReturnType<typeof feedbacks>;
    groupMemberStreaks: ReturnType<typeof groupMemberStreaks>;
    friendRequests: ReturnType<typeof friendRequests>;
    dailyJobs: ReturnType<typeof dailyJobs>;
}

export const streakoidFactory = (streakoidClient: AxiosInstance): StreakoidFactory => {
    return {
        completeSoloStreakTasks: completeSoloStreakTasks(streakoidClient),
        incompleteSoloStreakTasks: incompleteSoloStreakTasks(streakoidClient),
        completeGroupMemberStreakTasks: completeGroupMemberStreakTasks(streakoidClient),
        incompleteGroupMemberStreakTasks: incompleteGroupMemberStreakTasks(streakoidClient),
        completeTeamStreakTasks: completeTeamStreakTasks(streakoidClient),
        soloStreaks: soloStreaks(streakoidClient),
        stripe: stripe(streakoidClient),
        users: {
            ...users(streakoidClient),
            friends: friends(streakoidClient),
        },
        teamStreaks: teamStreaks(streakoidClient),
        streakTrackingEvents: streakTrackingEvents(streakoidClient),
        agendaJobs: agendaJobs(streakoidClient),
        feedbacks: feedbacks(streakoidClient),
        groupMemberStreaks: groupMemberStreaks(streakoidClient),
        friendRequests: friendRequests(streakoidClient),
        dailyJobs: dailyJobs(streakoidClient),
    };
};

export const streakoid = streakoidFactory(streakoidClient);
