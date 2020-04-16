import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { PushNotificationTypes } from '../src';
import {
    CompleteAllStreaksReminder,
    CustomStreakReminder,
    CustomSoloStreakReminder,
    CustomChallengeStreakReminder,
    CustomTeamMemberStreakReminder,
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

        const completeAllStreaksReminder: CompleteAllStreaksReminder = {
            enabled: true,
            type: PushNotificationTypes.completeAllStreaksReminder,
            expoId: 'expoId',
            reminderHour: 10,
            reminderMinute: 5,
        };

        const updatedPushNotifications = await streakoid.user.pushNotifications.updatePushNotifications({
            completeAllStreaksReminder,
        });

        expect(updatedPushNotifications.completeAllStreaksReminder).toBeDefined();

        if (updatedPushNotifications.completeAllStreaksReminder) {
            expect(Object.keys(updatedPushNotifications.completeAllStreaksReminder).sort()).toEqual(
                ['enabled', 'expoId', 'reminderHour', 'reminderMinute', 'type'].sort(),
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
            expect(updatedPushNotifications.completeAllStreaksReminder.type).toEqual(
                PushNotificationTypes.completeAllStreaksReminder,
            );
            expect(updatedPushNotifications.completeAllStreaksReminder.expoId).toEqual(
                completeAllStreaksReminder.expoId,
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

    test(`that customStreakReminders can be updated by itself with each of the different types of custom streak reminders.`, async () => {
        expect.assertions(28);

        const customSoloStreakReminder: CustomSoloStreakReminder = {
            expoId: 'expoId',
            enabled: true,
            reminderHour: 10,
            reminderMinute: 5,
            soloStreakId: 'soloStreakId',
            soloStreakName: 'Reading',
            type: PushNotificationTypes.customSoloStreakReminder,
        };
        const customChallengeStreakReminder: CustomChallengeStreakReminder = {
            expoId: 'expoId',
            enabled: true,
            reminderHour: 10,
            reminderMinute: 5,
            challengeStreakId: 'challengeStreakId',
            challengeId: 'challengeId',
            challengeName: 'Reading',
            type: PushNotificationTypes.customChallengeStreakReminder,
        };
        const customTeamMemberStreakReminder: CustomTeamMemberStreakReminder = {
            expoId: 'expoId',
            enabled: true,
            reminderHour: 10,
            reminderMinute: 5,
            teamMemberStreakId: 'challengeStreakId',
            teamStreakId: 'challengeId',
            teamStreakName: 'Reading',
            type: PushNotificationTypes.customTeamMemberStreakReminder,
        };
        const customStreakReminders: CustomStreakReminder[] = [
            customSoloStreakReminder,
            customChallengeStreakReminder,
            customTeamMemberStreakReminder,
        ];

        const updatedPushNotifications = await streakoid.user.pushNotifications.updatePushNotifications({
            customStreakReminders,
        });

        expect(Object.keys(updatedPushNotifications).sort()).toEqual(
            ['newFollowerUpdates', 'teamStreakUpdates', 'badgeUpdates', 'customStreakReminders'].sort(),
        );

        expect(updatedPushNotifications.customStreakReminders.length).toEqual(3);

        const updatedSoloStreakPushNotification = updatedPushNotifications.customStreakReminders.find(
            pushNotication => pushNotication.type === PushNotificationTypes.customSoloStreakReminder,
        );

        if (
            updatedSoloStreakPushNotification &&
            updatedSoloStreakPushNotification.type === PushNotificationTypes.customSoloStreakReminder
        ) {
            expect(updatedSoloStreakPushNotification.enabled).toEqual(updatedSoloStreakPushNotification.enabled);
            expect(updatedSoloStreakPushNotification.reminderHour).toEqual(
                updatedSoloStreakPushNotification.reminderHour,
            );
            expect(updatedSoloStreakPushNotification.reminderMinute).toEqual(
                updatedSoloStreakPushNotification.reminderMinute,
            );
            expect(updatedSoloStreakPushNotification.type).toEqual(PushNotificationTypes.customSoloStreakReminder);
            expect(updatedSoloStreakPushNotification.expoId).toEqual(updatedSoloStreakPushNotification.expoId);
            expect(updatedSoloStreakPushNotification.soloStreakId).toEqual(customSoloStreakReminder.soloStreakId);
            expect(updatedSoloStreakPushNotification.soloStreakName).toEqual(customSoloStreakReminder.soloStreakName);
            expect(Object.keys(updatedSoloStreakPushNotification).sort()).toEqual(
                [
                    'enabled',
                    'expoId',
                    'reminderHour',
                    'reminderMinute',
                    'type',
                    'soloStreakName',
                    'soloStreakId',
                ].sort(),
            );
        }

        const updatedChallengeStreakPushNotification = updatedPushNotifications.customStreakReminders.find(
            pushNotication => pushNotication.type === PushNotificationTypes.customChallengeStreakReminder,
        );

        if (
            updatedChallengeStreakPushNotification &&
            updatedChallengeStreakPushNotification.type === PushNotificationTypes.customChallengeStreakReminder
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
            expect(updatedChallengeStreakPushNotification.type).toEqual(
                PushNotificationTypes.customChallengeStreakReminder,
            );
            expect(updatedChallengeStreakPushNotification.expoId).toEqual(
                updatedChallengeStreakPushNotification.expoId,
            );
            expect(updatedChallengeStreakPushNotification.challengeStreakId).toEqual(
                customChallengeStreakReminder.challengeStreakId,
            );
            expect(updatedChallengeStreakPushNotification.challengeName).toEqual(
                customChallengeStreakReminder.challengeName,
            );
            expect(updatedChallengeStreakPushNotification.challengeId).toEqual(
                customChallengeStreakReminder.challengeId,
            );
            expect(Object.keys(updatedChallengeStreakPushNotification).sort()).toEqual(
                [
                    'enabled',
                    'expoId',
                    'reminderHour',
                    'reminderMinute',
                    'type',
                    'challengeStreakId',
                    'challengeId',
                    'challengeName',
                ].sort(),
            );
        }

        const updatedTeamMemberStreakPushNotification = updatedPushNotifications.customStreakReminders.find(
            pushNotication => pushNotication.type === PushNotificationTypes.customTeamMemberStreakReminder,
        );

        if (
            updatedTeamMemberStreakPushNotification &&
            updatedTeamMemberStreakPushNotification.type === PushNotificationTypes.customTeamMemberStreakReminder
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
            expect(updatedTeamMemberStreakPushNotification.type).toEqual(
                PushNotificationTypes.customTeamMemberStreakReminder,
            );
            expect(updatedTeamMemberStreakPushNotification.expoId).toEqual(
                updatedTeamMemberStreakPushNotification.expoId,
            );
            expect(updatedTeamMemberStreakPushNotification.teamMemberStreakId).toEqual(
                customTeamMemberStreakReminder.teamMemberStreakId,
            );
            expect(updatedTeamMemberStreakPushNotification.teamStreakId).toEqual(
                customTeamMemberStreakReminder.teamStreakId,
            );
            expect(updatedTeamMemberStreakPushNotification.teamStreakName).toEqual(
                customTeamMemberStreakReminder.teamStreakName,
            );
            expect(Object.keys(updatedTeamMemberStreakPushNotification).sort()).toEqual(
                [
                    'enabled',
                    'expoId',
                    'reminderHour',
                    'reminderMinute',
                    'type',
                    'teamMemberStreakId',
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
