import { streakoidFactory, streakoidClient } from './streakoid';
import UserPushNotifications from './models/UserPushNotifications';
import StreakReminderTypes from './StreakReminderTypes';
import {
    CompleteAllStreaksReminder,
    CustomSoloStreakReminder,
    CustomTeamStreakReminder,
    CustomChallengeStreakReminder,
    CustomStreakReminder,
} from './models/StreakReminders';
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
                streakReminderType: StreakReminderTypes.completeAllStreaksReminder,
                enabled: true,
                expoId: 'expoId',
                reminderHour: 10,
                reminderMinute: 10,
            };
            const customSoloStreakReminder: CustomSoloStreakReminder = {
                streakReminderType: StreakReminderTypes.customSoloStreakReminder,
                expoId: 'expoId',
                enabled: true,
                reminderHour: 10,
                reminderMinute: 5,
                soloStreakId: 'soloStreakId',
                soloStreakName: 'Reading',
            };
            const customChallengeStreakReminder: CustomChallengeStreakReminder = {
                expoId: 'expoId',
                enabled: true,
                reminderHour: 10,
                reminderMinute: 5,
                challengeStreakId: 'challengeStreakId',
                challengeId: 'challengeId',
                challengeName: 'Reading',
                streakReminderType: StreakReminderTypes.customChallengeStreakReminder,
            };
            const customTeamMemberStreakReminder: CustomTeamStreakReminder = {
                expoId: 'expoId',
                enabled: true,
                reminderHour: 10,
                reminderMinute: 5,
                teamStreakId: 'challengeId',
                teamStreakName: 'Reading',
                streakReminderType: StreakReminderTypes.customTeamStreakReminder,
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
