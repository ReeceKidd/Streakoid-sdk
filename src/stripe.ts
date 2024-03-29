import { Token } from 'react-stripe-checkout';

import ApiVersions from './ApiVersions';
import PaymentPlans from '@streakoid/streakoid-models/lib/Types/PaymentPlans';
import RouterCategories from '@streakoid/streakoid-models/lib/Types/RouterCategories';
import { FormattedUser } from '@streakoid/streakoid-models/lib/Models/FormattedUser';
import { PostRequest } from './request';

export enum stripeRouterPaths {
    subscriptions = 'subscriptions',
    portalSession = 'portal-session',
    deleteSubscriptions = 'delete-subscriptions',
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const stripe = ({ postRequest }: { postRequest: PostRequest }) => {
    const createSubscription = async ({
        token,
        userId,
        paymentPlan,
    }: {
        token: Token;
        userId: string;
        paymentPlan: PaymentPlans;
    }): Promise<FormattedUser> => {
        try {
            return postRequest({
                route: `/${ApiVersions.v1}/${RouterCategories.stripe}/${stripeRouterPaths.subscriptions}`,
                params: {
                    token,
                    userId,
                    paymentPlan,
                },
            });
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const createPortalSession = async (): Promise<{
        _id: string;
        object: string;
        created: number;
        livemode: boolean;
        url: string;
        return_url: string;
    }> => {
        try {
            return postRequest({
                route: `/${ApiVersions.v1}/${RouterCategories.stripe}/${stripeRouterPaths.portalSession}`,
                params: {},
            });
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        createSubscription,
        createPortalSession,
    };
};

export { stripe };
