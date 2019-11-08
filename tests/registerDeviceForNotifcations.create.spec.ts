import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { getPayingUser } from './setup/getPayingUser';

jest.setTimeout(120000);

describe('POST /register-device-for-notifications', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    const pushNotificationToken = 'ExponentPushToken[YxS2HNIiQLByxWikASNPwV]';
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

    test(`user can register device for push token`, async () => {
        expect.assertions(1);

        const deviceRegistered = await streakoid.registerDeviceForNotifications.create({
            userId,
            pushNotificationToken,
            platform,
        });

        expect(deviceRegistered).toEqual('Successfully registered device');
    });
});
