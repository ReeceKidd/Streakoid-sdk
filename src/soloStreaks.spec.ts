import { streakoidFactory, streakoidClient } from './streakoid';
import { GetAllSoloStreaksSortFields } from './soloStreaks';
import StreakStatus from '@streakoid/streakoid-models/lib/Types/StreakStatus';

describe('SDK soloStreaks', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        test('calls GET with correct URL when no query paramters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.soloStreaks.getAll({});

            expect(streakoidClient.get).toBeCalledWith(`/v1/solo-streaks?`);
        });

        test('calls GET with correct URL when userId query paramter is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            const userId = 'userId';

            await streakoid.soloStreaks.getAll({ userId });

            expect(streakoidClient.get).toBeCalledWith(`/v1/solo-streaks?userId=${userId}&`);
        });

        test('calls GET with correct URL when completedToday query paramter is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            const completedToday = true;

            await streakoid.soloStreaks.getAll({ completedToday });

            expect(streakoidClient.get).toBeCalledWith(`/v1/solo-streaks?completedToday=true&`);
        });

        test('calls GET with correct URL when timezone query paramter is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            const timezone = `Europe/London`;

            await streakoid.soloStreaks.getAll({ timezone });

            expect(streakoidClient.get).toBeCalledWith(`/v1/solo-streaks?timezone=${timezone}&`);
        });

        test('calls GET with correct URL when active query paramter is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            const active = true;

            await streakoid.soloStreaks.getAll({ active });

            expect(streakoidClient.get).toBeCalledWith(`/v1/solo-streaks?active=${active}&`);
        });

        test('calls GET with correct URL when status query paramter is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            const status = StreakStatus.live;

            await streakoid.soloStreaks.getAll({ status });

            expect(streakoidClient.get).toBeCalledWith(`/v1/solo-streaks?status=${status}&`);
        });

        test('calls GET with correct URL when sortField paramter is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            const sortField = GetAllSoloStreaksSortFields.currentStreak;

            await streakoid.soloStreaks.getAll({ sortField });

            expect(streakoidClient.get).toBeCalledWith(`/v1/solo-streaks?sortField=${sortField}&`);
        });
    });

    describe('getOne', () => {
        test('calls GET with correct URL', async () => {
            expect.assertions(1);

            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.soloStreaks.getOne('id');

            expect(streakoidClient.get).toBeCalledWith(`/v1/solo-streaks/id`);
        });
    });

    describe('create', () => {
        test('calls POST with correct URL and  parmaters', async () => {
            expect.assertions(1);

            streakoidClient.post = jest.fn().mockResolvedValue(true);
            const userId = 'userId';
            const streakName = 'streakName';
            const streakDescription = 'streakDescription';

            await streakoid.soloStreaks.create({
                userId,
                streakName,
                streakDescription,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/solo-streaks`, {
                userId,
                streakName,
                streakDescription,
            });
        });
    });

    describe('update', () => {
        test('calls PATCH with correct URL and  parmaters', async () => {
            expect.assertions(1);

            streakoidClient.patch = jest.fn().mockResolvedValue(true);
            const streakName = 'name';
            const streakDescription = 'description';
            const updateData = {
                streakName,
                streakDescription,
            };

            await streakoid.soloStreaks.update({
                soloStreakId: 'id',
                updateData,
            });

            expect(streakoidClient.patch).toBeCalledWith(`/v1/solo-streaks/id`, {
                ...updateData,
            });
        });
    });
});
