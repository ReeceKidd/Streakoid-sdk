import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { PushNotificationTypes, UserPushNotifications } from '../src';
import { CompleteAllStreaksReminder } from '../src/models/PushNotifications';
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

    test(`that request passes when updatedPushNotifications is patched with correct keys`, async () => {
        expect.assertions(11);

        const completeAllStreaksReminder: CompleteAllStreaksReminder = {
            enabled: true,
            type: PushNotificationTypes.completeAllStreaksReminder,
            expoId: 'expoId',
            reminderHour: 10,
            reminderMinute: 5,
        };
        const updateData: UserPushNotifications = {
            completeAllStreaksReminder: completeAllStreaksReminder,
            teamStreakUpdates: { enabled: false },
            badgeUpdates: { enabled: false },
            newFollowerUpdates: { enabled: false },
        };

        const updatedPushNotifications = await streakoid.user.pushNotifications.updatePushNotifications({
            updateData,
        });

        expect(Object.keys(updatedPushNotifications.completeAllStreaksReminder).sort()).toEqual(
            ['enabled', 'expoId', 'reminderHour', 'reminderMinute', 'type'].sort(),
        );
        expect(updatedPushNotifications.completeAllStreaksReminder.enabled).toEqual(completeAllStreaksReminder.enabled);
        expect(updatedPushNotifications.completeAllStreaksReminder.reminderHour).toEqual(
            completeAllStreaksReminder.reminderHour,
        );
        expect(updatedPushNotifications.completeAllStreaksReminder.reminderMinute).toEqual(
            completeAllStreaksReminder.reminderMinute,
        );
        expect(updatedPushNotifications.completeAllStreaksReminder.type).toEqual(
            PushNotificationTypes.completeAllStreaksReminder,
        );
        expect(updatedPushNotifications.completeAllStreaksReminder.expoId).toEqual(completeAllStreaksReminder.expoId);
        expect(Object.keys(updatedPushNotifications.newFollowerUpdates).sort()).toEqual([`enabled`]);
        expect(updatedPushNotifications.newFollowerUpdates.enabled).toEqual(false);
        expect(Object.keys(updatedPushNotifications.teamStreakUpdates).sort()).toEqual([`enabled`]);
        expect(updatedPushNotifications.teamStreakUpdates.enabled).toEqual(false);

        expect(Object.keys(updatedPushNotifications).sort()).toEqual(
            ['completeAllStreaksReminder', 'newFollowerUpdates', 'teamStreakUpdates', 'badgeUpdates'].sort(),
        );
    });
});
