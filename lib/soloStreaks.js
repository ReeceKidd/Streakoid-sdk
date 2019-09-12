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
    var getAll = function(_a) {
        var userId = _a.userId, completedToday = _a.completedToday, timezone = _a.timezone, active = _a.active;
        var getAllSoloStreaksURL = applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.soloStreaks + "?";
        if (userId) {
            getAllSoloStreaksURL = getAllSoloStreaksURL + "userId=" + userId + "&";
        }
        if (completedToday !== undefined) {
            getAllSoloStreaksURL = getAllSoloStreaksURL + "completedToday=" + Boolean(completedToday) + "&";
        }
        if (timezone) {
            getAllSoloStreaksURL = getAllSoloStreaksURL + "timezone=" + timezone + "&";
        }
        if (active !== undefined) {
            getAllSoloStreaksURL = getAllSoloStreaksURL + "active=" + Boolean(active);
        }
        return axios_1.default.get(getAllSoloStreaksURL);
    };
    var getOne = function(soloStreakId) {
        return axios_1.default.get(applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.soloStreaks + "/" + soloStreakId);
    };
    var create = function(userId, name, timezone, description, numberOfMinutes) {
        var _a;
        return axios_1.default.post(applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.soloStreaks, { userId: userId, name: name, description: description, numberOfMinutes: numberOfMinutes }, { headers: (_a = {}, _a[headers_1.SupportedRequestHeaders.xTimezone] = timezone, _a) });
    };
    var update = function(soloStreakId, timezone, data) {
        var _a;
        return axios_1.default.patch(applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.soloStreaks + "/" + soloStreakId, data, { headers: (_a = {}, _a[headers_1.SupportedRequestHeaders.xTimezone] = timezone, _a) });
    };
    var deleteOne = function(soloStreakId) {
        return axios_1.default.delete(applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.soloStreaks + "/" + soloStreakId);
    };
    return {
        getAll: getAll,
        getOne: getOne,
        deleteOne: deleteOne,
        create: create,
        update: update
    };
});
//# sourceMappingURL=soloStreaks.js.map