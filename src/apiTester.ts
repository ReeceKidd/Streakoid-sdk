/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import supertest from 'supertest';

import SupportedRequestHeaders from '@streakoid/streakoid-models/lib/Types/SupportedRequestHeaders';
import SupportedResponseHeaders from '@streakoid/streakoid-models/lib/Types/SupportedResponseHeaders';

export const apiTester = ({
    databaseURI,
    app,
    getIdToken,
}: {
    databaseURI: string;
    app: ({ databaseURI }: { databaseURI: string }) => Promise<any>;
    getIdToken: () => string;
}) => {
    const request = supertest(app({ databaseURI }));
    const getRequest = async ({ route }: { route: string }) => {
        const idToken = getIdToken();
        const response = await request
            .get(route)
            .set(SupportedRequestHeaders.Timezone, 'Europe/London')
            .set(SupportedRequestHeaders.Authorization, idToken);
        if (response.error) {
            throw response.error;
        }
        return response.body;
    };

    const getRequestActivityFeed = async ({ route }: { route: string }) => {
        const idToken = getIdToken();
        const response = await request
            .get(route)
            .set(SupportedRequestHeaders.Timezone, 'Europe/London')
            .set(SupportedRequestHeaders.Authorization, idToken);
        if (response.error) {
            throw response.error;
        }
        return {
            activityFeedItems: response.body,
            totalCountOfActivityFeedItems: Number(response.header[SupportedResponseHeaders.TotalCount]),
        };
    };

    const postRequest = async ({ route, params }: { route: string; params: any }) => {
        const idToken = getIdToken();
        const response = await request
            .post(route)
            .send(params)
            .set(SupportedRequestHeaders.Timezone, 'Europe/London')
            .set(SupportedRequestHeaders.Authorization, idToken);
        if (response.error) {
            throw response.error;
        }
        return response.body;
    };

    const patchRequest = async ({ route, params }: { route: string; params?: any }) => {
        const idToken = getIdToken();
        const response = await request
            .patch(route)
            .send(params)
            .set(SupportedRequestHeaders.Timezone, 'Europe/London')
            .set(SupportedRequestHeaders.Authorization, idToken);
        if (response.error) {
            throw response.error;
        }
        return response.body;
    };

    const deleteRequest = async ({ route }: { route: string }) => {
        const idToken = getIdToken();
        const response = await request
            .delete(route)
            .set(SupportedRequestHeaders.Timezone, 'Europe/London')
            .set(SupportedRequestHeaders.Authorization, idToken);
        if (response.error) {
            throw response.error;
        }
        return response.body;
    };

    return {
        getRequest,
        getRequestActivityFeed,
        postRequest,
        patchRequest,
        deleteRequest,
    };
};
