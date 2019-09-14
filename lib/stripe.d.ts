import { User } from "./models/User";
export declare enum stripeRouterPaths {
  subscriptions = "subscriptions",
  deleteSubscriptions = "delete-subscriptions"
}
declare const _default: (
  applicationUrl: string
) => {
  createSubscription: ({
    token,
    id
  }: {
    token: string;
    id: string;
  }) => Promise<User>;
  deleteSubscription: ({
    subscription,
    userId
  }: {
    subscription: string;
    userId: string;
  }) => Promise<User>;
};
export default _default;
//# sourceMappingURL=stripe.d.ts.map
