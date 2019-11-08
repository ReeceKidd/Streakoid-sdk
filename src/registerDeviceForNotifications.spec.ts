import { streakoidFactory, streakoidClient } from './streakoid';
import { RouterCategories } from '.';

describe(`SDK ${RouterCategories.registerDeviceForNotifications}`, () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('create', () => {
        test('calls POST with correct URL and  parmaters', async () => {
            expect.assertions(1);

            streakoidClient.post = jest.fn().mockResolvedValue(true);
            const pushNotificationToken = 'pushNotificationToken';
            const userId = 'userId';
            const platform = 'android';

            await streakoid.registerDeviceForNotifications.create({
                pushNotificationToken,
                userId,
                platform,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/register-device-for-notifications`, {
                pushNotificationToken,
                userId,
                platform,
            });
        });
    });
});
