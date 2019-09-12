"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var versions_1 = __importDefault(require("./ApiVersions"));
var RouterCategories_1 = require("./RouterCategories");
var stripeRouter_1 = require("../Routers/versions/v1/stripeRouter");
exports.default = (function (applicationUrl) {
    var createSubscription = function (token, id) {
        return axios_1.default.post(applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.stripe + "/" + stripeRouter_1.stripeRouterPaths.subscriptions, { token: token, id: id });
    };
    var deleteSubscription = function (subscription, id) {
        return axios_1.default.post(applicationUrl + "/" + versions_1.default.v1 + "/" + RouterCategories_1.RouterCategories.stripe + "/" + stripeRouter_1.stripeRouterPaths.deleteSubscriptions, { subscription: subscription, id: id });
    };
    return {
        createSubscription: createSubscription,
        deleteSubscription: deleteSubscription
    };
});
//# sourceMappingURL=stripe.js.map