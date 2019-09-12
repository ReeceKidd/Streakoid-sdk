"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var versions_1 = __importDefault(require("./ApiVersions"));
var RouterCategories_1 = require("./RouterCategories");
exports.default = (function(applicationUrl) {
    var getAll = function(userId) {
        return axios_1.default.get(applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.users + "/" + userId + "/" + RouterCategories_1.RouterCategories.friends);
    };
    var addFriend = function(userId, friendId) {
        return axios_1.default.post(applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.users + "/" + userId + "/" + RouterCategories_1.RouterCategories.friends, {
            friendId: friendId
        });
    };
    var deleteOne = function(userId, friendId) {
        return axios_1.default.delete(applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.users + "/" + userId + "/" + RouterCategories_1.RouterCategories.friends + "/" + friendId);
    };
    return {
        getAll: getAll,
        addFriend: addFriend,
        deleteOne: deleteOne
    };
});
//# sourceMappingURL=friends.js.map