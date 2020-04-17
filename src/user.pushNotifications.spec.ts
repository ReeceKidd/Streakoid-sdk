import { streakoidFactory, streakoidClient } from './streakoid';
import UserPushNotifications from './models/UserPushNotifications';
import PushNotificationTypes from './PushNotificationTypes';
import {
    CompleteAllStreaksReminder,
    CustomStreakReminder,
    CustomSoloStreakReminder,
    CustomChallengeStreakReminder,
    CustomTeamMemberStreakReminder,
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

            const completeAllStreaksReminder: CompleteAllStreaksReminder = {
                pushNotificationType: PushNotificationTypes.completeAllStreaksReminder,
                enabled: true,
                expoId: 'expoId',
                reminderHour: 10,
                reminderMinute: 10,
            };
            const customSoloStreakReminder: CustomSoloStreakReminder = {
                expoId: 'expoId',
                enabled: true,
                reminderHour: 10,
                reminderMinute: 5,
                soloStreakId: 'soloStreakId',
                soloStreakName: 'Reading',
                pushNotificationType: PushNotificationTypes.customSoloStreakReminder,
            };
            const customChallengeStreakReminder: CustomChallengeStreakReminder = {
                expoId: 'expoId',
                enabled: true,
                reminderHour: 10,
                reminderMinute: 5,
                challengeStreakId: 'challengeStreakId',
                challengeId: 'challengeId',
                challengeName: 'Reading',
                pushNotificationType: PushNotificationTypes.customChallengeStreakReminder,
            };
            const customTeamMemberStreakReminder: CustomTeamMemberStreakReminder = {
                expoId: 'expoId',
                enabled: true,
                reminderHour: 10,
                reminderMinute: 5,
                teamMemberStreakId: 'challengeStreakId',
                teamStreakId: 'challengeId',
                teamStreakName: 'Reading',
                pushNotificationType: PushNotificationTypes.customTeamMemberStreakReminder,
            };

            const customStreakReminders: CustomStreakReminder[] = [
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
