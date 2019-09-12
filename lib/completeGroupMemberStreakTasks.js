"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var versions_1 = __importDefault(require("./ApiVersions"));
var RouterCategories_1 = require("./RouterCategories");
var headers_1 = require("./SupportedRequestHeaders");
exports.default = (function(applicatonUrl) {
    var getAll = function(_a) {
        var userId = _a.userId, groupStreakId = _a.groupStreakId, groupMemberStreakId = _a.groupMemberStreakId;
        var getAllURL = applicatonUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.completeGroupMemberStreakTasks + "?";
        if (userId) {
            getAllURL = getAllURL + "userId=" + userId + "&";
        }
        if (groupStreakId) {
            getAllURL = getAllURL + "groupStreakId=" + groupStreakId + "&";
        }
        if (groupMemberStreakId) {
            getAllURL = getAllURL + "groupMemberStreakId=" + groupMemberStreakId;
        }
        return axios_1.default.get(getAllURL);
    };
    var create = function(userId, groupStreakId, groupMemberStreakId, timezone) {
        var _a;
        return axios_1.default.post(applicatonUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.completeGroupMemberStreakTasks, {
            userId: userId,
            groupStreakId: groupStreakId,
            groupMemberStreakId: groupMemberStreakId
        }, {
                headers: (_a = {},
                    _a[headers_1.SupportedRequestHeaders.xTimezone] = timezone,
                    _a)
            });
    };
    var deleteOne = function(completeGroupMemberStreakTaskId) {
        return axios_1.default.delete(applicatonUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.completeGroupMemberStreakTasks + "/" + completeGroupMemberStreakTaskId);
    };
    return {
        getAll: getAll,
        create: create,
        deleteOne: deleteOne
    };
});
//# sourceMappingURL=completeGroupMemberStreakTasks.js.map