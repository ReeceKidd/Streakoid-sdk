import axios from "axios";

import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";

export enum stripeRouterPaths {
    subscriptions = "subscriptions",
    deleteSubscriptions = "delete-subscriptions"
}

export default (applicationUrl: string) => {
    const createSubscription = (token: string, id: string) => {
        return axios.post(
            `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.stripe}/${stripeRouterPaths.subscriptions}`,
            { token, id }
        );
    };

    const deleteSubscription = (subscription: string, id: string) => {
        return axios.post(
            `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.stripe}/${stripeRouterPaths.deleteSubscriptions}`,
            { subscription, id }
        );
    };

    return {
        createSubscription,
        deleteSubscription
    };
};
