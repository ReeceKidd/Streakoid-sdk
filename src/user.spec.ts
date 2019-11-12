import { streakoidFactory, streakoidClient } from './streakoid';
jest.genMockFromModule('./streakoid');

describe('SDK users', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getCurrentUser', () => {
        test('calls GET with correct URL', async () => {
            expect.assertions(1);

            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.user.getCurrentUser();

            expect(streakoidClient.get).toBeCalledWith(`/v1/user`);
        });
    });

    describe('create', () => {
        test('calls POST with correct URL and  parmaters', async () => {
            expect.assertions(1);

            streakoidClient.post = jest.fn().mockResolvedValue(true);
            const username = 'username';
            const email = 'email@gmail.com';

            await streakoid.user.create({ username, email });

            expect(streakoidClient.post).toBeCalledWith(`/v1/user`, {
                username,
                email,
            });
        });
    });

    describe('update', () => {
        test('calls PATCH with correct URL and  parmaters', async () => {
            expect.assertions(1);

            streakoidClient.patch = jest.fn().mockResolvedValue(true);
            const updateData = {
                email: 'email@email.com',
                notifications: {
                    completeStreaksReminder: {
                        emailNotification: true,
                        pushNotification: true,
                        reminderTime: 21,
                    },
                    friendRequest: {
                        emailNotification: true,
                        pushNotification: true,
                    },
                    teamStreakUpdates: {
                        emailNotification: true,
                        pushNotification: true,
                    },
                },
                timezone: 'Europe/London',
                pushNotification: 'push-notification',
            };

            await streakoid.user.updateCurrentUser({ updateData });

            expect(streakoidClient.patch).toBeCalledWith(`/v1/user`, {
                ...updateData,
            });
        });
    });
});
