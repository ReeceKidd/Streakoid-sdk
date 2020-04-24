import { AxiosInstance } from 'axios';
import { Token } from 'react-stripe-checkout';

import ApiVersions from './ApiVersions';
import PaymentPlans from '@streakoid/streakoid-models/lib/Types/PaymentPlans';
import RouterCategories from '@streakoid/streakoid-models/lib/Types/RouterCategories';
import { FormattedUser } from '@streakoid/streakoid-models/lib/Models/FormattedUser';

export enum stripeRouterPaths {
    subscriptions = 'subscriptions',
    deleteSubscriptions = 'delete-subscriptions',
}

const stripe = (streakoidClient: AxiosInstance) => {
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
            const { data } = await streakoidClient.post(
                `/${ApiVersions.v1}/${RouterCategories.stripe}/${stripeRouterPaths.subscriptions}`,
                { token, userId, paymentPlan },
            );
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        createSubscription,
    };
};

export { stripe };
