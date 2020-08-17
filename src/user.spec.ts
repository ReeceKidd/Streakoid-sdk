import { user as userImport } from './user';
import UserTypes from '@streakoid/streakoid-models/lib/Types/UserTypes';
import StreakStatus from '@streakoid/streakoid-models/lib/Types/StreakStatus';
import { GetAllSoloStreaksSortFields } from './soloStreaks';
import { GetAllChallengeStreaksSortFields } from './challengeStreaks';
import { GetAllTeamMemberStreaksSortFields } from './teamMemberStreaks';
import { GetAllTeamStreaksSortFields } from './teamStreaks';

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

    describe('challengeStreaks', () => {
        test('calls GET with correct URL when no query parameters are passed', async () => {
            expect.assertions(1);

            await user.challengeStreaks({});

            expect(getRequest).toBeCalledWith({ route: `/v1/user/challenge-streaks?` });
        });

        test('calls GET with correct URL when completedToday query parameters is passed', async () => {
            expect.assertions(1);

            const completedToday = true;

            await user.challengeStreaks({ completedToday });

            expect(getRequest).toBeCalledWith({ route: `/v1/user/challenge-streaks?completedToday=true&` });
        });

        test('calls GET with correct URL when timezone query parameters is passed', async () => {
            expect.assertions(1);

            const timezone = `Europe/London`;

            await user.challengeStreaks({ timezone });

            expect(getRequest).toBeCalledWith({ route: `/v1/user/challenge-streaks?timezone=${timezone}&` });
        });

        test('calls GET with correct URL when active query parameters is passed', async () => {
            expect.assertions(1);

            const active = true;

            await user.challengeStreaks({ active });

            expect(getRequest).toBeCalledWith({ route: `/v1/user/challenge-streaks?active=${active}&` });
        });

        test('calls GET with correct URL when status query parameters is passed', async () => {
            expect.assertions(1);

            const status = StreakStatus.live;

            await user.challengeStreaks({ status });

            expect(getRequest).toBeCalledWith({ route: `/v1/user/challenge-streaks?status=${status}&` });
        });

        test('calls GET with correct URL when sortField query parameters is passed', async () => {
            expect.assertions(1);

            const sortField = GetAllChallengeStreaksSortFields.currentStreak;

            await user.challengeStreaks({ sortField });

            expect(getRequest).toBeCalledWith({ route: `/v1/user/challenge-streaks?sortField=${sortField}&` });
        });

        test('calls GET with correct URL when limit query parameters is passed', async () => {
            expect.assertions(1);

            const limit = 20;

            await user.challengeStreaks({ limit });

            expect(getRequest).toBeCalledWith({ route: `/v1/user/challenge-streaks?limit=${limit}&` });
        });
    });

    describe('teamMemberStreaks', () => {
        const userId = 'userId';
        const teamStreakId = 'teamStreakId';
        const completedToday = true;
        const timezone = 'Europe/London';
        const active = true;
        const sortField = GetAllTeamMemberStreaksSortFields.currentStreak;
        const limit = 20;

        const query = {
            userId,
            teamStreakId,
            completedToday,
            timezone,
            active,
            sortField,
            limit,
        };

        test('calls GET with correct URL when no query parameters are passed', async () => {
            expect.assertions(1);

            await user.teamMemberStreaks({});

            expect(getRequest).toBeCalledWith({ route: `/v1/user/team-member-streaks?` });
        });

        test('calls GET with correct URL when userId query paramter is passed', async () => {
            expect.assertions(1);

            await user.teamMemberStreaks({ userId });

            expect(getRequest).toBeCalledWith({ route: `/v1/user/team-member-streaks?userId=${userId}&` });
        });

        test('calls GET with correct URL when teamStreakId query paramter is passed', async () => {
            expect.assertions(1);

            await user.teamMemberStreaks({ teamStreakId });

            expect(getRequest).toBeCalledWith({ route: `/v1/user/team-member-streaks?teamStreakId=${teamStreakId}&` });
        });

        test('calls GET with correct URL when completedToday query paramter is passed', async () => {
            expect.assertions(1);

            await user.teamMemberStreaks({ completedToday });

            expect(getRequest).toBeCalledWith({ route: `/v1/user/team-member-streaks?completedToday=true&` });
        });

        test('calls GET with correct URL when timezone query paramter is passed', async () => {
            expect.assertions(1);

            await user.teamMemberStreaks({ timezone });

            expect(getRequest).toBeCalledWith({ route: `/v1/user/team-member-streaks?timezone=${timezone}&` });
        });

        test('calls GET with correct URL when active query paramter is passed', async () => {
            expect.assertions(1);

            await user.teamMemberStreaks({ active });

            expect(getRequest).toBeCalledWith({ route: `/v1/user/team-member-streaks?active=${active}&` });
        });

        test('calls GET with correct URL when active sort paramter is passed', async () => {
            expect.assertions(1);

            await user.teamMemberStreaks({ sortField });

            expect(getRequest).toBeCalledWith({
                route: `/v1/user/team-member-streaks?sortField=${sortField}&`,
            });
        });

        test('calls GET with correct URL when limit paramter is passed', async () => {
            expect.assertions(1);

            await user.teamMemberStreaks({ limit });

            expect(getRequest).toBeCalledWith({
                route: `/v1/user/team-member-streaks?limit=${limit}&`,
            });
        });

        test('calls GET with correct URL when all query parameters are passed', async () => {
            expect.assertions(1);

            await user.teamMemberStreaks(query);

            expect(getRequest).toBeCalledWith({
                route: `/v1/user/team-member-streaks?userId=${userId}&teamStreakId=${teamStreakId}&completedToday=${completedToday}&timezone=${timezone}&active=${active}&sortField=${sortField}&limit=${limit}&`,
            });
        });
    });

    describe('teamStreaks', () => {
        const timezone = 'Europe/London';
        const status = StreakStatus.live;
        const completedToday = true;
        const active = true;
        const sortField = GetAllTeamStreaksSortFields.currentStreak;
        const limit = 20;

        const query = {
            timezone,
            status,
            completedToday,
            active,
            sortField,
            limit,
        };
        test('calls GET with correct URL when no query parameters are passed', async () => {
            expect.assertions(1);

            await user.teamStreaks({});

            expect(getRequest).toBeCalledWith({ route: `/v1/user/team-streaks?` });
        });

        test('calls GET with correct URL when timezone query paramter is passed', async () => {
            expect.assertions(1);

            await user.teamStreaks({ timezone });

            expect(getRequest).toBeCalledWith({ route: `/v1/user/team-streaks?timezone=${timezone}&` });
        });

        test('calls GET with correct URL when status query paramter is passed', async () => {
            expect.assertions(1);

            await user.teamStreaks({ status });

            expect(getRequest).toBeCalledWith({ route: `/v1/user/team-streaks?status=${status}&` });
        });

        test('calls GET with correct URL when completedToday query paramter is passed', async () => {
            expect.assertions(1);

            await user.teamStreaks({ completedToday });

            expect(getRequest).toBeCalledWith({ route: `/v1/user/team-streaks?completedToday=${completedToday}&` });
        });

        test('calls GET with correct URL when active query paramter is passed', async () => {
            expect.assertions(1);

            await user.teamStreaks({ active });

            expect(getRequest).toBeCalledWith({ route: `/v1/user/team-streaks?active=${active}&` });
        });

        test('calls GET with correct URL when sortField query paramter is passed', async () => {
            expect.assertions(1);

            await user.teamStreaks({ sortField });

            expect(getRequest).toBeCalledWith({ route: `/v1/user/team-streaks?sortField=${sortField}&` });
        });

        test('calls GET with correct URL when limit query paramter is passed', async () => {
            expect.assertions(1);

            await user.teamStreaks({ limit });

            expect(getRequest).toBeCalledWith({ route: `/v1/user/team-streaks?limit=${limit}&` });
        });

        test('calls GET with correct URL when all parameters are passed', async () => {
            expect.assertions(1);

            await user.teamStreaks(query);

            expect(getRequest).toBeCalledWith({
                route: `/v1/user/team-streaks?timezone=${timezone}&status=${status}&completedToday=${completedToday}&active=${true}&sortField=${sortField}&limit=${limit}&`,
            });
        });
    });
});
