"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var versions_1 = __importDefault(require("./ApiVersions"));
var RouterCategories_1 = require("./RouterCategories");
exports.default = (function(applicationUrl) {
    var getAll = function(_a) {
        var type = _a.type, userId = _a.userId, streakId = _a.streakId;
        var getAllSoloStreaksURL = applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.streakTrackingEvents + "?";
        if (type) {
            getAllSoloStreaksURL = getAllSoloStreaksURL + "type=" + type + "&";
        }
        if (userId) {
            getAllSoloStreaksURL = getAllSoloStreaksURL + "userId=" + userId + "&";
        }
        if (streakId) {
            getAllSoloStreaksURL = getAllSoloStreaksURL + "streakId=" + streakId;
        }
        return axios_1.default.get(getAllSoloStreaksURL);
    };
    var getOne = function(streakTrackingEventId) {
        return axios_1.default.get(applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.streakTrackingEvents + "/" + streakTrackingEventId);
    };
    var create = function(type, streakId, userId) {
        return axios_1.default.post(applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.streakTrackingEvents, { type: type, streakId: streakId, userId: userId });
    };
    var deleteOne = function(streakTrackingEventId) {
        return axios_1.default.delete(applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.streakTrackingEvents + "/" + streakTrackingEventId);
    };
    return {
        getAll: getAll,
        getOne: getOne,
        create: create,
        deleteOne: deleteOne
    };
});
//# sourceMappingURL=streakTrackingEvents.js.map