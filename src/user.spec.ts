import { streakoidFactory, streakoidClient } from './streakoid';
import PushNotificationSupportedDeviceTypes from '@streakoid/streakoid-models/lib/Types/PushNotificationSupportedDeviceTypes';
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

    describe('update', () => {
        test('calls PATCH with correct URL and parameters', async () => {
            expect.assertions(1);

            streakoidClient.patch = jest.fn().mockResolvedValue(true);
            const updateData = {
                email: 'email@email.com',
                timezone: 'Europe/London',
                pushNotification: {
                    token: 'pushNotificationToken',
                    deviceType: PushNotificationSupportedDeviceTypes.android,
                },
            };

            await streakoid.user.updateCurrentUser({ updateData });

            expect(streakoidClient.patch).toBeCalledWith(`/v1/user`, {
                ...updateData,
            });
        });
    });
});
