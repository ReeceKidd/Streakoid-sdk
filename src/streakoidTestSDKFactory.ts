/* eslint-disable @typescript-eslint/no-explicit-any */
import supertest from 'supertest';
import { StreakoidSDK, streakoidSDKFactory } from './streakoidSDKFactory';
import { apiTester } from './apiTester';

export const streakoidTestSDKFactory = ({
    testName,
    getDatabaseURI,
    getIdToken,
    app,
}: {
    testName: string;
    getIdToken: () => string;
    getDatabaseURI: ({ testName }: { testName: string }) => string;
    app: any;
}): StreakoidSDK => {
    const { getRequest, getRequestActivityFeed, postRequest, patchRequest, deleteRequest } = apiTester({
        app,
        getIdToken,
        supertest,
        databaseURI: getDatabaseURI({ testName }),
    });

    return streakoidSDKFactory({ getRequest, getRequestActivityFeed, postRequest, patchRequest, deleteRequest });
};
