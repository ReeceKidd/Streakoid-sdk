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

const { APPLICATION_URL } = getServiceConfig();

const streakoidFactory = (applicationUrl: string) => {

  if (!applicationUrl) {
    throw new Error("You must define an applicationUrl");
  }
  return {
    completeSoloStreakTasks: completeSoloStreakTasks(applicationUrl),
    completeGroupMemberStreakTasks: completeGroupMemberStreakTasks(applicationUrl),
    soloStreaks: soloStreaks(applicationUrl),
    stripe: stripe(applicationUrl),
    users: {
      ...usersFactory(applicationUrl),
      friends: friends(applicationUrl)
    },
    groupStreaks: groupStreaks(applicationUrl),
    streakTrackingEvents: streakTrackingEvents(applicationUrl),
    agendaJobs: agendaJobs(applicationUrl),
    feedbacks: feedbacks(applicationUrl),
    groupMemberStreaks: groupMemberStreaks(applicationUrl)
  };
};

export default streakoidFactory

export const streakoid = streakoidFactory(APPLICATION_URL);

// Continue work on the SDK tests should the intergration tests be moved here as well so the route can be tested with the SDK ? I'm not sure. 
// Keep coding and add the types to the calls instead of returning the axios response.
// Yes intergration tests should be from here because that way everything can be checked to be working.This should just point to my local host though.
// Move intergration tests and see what breaks. I could just store the types on the SDK and then import it from theimport { version } from "@babel/core";
//  SDK to the server to make sure the types 
// are always the same. I then just need to make sure the front end and backend are using the same version. 