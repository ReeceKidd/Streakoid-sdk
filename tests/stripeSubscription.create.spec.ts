import { londonTimezone, StreakoidFactory } from '../src/streakoid';
import UserTypes from '../src/userTypes';
import { getUser, streakoidTest, username, email } from './setup/streakoidTest';

const secondRegisteredEmail = 'second-stripe-subscription-user@gmail.com';
const secondRegisteredUsername = 'second-registered-username';
const premiumEmail = 'premium-email@gmail.com';
const premiumUsername = 'premium-username';

jest.setTimeout(120000);

describe(`POST /subscriptions`, () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let secondId = '';
    let premiumId = '';

    const validToken = 'tok_visa';

    beforeAll(async () => {
        const user = await getUser();
        userId = user._id;
        streakoid = await streakoidTest();

        const secondRegistrationResponse = await streakoid.users.create({
            username: secondRegisteredUsername,
            email: secondRegisteredEmail,
        });
        secondId = secondRegistrationResponse._id;

        const premiumUserResponse = await streakoid.users.create({
            username: premiumUsername,
            email: premiumEmail,
        });
        premiumId = premiumUserResponse._id;

        await streakoid.stripe.createSubscription({
            token: validToken,
            id: premiumId,
        });
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.users.deleteOne(secondId);
        await streakoid.users.deleteOne(premiumId);
    });

    test('takes users payment and subscribes them', async () => {
        expect.assertions(12);

        const user = await streakoid.stripe.createSubscription({
            token: validToken,
            id: userId,
        });

        expect(Object.keys(user.stripe)).toEqual(['customer', 'subscription']);
        expect(user.stripe.subscription).toEqual(expect.any(String));
        expect(user.stripe.customer).toEqual(expect.any(String));
        expect(user.type).toEqual(UserTypes.premium);
        expect(user.friends).toEqual([]);
        expect(user._id).toEqual(expect.any(String));
        expect(user.username).toEqual(username);
        expect(user.email).toEqual(email);
        expect(user.timezone).toEqual(londonTimezone);
        expect(user.createdAt).toEqual(expect.any(String));
        expect(user.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(user).sort()).toEqual(
            [
                'stripe',
                'type',
                'friends',
                '_id',
                'username',
                'email',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });

    test('sends correct error when token is empty', async () => {
        expect.assertions(2);

        try {
            await streakoid.stripe.createSubscription({ token: '', id: secondId });
        } catch (err) {
            expect(err.response.status).toEqual(400);
            expect(err.response.data.message).toEqual(
                'child "token" fails because ["token" is not allowed to be empty]',
            );
        }
    });

    test('sends correct error when id is empty', async () => {
        expect.assertions(2);

        try {
            const token = 'tok_visa';
            await streakoid.stripe.createSubscription({ token, id: '' });
        } catch (err) {
            expect(err.response.status).toEqual(400);
            expect(err.response.data.message).toEqual('child "id" fails because ["id" is not allowed to be empty]');
        }
    });

    test('sends correct error when non Mongo ID is sent', async () => {
        expect.assertions(2);

        try {
            const token = 'tok_visa';
            await streakoid.stripe.createSubscription({ token, id: 'invalid-id' });
        } catch (err) {
            expect(err.response.status).toEqual(500);
            expect(err.response.data.code).toEqual('500-44');
        }
    });

    test('sends correct error when user does not exist', async () => {
        expect.assertions(3);

        try {
            const token = 'tok_visa';
            await streakoid.stripe.createSubscription({
                token,
                id: '5d053a174c64143898b78455',
            });
        } catch (err) {
            expect(err.response.status).toEqual(400);
            expect(err.response.data.code).toEqual('400-11');
            expect(err.response.data.message).toEqual('User does not exist.');
        }
    });

    test('sends correct error when user is already premium', async () => {
        expect.assertions(3);
        const token = 'tok_visa';

        try {
            await streakoid.stripe.createSubscription({ token, id: premiumId });
        } catch (err) {
            expect(err.response.status).toEqual(400);
            expect(err.response.data.code).toEqual('400-12');
            expect(err.response.data.message).toEqual('User is already subscribed.');
        }
    });
});
