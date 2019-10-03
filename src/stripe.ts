import { AxiosInstance } from "axios";

import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import User from "./models/User";

export enum stripeRouterPaths {
  subscriptions = "subscriptions",
  deleteSubscriptions = "delete-subscriptions"
}

export default (streakoidClient: AxiosInstance) => {
  const createSubscription = async ({
    token,
    id
  }: {
    token: string;
    id: string;
  }): Promise<User> => {
    try {
      const { data } = await streakoidClient.post(
        `/${ApiVersions.v1}/${RouterCategories.stripe}/${stripeRouterPaths.subscriptions}`,
        { token, id }
      );
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const deleteSubscription = async ({
    subscription,
    userId
  }: {
    subscription: string;
    userId: string;
  }): Promise<User> => {
    try {
      const { data } = await streakoidClient.post(
        `/${ApiVersions.v1}/${RouterCategories.stripe}/${stripeRouterPaths.deleteSubscriptions}`,
        { subscription, userId }
      );
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return {
    createSubscription,
    deleteSubscription
  };
};
