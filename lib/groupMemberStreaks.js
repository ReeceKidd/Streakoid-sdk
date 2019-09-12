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
    var create = function(userId, groupStreakId, timezone) {
        var _a;
        return axios_1.default.post(applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.groupMemberStreaks, { userId: userId, groupStreakId: groupStreakId }, { headers: (_a = {}, _a[headers_1.SupportedRequestHeaders.xTimezone] = timezone, _a) });
    };
    var getOne = function(groupMemberStreakId) {
        return axios_1.default.get(applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.groupMemberStreaks + "/" + groupMemberStreakId);
    };
    var deleteOne = function(groupMemberStreakId) {
        return axios_1.default.delete(applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.groupMemberStreaks + "/" + groupMemberStreakId);
    };
    return {
        getOne: getOne,
        create: create,
        deleteOne: deleteOne
    };
});
//# sourceMappingURL=groupMemberStreaks.js.map