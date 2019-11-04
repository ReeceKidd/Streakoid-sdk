import Amplify from 'aws-amplify';
import { Auth } from 'aws-amplify';
import { password, username } from './environment';

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: 'eu-west-1',
        userPoolId: 'eu-west-1_jzNG2ske9',
        userPoolWebClientId: '68agp8bcm9bidhh4p97rj1ke1g',
    },
});

export const getIdToken = async (): Promise<string> => {
    const cognitoUser = await Auth.signIn(username, password);
    const { idToken } = cognitoUser.signInUserSession;
    return idToken.jwtToken;
};
