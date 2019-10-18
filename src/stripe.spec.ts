import { streakoidFactory, streakoidClient } from './streakoid';

describe('SDK stripe', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('createSubscription', () => {
        test('calls POST with correct URL and  properties', async () => {
            expect.assertions(1);

            streakoidClient.post = jest.fn().mockResolvedValue(true);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const token: any = 'token';
            const userId = 'id';

            await streakoid.stripe.createSubscription({ token, userId });

            expect(streakoidClient.post).toBeCalledWith(`/v1/stripe/subscriptions`, {
                token,
                userId,
            });
        });
    });

    describe('deleteSubscription', () => {
        test('calls POST with correct URL and  properties', async () => {
            expect.assertions(1);

            streakoidClient.post = jest.fn().mockResolvedValue(true);

            const subscription = 'subscription';
            const userId = 'id';

            await streakoid.stripe.deleteSubscription({ subscription, userId });

            expect(streakoidClient.post).toBeCalledWith(`/v1/stripe/delete-subscriptions`, { subscription, userId });
        });
    });
});
