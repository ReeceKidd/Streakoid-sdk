import PushNotificationSupportedDeviceTypes from '@streakoid/streakoid-models/lib/Types/PushNotificationSupportedDeviceTypes';
import { user as userImport } from './user';
import UserTypes from '@streakoid/streakoid-models/lib/Types/UserTypes';

describe('SDK users', () => {
    const getRequest = jest.fn().mockResolvedValue(true);
    const patchRequest = jest.fn().mockResolvedValue(true);
    const user = userImport({
        getRequest,
        patchRequest,
    });

    describe('getCurrentUser', () => {
        test('calls GET with correct URL', async () => {
            expect.assertions(1);

            await user.getCurrentUser();

            expect(getRequest).toBeCalledWith({ route: `/v1/user` });
        });
    });

    describe('update', () => {
        test('calls PATCH with correct URL and parameters', async () => {
            expect.assertions(1);

            const updateData = {
                email: 'email@email.com',
                username: 'username',
                firstName: 'Tom',
                lastName: 'Smith',
                hasUsernameBeenCustomized: false,
                timezone: 'Europe/London',
                pushNotification: {
                    token: 'pushNotificationToken',
                    deviceType: PushNotificationSupportedDeviceTypes.android,
                },
                hasProfileImageBeenCustomized: false,
                userType: UserTypes.basic,
                hasVerifiedEmail: true,
                hasCustomPassword: true,
            };

            await user.updateCurrentUser({ updateData });

            expect(patchRequest).toBeCalledWith({ route: `/v1/user`, params: updateData });
        });
    });
});
