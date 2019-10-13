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
import { AxiosInstance } from 'axios';
import { streakoidClientFactory } from './streakoidClient';

const { APPLICATION_URL } = getServiceConfig();

export const londonTimezone = 'Europe/London';

export const streakoidClient = streakoidClientFactory(APPLICATION_URL, londonTimezone);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const streakoidFactory = (streakoidClient: AxiosInstance) => {
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
