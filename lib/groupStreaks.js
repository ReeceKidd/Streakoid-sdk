"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var versions_1 = __importDefault(require("./ApiVersions"));
var RouterCategories_1 = require("./RouterCategories");
var headers_1 = require("./SupportedRequestHeaders");
var groupMembers_1 = __importDefault(require("./groupMembers"));
exports.default = (function(applicationUrl) {
    var getAll = function(_a) {
        var creatorId = _a.creatorId, memberId = _a.memberId, timezone = _a.timezone;
        var getAllSoloStreaksURL = applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.groupStreaks + "?";
        if (creatorId) {
            getAllSoloStreaksURL = getAllSoloStreaksURL + "creatorId=" + creatorId + "&";
        }
        if (memberId) {
            getAllSoloStreaksURL = getAllSoloStreaksURL + "memberId=" + memberId + "&";
        }
        if (timezone) {
            getAllSoloStreaksURL = getAllSoloStreaksURL + "timezone=" + timezone;
        }
        return axios_1.default.get(getAllSoloStreaksURL);
    };
    var getOne = function(groupStreakId) {
        return axios_1.default.get(applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.groupStreaks + "/" + groupStreakId);
    };
    var create = function(_a) {
        var _b;
        var creatorId = _a.creatorId, streakName = _a.streakName, timezone = _a.timezone, streakDescription = _a.streakDescription, numberOfMinutes = _a.numberOfMinutes, members = _a.members;
        return axios_1.default.post(applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.groupStreaks, { creatorId: creatorId, streakName: streakName, streakDescription: streakDescription, numberOfMinutes: numberOfMinutes, members: members }, { headers: (_b = {}, _b[headers_1.SupportedRequestHeaders.xTimezone] = timezone, _b) });
    };
    var update = function(groupStreakId, timezone, data) {
        var _a;
        return axios_1.default.patch(applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.groupStreaks + "/" + groupStreakId, data, { headers: (_a = {}, _a[headers_1.SupportedRequestHeaders.xTimezone] = timezone, _a) });
    };
    var deleteOne = function(groupStreakId) {
        return axios_1.default.delete(applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.groupStreaks + "/" + groupStreakId);
    };
    return {
        getAll: getAll,
        getOne: getOne,
        create: create,
        update: update,
        deleteOne: deleteOne,
        groupMembers: groupMembers_1.default
    };
});
//# sourceMappingURL=groupStreaks.js.map