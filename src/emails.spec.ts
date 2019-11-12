import { streakoidFactory, streakoidClient } from './streakoid';

describe('SDK completeSoloStreakTasks', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('create', () => {
        test('calls POST with correct URL and required parmaters', async () => {
            expect.assertions(1);
            streakoidClient.post = jest.fn().mockResolvedValue(true);

            const name = 'John Doe';
            const email = 'john@test.com';
            const subject = 'subject';
            const message = 'Support request';

            await streakoid.emails.create({
                name,
                email,
                subject,
                message,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/emails`, {
                name,
                email,
                subject,
                message,
            });
        });

        test('calls POST with correct URL and all available parmaters', async () => {
            expect.assertions(1);
            streakoidClient.post = jest.fn().mockResolvedValue(true);

            const name = 'John Doe';
            const email = 'john@test.com';
            const subject = 'subject';
            const message = 'Support request';
            const userId = 'userId';
            const username = 'username';

            await streakoid.emails.create({
                name,
                email,
                subject,
                message,
                userId,
                username,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/emails`, {
                name,
                email,
                subject,
                message,
                userId,
                username,
            });
        });
    });
});
