import { user as userImport } from './user';
import UserTypes from '@streakoid/streakoid-models/lib/Types/UserTypes';
import StreakStatus from '@streakoid/streakoid-models/lib/Types/StreakStatus';
import { GetAllSoloStreaksSortFields } from './soloStreaks';

describe('SDK users', () => {
    const getRequest = jest.fn().mockResolvedValue(true);
    const patchRequest = jest.fn().mockResolvedValue(true);
    const user = userImport({
        getRequest,
        patchRequest,
    });

    describe('getCurrentUser', () => {
        test('calls GET with correct URL', async () => {
            expect.assertions(1);

            await user.getCurrentUser();

            expect(getRequest).toBeCalledWith({ route: `/v1/user` });
        });
    });

    describe('update', () => {
        test('calls PATCH with correct URL and parameters', async () => {
            expect.assertions(1);

            const updateData = {
                email: 'email@email.com',
                username: 'username',
                firstName: 'Tom',
                lastName: 'Smith',
                hasUsernameBeenCustomized: false,
                timezone: 'Europe/London',
                pushNotification: {
                    androidToken: 'androidToken',
                    iosToken: 'iosToken',
                },
                hasProfileImageBeenCustomized: false,
                userType: UserTypes.basic,
                hasVerifiedEmail: true,
                hasCustomPassword: true,
            };

            await user.updateCurrentUser({ updateData });

            expect(patchRequest).toBeCalledWith({ route: `/v1/user`, params: updateData });
        });
    });

    describe('soloStreaks', () => {
        test('calls GET with correct URL when no query parameters are passed', async () => {
            expect.assertions(1);

            await user.soloStreaks({});

            expect(getRequest).toBeCalledWith({ route: `/v1/user/solo-streaks?` });
        });

        test('calls GET with correct URL when completedToday query paramter is passed', async () => {
            expect.assertions(1);

            const completedToday = true;

            await user.soloStreaks({ completedToday });

            expect(getRequest).toBeCalledWith({ route: `/v1/user/solo-streaks?completedToday=true&` });
        });

        test('calls GET with correct URL when timezone query paramter is passed', async () => {
            expect.assertions(1);

            const timezone = `Europe/London`;

            await user.soloStreaks({ timezone });

            expect(getRequest).toBeCalledWith({ route: `/v1/user/solo-streaks?timezone=${timezone}&` });
        });

        test('calls GET with correct URL when active query paramter is passed', async () => {
            expect.assertions(1);

            const active = true;

            await user.soloStreaks({ active });

            expect(getRequest).toBeCalledWith({ route: `/v1/user/solo-streaks?active=${active}&` });
        });

        test('calls GET with correct URL when status query paramter is passed', async () => {
            expect.assertions(1);

            const status = StreakStatus.live;

            await user.soloStreaks({ status });

            expect(getRequest).toBeCalledWith({ route: `/v1/user/solo-streaks?status=${status}&` });
        });

        test('calls GET with correct URL when sortField paramter is passed', async () => {
            expect.assertions(1);

            const sortField = GetAllSoloStreaksSortFields.currentStreak;

            await user.soloStreaks({ sortField });

            expect(getRequest).toBeCalledWith({ route: `/v1/user/solo-streaks?sortField=${sortField}&` });
        });

        test('calls GET with correct URL when limit paramter is passed', async () => {
            expect.assertions(1);

            const limit = 20;

            await user.soloStreaks({ limit });

            expect(getRequest).toBeCalledWith({ route: `/v1/user/solo-streaks?limit=${limit}&` });
        });
    });
});
