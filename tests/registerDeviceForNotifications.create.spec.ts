import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';

jest.setTimeout(120000);

describe('POST /register-device-for-notifications', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    const token = 'ExponentPushToken[oUwWRuBBN99CrfQwZs509b]';
    const platform = 'android';

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            const user = await getPayingUser();
            userId = user._id;
            streakoid = await streakoidTest();
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`registers users device for push notifications.`, async () => {
        expect.assertions(1);

        const result = await streakoid.registerDeviceForNotifications.create({
            userId,
            token,
            platform,
        });

        expect(result.endpointArn).toBeDefined();
        expect(Object.keys(result).sort()).toEqual(['endpointArn'].sort());
    });
});
