"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var versions_1 = __importDefault(require("./ApiVersions"));
var RouterCategories_1 = require("./RouterCategories");
var headers_1 = require("./SupportedRequestHeaders");
exports.default = (function(applicationUrl) {
    var getAll = function(userId, streakId) {
        var getAllURL = applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.completeSoloStreakTasks + "?";
        if (userId) {
            getAllURL = getAllURL + "userId=" + userId + "&";
        }
        if (streakId) {
            getAllURL = getAllURL + "streakId=" + streakId;
        }
        return axios_1.default.get(getAllURL);
    };
    var create = function(userId, soloStreakId, timezone) {
        var _a;
        return axios_1.default.post(applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.completeSoloStreakTasks, {
            userId: userId,
            soloStreakId: soloStreakId
        }, {
                headers: (_a = {},
                    _a[headers_1.SupportedRequestHeaders.xTimezone] = timezone,
                    _a)
            });
    };
    var deleteOne = function(completeSoloStreakTaskId) {
        return axios_1.default.delete(applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.completeSoloStreakTasks + "/" + completeSoloStreakTaskId);
    };
    return {
        getAll: getAll,
        create: create,
        deleteOne: deleteOne
    };
});
//# sourceMappingURL=completeSoloStreakTasks.js.map