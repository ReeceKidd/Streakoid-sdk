import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { PushNotificationTypes } from '../src';
import {
    CompleteAllStreaksReminderPushNotification,
    CustomStreakReminderPushNotification,
    CustomSoloStreakReminderPushNotification,
    CustomChallengeStreakReminderPushNotification,
    CustomTeamStreakReminderPushNotification,
} from '../src/models/PushNotifications';
import { getPayingUser } from './setup/getPayingUser';

jest.setTimeout(120000);

describe('PATCH /user/push-notifications', () => {
    let streakoid: StreakoidFactory;

    beforeEach(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            await getPayingUser();
            streakoid = await streakoidTest();
        }
    });

    afterEach(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`that completeAllStreaksReminder can be updated by itself`, async () => {
        expect.assertions(8);

        const completeAllStreaksReminder: CompleteAllStreaksReminderPushNotification = {
            enabled: true,
            expoId: 'expoId',
            reminderHour: 10,
            reminderMinute: 5,
            pushNotificationType: PushNotificationTypes.completeAllStreaksReminder,
        };

        const updatedPushNotifications = await streakoid.user.pushNotifications.updatePushNotifications({
            completeAllStreaksReminder,
        });

        expect(updatedPushNotifications.completeAllStreaksReminder).toBeDefined();

        if (updatedPushNotifications.completeAllStreaksReminder) {
            expect(Object.keys(updatedPushNotifications.completeAllStreaksReminder).sort()).toEqual(
                ['enabled', 'expoId', 'reminderHour', 'reminderMinute', 'pushNotificationType'].sort(),
            );
            expect(updatedPushNotifications.completeAllStreaksReminder.enabled).toEqual(
                completeAllStreaksReminder.enabled,
            );
            expect(updatedPushNotifications.completeAllStreaksReminder.reminderHour).toEqual(
                completeAllStreaksReminder.reminderHour,
            );
            expect(updatedPushNotifications.completeAllStreaksReminder.reminderMinute).toEqual(
                completeAllStreaksReminder.reminderMinute,
            );
            expect(updatedPushNotifications.completeAllStreaksReminder.expoId).toEqual(
                completeAllStreaksReminder.expoId,
            );
            expect(updatedPushNotifications.completeAllStreaksReminder.pushNotificationType).toEqual(
                PushNotificationTypes.completeAllStreaksReminder,
            );

            expect(Object.keys(updatedPushNotifications).sort()).toEqual(
                [
                    'completeAllStreaksReminder',
                    'newFollowerUpdates',
                    'teamStreakUpdates',
                    'badgeUpdates',
                    'customStreakReminders',
                ].sort(),
            );
        }
    });

    test(`that customStreakReminderPushNotifications can be updated by itself with each of the different types of custom streak reminders.`, async () => {
        expect.assertions(27);

        const customSoloStreakReminderPushNotification: CustomSoloStreakReminderPushNotification = {
            expoId: 'expoId',
            enabled: true,
            reminderHour: 10,
            reminderMinute: 5,
            soloStreakId: 'soloStreakId',
            soloStreakName: 'Reading',
            pushNotificationType: PushNotificationTypes.customSoloStreakReminder,
        };
        const customChallengeStreakReminderPushNotification: CustomChallengeStreakReminderPushNotification = {
            expoId: 'expoId',
            enabled: true,
            reminderHour: 10,
            reminderMinute: 5,
            challengeStreakId: 'challengeStreakId',
            challengeId: 'challengeId',
            challengeName: 'Reading',
            pushNotificationType: PushNotificationTypes.customChallengeStreakReminder,
        };
        const customTeamStreakReminderPushNotification: CustomTeamStreakReminderPushNotification = {
            expoId: 'expoId',
            enabled: true,
            reminderHour: 10,
            reminderMinute: 5,
            teamStreakId: 'teamStreakId',
            teamStreakName: 'Reading',
            pushNotificationType: PushNotificationTypes.customTeamStreakReminder,
        };
        const customStreakReminders: CustomStreakReminderPushNotification[] = [
            customSoloStreakReminderPushNotification,
            customChallengeStreakReminderPushNotification,
            customTeamStreakReminderPushNotification,
        ];

        const updatedPushNotifications = await streakoid.user.pushNotifications.updatePushNotifications({
            customStreakReminders,
        });

        expect(Object.keys(updatedPushNotifications).sort()).toEqual(
            ['newFollowerUpdates', 'teamStreakUpdates', 'badgeUpdates', 'customStreakReminders'].sort(),
        );

        expect(updatedPushNotifications.customStreakReminders.length).toEqual(3);

        const updatedSoloStreakPushNotification = updatedPushNotifications.customStreakReminders.find(
            pushNotication => pushNotication.pushNotificationType === PushNotificationTypes.customSoloStreakReminder,
        );

        if (
            updatedSoloStreakPushNotification &&
            updatedSoloStreakPushNotification.pushNotificationType === PushNotificationTypes.customSoloStreakReminder
        ) {
            expect(updatedSoloStreakPushNotification.enabled).toEqual(updatedSoloStreakPushNotification.enabled);
            expect(updatedSoloStreakPushNotification.reminderHour).toEqual(
                updatedSoloStreakPushNotification.reminderHour,
            );
            expect(updatedSoloStreakPushNotification.reminderMinute).toEqual(
                updatedSoloStreakPushNotification.reminderMinute,
            );
            expect(updatedSoloStreakPushNotification.pushNotificationType).toEqual(
                PushNotificationTypes.customSoloStreakReminder,
            );
            expect(updatedSoloStreakPushNotification.expoId).toEqual(updatedSoloStreakPushNotification.expoId);
            expect(updatedSoloStreakPushNotification.soloStreakId).toEqual(
                customSoloStreakReminderPushNotification.soloStreakId,
            );
            expect(updatedSoloStreakPushNotification.soloStreakName).toEqual(
                customSoloStreakReminderPushNotification.soloStreakName,
            );
            expect(Object.keys(updatedSoloStreakPushNotification).sort()).toEqual(
                [
                    'enabled',
                    'expoId',
                    'reminderHour',
                    'reminderMinute',
                    'pushNotificationType',
                    'soloStreakName',
                    'soloStreakId',
                ].sort(),
            );
        }

        const updatedChallengeStreakPushNotification = updatedPushNotifications.customStreakReminders.find(
            pushNotication =>
                pushNotication.pushNotificationType === PushNotificationTypes.customChallengeStreakReminder,
        );

        if (
            updatedChallengeStreakPushNotification &&
            updatedChallengeStreakPushNotification.pushNotificationType ===
                PushNotificationTypes.customChallengeStreakReminder
        ) {
            expect(updatedChallengeStreakPushNotification.enabled).toEqual(
                updatedChallengeStreakPushNotification.enabled,
            );
            expect(updatedChallengeStreakPushNotification.reminderHour).toEqual(
                updatedChallengeStreakPushNotification.reminderHour,
            );
            expect(updatedChallengeStreakPushNotification.reminderMinute).toEqual(
                updatedChallengeStreakPushNotification.reminderMinute,
            );
            expect(updatedChallengeStreakPushNotification.pushNotificationType).toEqual(
                PushNotificationTypes.customChallengeStreakReminder,
            );
            expect(updatedChallengeStreakPushNotification.expoId).toEqual(
                updatedChallengeStreakPushNotification.expoId,
            );
            expect(updatedChallengeStreakPushNotification.challengeStreakId).toEqual(
                customChallengeStreakReminderPushNotification.challengeStreakId,
            );
            expect(updatedChallengeStreakPushNotification.challengeName).toEqual(
                customChallengeStreakReminderPushNotification.challengeName,
            );
            expect(updatedChallengeStreakPushNotification.challengeId).toEqual(
                customChallengeStreakReminderPushNotification.challengeId,
            );
            expect(Object.keys(updatedChallengeStreakPushNotification).sort()).toEqual(
                [
                    'enabled',
                    'expoId',
                    'reminderHour',
                    'reminderMinute',
                    'pushNotificationType',
                    'challengeStreakId',
                    'challengeId',
                    'challengeName',
                ].sort(),
            );
        }

        const updatedTeamMemberStreakPushNotification = updatedPushNotifications.customStreakReminders.find(
            pushNotication => pushNotication.pushNotificationType === PushNotificationTypes.customTeamStreakReminder,
        );

        if (
            updatedTeamMemberStreakPushNotification &&
            updatedTeamMemberStreakPushNotification.pushNotificationType ===
                PushNotificationTypes.customTeamStreakReminder
        ) {
            expect(updatedTeamMemberStreakPushNotification.enabled).toEqual(
                updatedTeamMemberStreakPushNotification.enabled,
            );
            expect(updatedTeamMemberStreakPushNotification.reminderHour).toEqual(
                updatedTeamMemberStreakPushNotification.reminderHour,
            );
            expect(updatedTeamMemberStreakPushNotification.reminderMinute).toEqual(
                updatedTeamMemberStreakPushNotification.reminderMinute,
            );
            expect(updatedTeamMemberStreakPushNotification.pushNotificationType).toEqual(
                PushNotificationTypes.customTeamStreakReminder,
            );
            expect(updatedTeamMemberStreakPushNotification.expoId).toEqual(
                updatedTeamMemberStreakPushNotification.expoId,
            );
            expect(updatedTeamMemberStreakPushNotification.teamStreakId).toEqual(
                customTeamStreakReminderPushNotification.teamStreakId,
            );
            expect(updatedTeamMemberStreakPushNotification.teamStreakName).toEqual(
                customTeamStreakReminderPushNotification.teamStreakName,
            );
            expect(Object.keys(updatedTeamMemberStreakPushNotification).sort()).toEqual(
                [
                    'enabled',
                    'expoId',
                    'reminderHour',
                    'reminderMinute',
                    'pushNotificationType',
                    'teamStreakId',
                    'teamStreakName',
                ].sort(),
            );
        }
    });

    test(`that teaStreakUpdates can be disabled by themselves`, async () => {
        const updatedPushNotifications = await streakoid.user.pushNotifications.updatePushNotifications({
            teamStreakUpdates: {
                enabled: false,
            },
        });
        expect(Object.keys(updatedPushNotifications).sort()).toEqual(
            ['newFollowerUpdates', 'teamStreakUpdates', 'badgeUpdates', 'customStreakReminders'].sort(),
        );

        expect(updatedPushNotifications.teamStreakUpdates.enabled).toEqual(false);
    });

    test(`that newFollowerUpdates can be disabled by themselves`, async () => {
        const updatedPushNotifications = await streakoid.user.pushNotifications.updatePushNotifications({
            newFollowerUpdates: {
                enabled: false,
            },
        });
        expect(Object.keys(updatedPushNotifications).sort()).toEqual(
            ['newFollowerUpdates', 'teamStreakUpdates', 'badgeUpdates', 'customStreakReminders'].sort(),
        );

        expect(updatedPushNotifications.newFollowerUpdates.enabled).toEqual(false);
    });

    test(`that newFollowerUpdates can be disabled by themselves`, async () => {
        const updatedPushNotifications = await streakoid.user.pushNotifications.updatePushNotifications({
            badgeUpdates: {
                enabled: false,
            },
        });
        expect(Object.keys(updatedPushNotifications).sort()).toEqual(
            ['newFollowerUpdates', 'teamStreakUpdates', 'badgeUpdates', 'customStreakReminders'].sort(),
        );

        expect(updatedPushNotifications.badgeUpdates.enabled).toEqual(false);
    });
});
