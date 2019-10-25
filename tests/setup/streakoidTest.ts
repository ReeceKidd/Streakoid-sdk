import * as fetch from 'node-fetch';
import Amplify from 'aws-amplify';
import { Auth } from 'aws-amplify';
import { streakoidClientFactory } from '../../src';
import { londonTimezone, streakoidFactory, streakoid } from '../../src/streakoid';
import { email, username, password, applicationUrl } from './environment';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).fetch = fetch;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).navigator = {
    userAgent: 'NodeJS',
};

const config = {
    cognito: {
        REGION: 'eu-west-1',
        USER_POOL_ID: 'eu-west-1_jzNG2ske9',
        APP_CLIENT_ID: '68agp8bcm9bidhh4p97rj1ke1g',
    },
};

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    },
});

export const getIdToken = async (): Promise<string> => {
    const cognitoUser = await Auth.signIn(username, password);
    const { idToken } = cognitoUser.signInUserSession;
    return idToken.jwtToken;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const streakoidTest = async () => {
    const idToken = await getIdToken();
    const strekoidClient = streakoidClientFactory(applicationUrl, londonTimezone, idToken);
    return streakoidFactory(strekoidClient);
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getUser = async () => {
    return streakoid.users.create({
        username,
        email,
    });
};

export { streakoidTest, getUser };
