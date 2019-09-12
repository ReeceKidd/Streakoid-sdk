"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var versions_1 = __importDefault(require("./ApiVersions"));
var RouterCategories_1 = require("./RouterCategories");
exports.default = (function(applicationUrl) {
    var create = function(userId, pageUrl, username, userEmail, feedback) {
        return axios_1.default.post(applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.feedbacks, {
            userId: userId,
            pageUrl: pageUrl,
            username: username,
            userEmail: userEmail,
            feedback: feedback
        });
    };
    var deleteOne = function(feedbackId) {
        return axios_1.default.delete(applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.feedbacks + "/" + feedbackId);
    };
    return {
        create: create,
        deleteOne: deleteOne
    };
});
//# sourceMappingURL=feedbacks.js.map