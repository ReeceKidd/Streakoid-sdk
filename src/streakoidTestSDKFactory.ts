/* eslint-disable @typescript-eslint/no-explicit-any */
import { StreakoidSDK, streakoidSDKFactory } from './streakoidSDKFactory';
import { apiTester } from './apiTester';

export const streakoidTestSDKFactory = ({
    testName,
    getDatabaseURI,
    getIdToken,
    supertest,
    app,
}: {
    testName: string;
    getIdToken: () => string;
    getDatabaseURI: ({ testName }: { testName: string }) => string;
    supertest: any;
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
