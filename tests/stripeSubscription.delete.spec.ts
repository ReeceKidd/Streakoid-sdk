import { londonTimezone, StreakoidFactory } from '../src/streakoid';
import UserTypes from '../src/userTypes';
import { getUser, streakoidTest, username, email } from './setup/streakoidTest';

const basicUserEmail = 'basic-subscription-user@gmail.com';
const basicUserUsername = 'basic-subscription-user';

jest.setTimeout(120000);

describe(`DELETE /subscriptions`, () => {
    let subscription: string;
    let streakoid: StreakoidFactory;
    let userId: string;
    let basicUserId: string;

    beforeAll(async () => {
        const user = await getUser();
        userId = user._id;
        streakoid = await streakoidTest();

        const token = 'tok_visa';
        const subscribeUser = await streakoid.stripe.createSubscription({
            token,
            id: userId,
        });
        subscription = subscribeUser.stripe.subscription;

        const basicUserResponse = await streakoid.users.create({
            username: basicUserUsername,
            email: basicUserEmail,
        });
        basicUserId = basicUserResponse._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.users.deleteOne(basicUserId);
    });

    test('unsubscribes user and changes user type to basic', async () => {
        expect.assertions(12);

        const user = await streakoid.stripe.deleteSubscription({
            subscription,
            userId,
        });

        expect(Object.keys(user.stripe).sort()).toEqual(['customer', 'subscription'].sort());
        expect(user.stripe.subscription).toEqual(null);
        expect(user.stripe.customer).toEqual(expect.any(String));
        expect(user.type).toEqual(UserTypes.basic);
        expect(user.friends).toEqual([]);
        expect(user._id).toEqual(expect.any(String));
        expect(user.username).toEqual(username);
        expect(user.email).toEqual(email);
        expect(user.timezone).toEqual(londonTimezone);
        expect(user.createdAt).toEqual(expect.any(String));
        expect(user.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(user).sort()).toEqual(
            [
                '_id',
                'stripe',
                'type',
                'friends',
                'username',
                'email',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });

    test('sends correct error when subscription is empty', async () => {
        expect.assertions(2);

        try {
            await streakoid.stripe.deleteSubscription({ userId, subscription: '' });
        } catch (err) {
            expect(err.response.status).toEqual(400);
            expect(err.response.data.message).toEqual(
                'child "subscription" fails because ["subscription" is not allowed to be empty]',
            );
        }
    });

    test('sends correct error when user is empty', async () => {
        expect.assertions(2);

        try {
            await streakoid.stripe.deleteSubscription({ userId: '', subscription });
        } catch (err) {
            expect(err.response.status).toEqual(400);
            expect(err.response.data.message).toEqual(
                'child "userId" fails because ["userId" is not allowed to be empty]',
            );
        }
    });

    test('sends correct error when user does not exist', async () => {
        expect.assertions(3);

        try {
            await streakoid.stripe.deleteSubscription({
                subscription,
                userId: '5d053a174c64143898b78455',
            });
        } catch (err) {
            expect(err.response.status).toEqual(400);
            expect(err.response.data.code).toEqual('400-13');
            expect(err.response.data.message).toEqual('User does not exist.');
        }
    });

    test('sends correct error when user is not subscribed', async () => {
        expect.assertions(3);

        try {
            await streakoid.stripe.deleteSubscription({
                subscription,
                userId: basicUserId,
            });
        } catch (err) {
            expect(err.response.status).toEqual(400);
            expect(err.response.data.code).toEqual('400-14');
            expect(err.response.data.message).toEqual('Customer is not subscribed.');
        }
    });
});
