import completeSoloStreakTasks from "./completeSoloStreakTasks";
import completeGroupMemberStreakTasks from "./completeGroupMemberStreakTasks";
import soloStreaks from "./soloStreaks";
import stripe from "./stripe";
import usersFactory from "./users";
import friends from "./friends";
import groupStreaks from "./groupStreaks";
import streakTrackingEvents from "./streakTrackingEvents";
import agendaJobs from "./agendaJobs";
import feedbacks from "./feedbacks";
import groupMemberStreaks from "./groupMemberStreaks";
import { getServiceConfig } from "./getServiceConfig";
import { AxiosInstance } from "axios";
import { streakoidClientFactory } from "./streakoidClient";

const { APPLICATION_URL } = getServiceConfig();

export const streakoidClient = streakoidClientFactory(APPLICATION_URL);

export const streakoidFactory = (streakoidClient: AxiosInstance) => {
  return {
    completeSoloStreakTasks: completeSoloStreakTasks(streakoidClient),
    completeGroupMemberStreakTasks: completeGroupMemberStreakTasks(
      streakoidClient
    ),
    soloStreaks: soloStreaks(streakoidClient),
    stripe: stripe(streakoidClient),
    users: {
      ...usersFactory(streakoidClient),
      friends: friends(streakoidClient)
    },
    groupStreaks: groupStreaks(streakoidClient),
    streakTrackingEvents: streakTrackingEvents(streakoidClient),
    agendaJobs: agendaJobs(streakoidClient),
    feedbacks: feedbacks(streakoidClient),
    groupMemberStreaks: groupMemberStreaks(streakoidClient)
  };
};

export const streakoid = streakoidFactory(streakoidClient);
