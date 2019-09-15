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
    const { data } = await streakoidClient.post(
      `/${ApiVersions.v1}/${RouterCategories.stripe}/${stripeRouterPaths.subscriptions}`,
      { token, id }
    );
    return data;
  };

  const deleteSubscription = async ({
    subscription,
    userId
  }: {
    subscription: string;
    userId: string;
  }): Promise<User> => {
    const { data } = await streakoidClient.post(
      `/${ApiVersions.v1}/${RouterCategories.stripe}/${stripeRouterPaths.deleteSubscriptions}`,
      { subscription, userId }
    );
    return data;
  };

  return {
    createSubscription,
    deleteSubscription
  };
};
