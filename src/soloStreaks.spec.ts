import { GetAllSoloStreaksSortFields } from './soloStreaks';
import StreakStatus from '@streakoid/streakoid-models/lib/Types/StreakStatus';
import { soloStreaks as soloStreaksImport } from './soloStreaks';
import { CurrentStreak } from '@streakoid/streakoid-models/lib/Models/CurrentStreak';
import { PastStreak } from '@streakoid/streakoid-models/lib/Models/PastStreak';
import IndividualVisibilityTypes from '@streakoid/streakoid-models/lib/Types/IndividualVisibilityTypes';

describe('SDK soloStreaks', () => {
    const getRequest = jest.fn().mockResolvedValue(true);
    const postRequest = jest.fn().mockResolvedValue(true);
    const patchRequest = jest.fn().mockResolvedValue(true);
    const soloStreaks = soloStreaksImport({
        getRequest,
        postRequest,
        patchRequest,
    });

    describe('getAll', () => {
        test('calls GET with correct URL when no query parameters are passed', async () => {
            expect.assertions(1);

            await soloStreaks.getAll({});

            expect(getRequest).toBeCalledWith({ route: `/v1/solo-streaks?` });
        });

        test('calls GET with correct URL when userId query paramter is passed', async () => {
            expect.assertions(1);

            const userId = 'userId';

            await soloStreaks.getAll({ userId });

            expect(getRequest).toBeCalledWith({ route: `/v1/solo-streaks?userId=${userId}&` });
        });

        test('calls GET with correct URL when completedToday query paramter is passed', async () => {
            expect.assertions(1);

            const completedToday = true;

            await soloStreaks.getAll({ completedToday });

            expect(getRequest).toBeCalledWith({ route: `/v1/solo-streaks?completedToday=true&` });
        });

        test('calls GET with correct URL when timezone query paramter is passed', async () => {
            expect.assertions(1);

            const timezone = `Europe/London`;

            await soloStreaks.getAll({ timezone });

            expect(getRequest).toBeCalledWith({ route: `/v1/solo-streaks?timezone=${timezone}&` });
        });

        test('calls GET with correct URL when active query paramter is passed', async () => {
            expect.assertions(1);

            const active = true;

            await soloStreaks.getAll({ active });

            expect(getRequest).toBeCalledWith({ route: `/v1/solo-streaks?active=${active}&` });
        });

        test('calls GET with correct URL when status query paramter is passed', async () => {
            expect.assertions(1);

            const status = StreakStatus.live;

            await soloStreaks.getAll({ status });

            expect(getRequest).toBeCalledWith({ route: `/v1/solo-streaks?status=${status}&` });
        });

        test('calls GET with correct URL when sortField paramter is passed', async () => {
            expect.assertions(1);

            const sortField = GetAllSoloStreaksSortFields.currentStreak;

            await soloStreaks.getAll({ sortField });

            expect(getRequest).toBeCalledWith({ route: `/v1/solo-streaks?sortField=${sortField}&` });
        });

        test('calls GET with correct URL when limit paramter is passed', async () => {
            expect.assertions(1);

            const limit = 20;

            await soloStreaks.getAll({ limit });

            expect(getRequest).toBeCalledWith({ route: `/v1/solo-streaks?limit=${limit}&` });
        });
    });

    describe('getOne', () => {
        test('calls GET with correct URL', async () => {
            expect.assertions(1);

            await soloStreaks.getOne('id');

            expect(getRequest).toBeCalledWith({ route: `/v1/solo-streaks/id` });
        });
    });

    describe('create', () => {
        test('calls POST with correct URL and  parameters', async () => {
            expect.assertions(1);

            const userId = 'userId';
            const streakName = 'streakName';
            const streakDescription = 'streakDescription';
            const numberOfMinutes = 30;
            const visibility = IndividualVisibilityTypes.everyone;

            await soloStreaks.create({
                userId,
                streakName,
                streakDescription,
                numberOfMinutes,
                visibility,
            });

            expect(postRequest).toBeCalledWith({
                route: `/v1/solo-streaks`,
                params: {
                    userId,
                    streakName,
                    streakDescription,
                    numberOfMinutes,
                    visibility,
                },
            });
        });
    });

    describe('update', () => {
        test('calls PATCH with correct URL and parameters', async () => {
            expect.assertions(1);

            const streakName = 'name';
            const streakDescription = 'description';
            const status = StreakStatus.archived;
            const numberOfMinutes = 30;
            const completedToday = false;
            const timezone = 'Europe/London';
            const active = true;
            const currentStreak: CurrentStreak = {
                numberOfDaysInARow: 13,
                startDate: new Date().toString(),
                endDate: undefined,
            };
            const pastStreaks: PastStreak[] = [];
            const userDefinedIndex = 10;
            const visibility = IndividualVisibilityTypes.onlyMe;
            const updateData = {
                streakName,
                streakDescription,
                status,
                numberOfMinutes,
                completedToday,
                timezone,
                active,
                currentStreak,
                pastStreaks,
                userDefinedIndex,
                visibility,
            };

            await soloStreaks.update({
                soloStreakId: 'id',
                updateData,
            });

            expect(patchRequest).toBeCalledWith({
                route: `/v1/solo-streaks/id`,
                params: {
                    ...updateData,
                },
            });
        });
    });

    describe('recover', () => {
        test('calls PATCH with correct URL', async () => {
            expect.assertions(1);

            await soloStreaks.recover({
                soloStreakId: 'id',
            });

            expect(patchRequest).toBeCalledWith({
                route: `/v1/solo-streaks/id/recover`,
            });
        });
    });
});
