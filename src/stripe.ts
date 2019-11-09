import { AxiosInstance } from 'axios';
import { Token } from 'react-stripe-checkout';

import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import FormattedUser from './models/FormattedUser';

export enum stripeRouterPaths {
    subscriptions = 'subscriptions',
    deleteSubscriptions = 'delete-subscriptions',
}

const stripe = (streakoidClient: AxiosInstance) => {
    const createSubscription = async ({ token, userId }: { token: Token; userId: string }): Promise<FormattedUser> => {
        try {
            const { data } = await streakoidClient.post(
                `/${ApiVersions.v1}/${RouterCategories.stripe}/${stripeRouterPaths.subscriptions}`,
                { token, userId },
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
