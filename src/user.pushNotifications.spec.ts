import { streakoidFactory, streakoidClient } from './streakoid';
import UserPushNotifications from './models/UserPushNotifications';
import PushNotificationTypes from './PushNotificationTypes';
import {
    CompleteAllStreaksReminderPushNotification,
    CustomStreakReminderPushNotification,
    CustomSoloStreakReminderPushNotification,
    CustomChallengeStreakReminderPushNotification,
    CustomTeamStreakReminderPushNotification,
} from './models/PushNotifications';
jest.genMockFromModule('./streakoid');

describe('SDK users', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('update', () => {
        test('calls PATCH with correct URL and  parmaters', async () => {
            expect.assertions(1);

            const completeAllStreaksReminder: CompleteAllStreaksReminderPushNotification = {
                pushNotificationType: PushNotificationTypes.completeAllStreaksReminder,
                enabled: true,
                expoId: 'expoId',
                reminderHour: 10,
                reminderMinute: 10,
            };
            const customSoloStreakReminder: CustomSoloStreakReminderPushNotification = {
                expoId: 'expoId',
                enabled: true,
                reminderHour: 10,
                reminderMinute: 5,
                soloStreakId: 'soloStreakId',
                soloStreakName: 'Reading',
                pushNotificationType: PushNotificationTypes.customSoloStreakReminder,
            };
            const customChallengeStreakReminder: CustomChallengeStreakReminderPushNotification = {
                expoId: 'expoId',
                enabled: true,
                reminderHour: 10,
                reminderMinute: 5,
                challengeStreakId: 'challengeStreakId',
                challengeId: 'challengeId',
                challengeName: 'Reading',
                pushNotificationType: PushNotificationTypes.customChallengeStreakReminder,
            };
            const customTeamMemberStreakReminder: CustomTeamStreakReminderPushNotification = {
                expoId: 'expoId',
                enabled: true,
                reminderHour: 10,
                reminderMinute: 5,
                teamStreakId: 'challengeId',
                teamStreakName: 'Reading',
                pushNotificationType: PushNotificationTypes.customTeamStreakReminder,
            };

            const customStreakReminders: CustomStreakReminderPushNotification[] = [
                customSoloStreakReminder,
                customChallengeStreakReminder,
                customTeamMemberStreakReminder,
            ];

            streakoidClient.patch = jest.fn().mockResolvedValue(true);
            const updateData: UserPushNotifications = {
                completeAllStreaksReminder,
                teamStreakUpdates: {
                    enabled: true,
                },
                badgeUpdates: {
                    enabled: true,
                },
                newFollowerUpdates: {
                    enabled: true,
                },
                customStreakReminders,
            };

            await streakoid.user.pushNotifications.updatePushNotifications({ ...updateData });

            expect(streakoidClient.patch).toBeCalledWith(`/v1/user/push-notifications`, {
                ...updateData,
            });
        });
    });
});
