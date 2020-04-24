import { streakoidFactory, streakoidClient } from './streakoid';
import PaymentPlans from '@streakoid/streakoid-models/lib/Types/PaymentPlans';

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
            const paymentPlan = PaymentPlans.Annually;

            await streakoid.stripe.createSubscription({ token, userId, paymentPlan });

            expect(streakoidClient.post).toBeCalledWith(`/v1/stripe/subscriptions`, {
                token,
                userId,
                paymentPlan,
            });
        });
    });
});
