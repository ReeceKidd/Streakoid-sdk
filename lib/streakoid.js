"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var completeSoloStreakTasks_1 = __importDefault(require("./completeSoloStreakTasks"));
var completeGroupMemberStreakTasks_1 = __importDefault(require("./completeGroupMemberStreakTasks"));
var soloStreaks_1 = __importDefault(require("./soloStreaks"));
var stripe_1 = __importDefault(require("./stripe"));
var users_1 = __importDefault(require("./users"));
var friends_1 = __importDefault(require("./friends"));
var groupStreaks_1 = __importDefault(require("./groupStreaks"));
var streakTrackingEvents_1 = __importDefault(require("./streakTrackingEvents"));
var agendaJobs_1 = __importDefault(require("./agendaJobs"));
var feedbacks_1 = __importDefault(require("./feedbacks"));
var groupMemberStreaks_1 = __importDefault(require("./groupMemberStreaks"));
exports.default = (function (applicationUrl) {
    if (!applicationUrl) {
        throw new Error("You must define an applicationUrl");
    }
    return {
        completeSoloStreakTasks: completeSoloStreakTasks_1.default(applicationUrl),
        completeGroupMemberStreakTasks: completeGroupMemberStreakTasks_1.default(applicationUrl),
        soloStreaks: soloStreaks_1.default(applicationUrl),
        stripe: stripe_1.default(applicationUrl),
        users: __assign(__assign({}, users_1.default(applicationUrl)), { friends: friends_1.default(applicationUrl) }),
        groupStreaks: groupStreaks_1.default(applicationUrl),
        streakTrackingEvents: streakTrackingEvents_1.default(applicationUrl),
        agendaJobs: agendaJobs_1.default(applicationUrl),
        feedbacks: feedbacks_1.default(applicationUrl),
        groupMemberStreaks: groupMemberStreaks_1.default(applicationUrl)
    };
});
//# sourceMappingURL=streakoid.js.map