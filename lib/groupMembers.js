"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var versions_1 = __importDefault(require("./ApiVersions"));
var RouterCategories_1 = require("./RouterCategories");
var headers_1 = require("./SupportedRequestHeaders");
var groupStreakRouter_1 = require("../Routers/versions/v1/groupStreakRouter");
exports.default = (function(applicationUrl) {
    var create = function(_a) {
        var _b;
        var friendId = _a.friendId, groupStreakId = _a.groupStreakId, timezone = _a.timezone;
        return axios_1.default.post(applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.groupStreaks + "/" + groupStreakId + "/" + groupStreakRouter_1.GroupStreakRouterCategories.members, { friendId: friendId }, { headers: (_b = {}, _b[headers_1.SupportedRequestHeaders.xTimezone] = timezone, _b) });
    };
    var deleteOne = function(_a) {
        var groupStreakId = _a.groupStreakId, memberId = _a.memberId;
        return axios_1.default.delete(applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.groupStreaks + "/" + groupStreakId + "/" + groupStreakRouter_1.GroupStreakRouterCategories.members + "/" + memberId);
    };
    return {
        create: create,
        deleteOne: deleteOne
    };
});
//# sourceMappingURL=groupMembers.js.map