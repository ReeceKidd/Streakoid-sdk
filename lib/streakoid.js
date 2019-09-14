"use strict";
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var completeSoloStreakTasks_1 = __importDefault(
  require("./completeSoloStreakTasks")
);
var completeGroupMemberStreakTasks_1 = __importDefault(
  require("./completeGroupMemberStreakTasks")
);
var soloStreaks_1 = __importDefault(require("./soloStreaks"));
var stripe_1 = __importDefault(require("./stripe"));
var users_1 = __importDefault(require("./users"));
var friends_1 = __importDefault(require("./friends"));
var groupStreaks_1 = __importDefault(require("./groupStreaks"));
var streakTrackingEvents_1 = __importDefault(require("./streakTrackingEvents"));
var agendaJobs_1 = __importDefault(require("./agendaJobs"));
var feedbacks_1 = __importDefault(require("./feedbacks"));
var groupMemberStreaks_1 = __importDefault(require("./groupMemberStreaks"));
var getServiceConfig_1 = require("./getServiceConfig");
var APPLICATION_URL = getServiceConfig_1.getServiceConfig().APPLICATION_URL;
var streakoidFactory = function(applicationUrl) {
  if (!applicationUrl) {
    throw new Error("You must define an applicationUrl");
  }
  return {
    completeSoloStreakTasks: completeSoloStreakTasks_1.default(applicationUrl),
    completeGroupMemberStreakTasks: completeGroupMemberStreakTasks_1.default(
      applicationUrl
    ),
    soloStreaks: soloStreaks_1.default(applicationUrl),
    stripe: stripe_1.default(applicationUrl),
    users: __assign(__assign({}, users_1.default(applicationUrl)), {
      friends: friends_1.default(applicationUrl)
    }),
    groupStreaks: groupStreaks_1.default(applicationUrl),
    streakTrackingEvents: streakTrackingEvents_1.default(applicationUrl),
    agendaJobs: agendaJobs_1.default(applicationUrl),
    feedbacks: feedbacks_1.default(applicationUrl),
    groupMemberStreaks: groupMemberStreaks_1.default(applicationUrl)
  };
};
exports.default = streakoidFactory;
exports.streakoid = streakoidFactory(APPLICATION_URL);
// Continue work on the SDK tests should the intergration tests be moved here as well so the route can be tested with the SDK ? I'm not sure.
// Keep coding and add the types to the calls instead of returning the axios response.
// Yes intergration tests should be from here because that way everything can be checked to be working.This should just point to my local host though.
// Move intergration tests and see what breaks. I could just store the types on the SDK and then import it from theimport { version } from "@babel/core";
//  SDK to the server to make sure the types
// are always the same. I then just need to make sure the front end and backend are using the same version.
//# sourceMappingURL=streakoid.js.map
