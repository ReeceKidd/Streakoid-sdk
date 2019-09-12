"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var versions_1 = __importDefault(require("./ApiVersions"));
var RouterCategories_1 = require("./RouterCategories");
exports.default = (function (applicationUrl) {
    var getAll = function (searchQuery) {
        var getAllUsersURL = applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.users + "?";
        if (searchQuery) {
            getAllUsersURL = getAllUsersURL + "searchQuery=" + searchQuery;
        }
        return axios_1.default.get(getAllUsersURL);
    };
    var getOne = function (userId) {
        return axios_1.default.get(applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.users + "/" + userId);
    };
    var create = function (username, email) {
        return axios_1.default.post(applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.users, {
            username: username,
            email: email
        });
    };
    var deleteOne = function (userId) {
        return axios_1.default.delete(applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.users + "/" + userId);
    };
    return {
        getAll: getAll,
        getOne: getOne,
        create: create,
        deleteOne: deleteOne
    };
});
//# sourceMappingURL=users.js.map