import Amplify from 'aws-amplify';
import { Auth } from 'aws-amplify';
import { getServiceConfig } from '../../getServiceConfig';

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: 'eu-west-1',
        userPoolId: 'eu-west-1_jzNG2ske9',
        userPoolWebClientId: '68agp8bcm9bidhh4p97rj1ke1g',
    },
});

export const getIdToken = async (): Promise<string> => {
    const username = getServiceConfig().USER;
    const password = getServiceConfig().PASSWORD;
    const cognitoUser = await Auth.signIn(username, password);
    const { idToken } = cognitoUser.signInUserSession;
    return idToken.jwtToken;
};
