import { streakoidFactory, streakoidClient } from './streakoid';
import UserPushNotifications from './models/UserPushNotifications';
import PushNotificationTypes from './PushNotificationTypes';
jest.genMockFromModule('./streakoid');

describe('SDK users', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('update', () => {
        test('calls PATCH with correct URL and  parmaters', async () => {
            expect.assertions(1);

            streakoidClient.patch = jest.fn().mockResolvedValue(true);
            const updateData: UserPushNotifications = {
                completeAllStreaksReminder: {
                    enabled: true,
                    expoId: 'expoId',
                    reminderHour: 10,
                    reminderMinute: 10,
                    type: PushNotificationTypes.completeAllStreaksReminder,
                },
                teamStreakUpdates: {
                    enabled: true,
                },
                badgeUpdates: {
                    enabled: true,
                },
                newFollowerUpdates: {
                    enabled: true,
                },
            };

            await streakoid.user.pushNotifications.updatePushNotifications({ updateData });

            expect(streakoidClient.patch).toBeCalledWith(`/v1/user/push-notifications`, {
                ...updateData,
            });
        });
    });
});
