import { streakoidFactory, streakoidClient } from './streakoid';
import StreakStatus from './StreakStatus';
import { CurrentStreak } from '.';
import PastStreak from './models/PastStreak';
import { GetAllTeamStreaksSortFields } from './teamStreaks';

describe('SDK TeamStreaks', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        const creatorId = 'creatorId';
        const memberId = 'memberId';
        const timezone = 'Europe/London';
        const status = StreakStatus.live;
        const completedToday = true;
        const active = true;
        const sortField = GetAllTeamStreaksSortFields.currentStreak;

        const query = {
            creatorId,
            memberId,
            timezone,
            status,
            completedToday,
            active,
            sortField,
        };
        test('calls GET with correct URL when no query paramters are passed', async () => {
            expect.assertions(1);

            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.teamStreaks.getAll({});

            expect(streakoidClient.get).toBeCalledWith(`/v1/team-streaks?`);
        });

        test('calls GET with correct URL when creatorId query paramater is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.teamStreaks.getAll({ creatorId });

            expect(streakoidClient.get).toBeCalledWith(`/v1/team-streaks?creatorId=${creatorId}&`);
        });

        test('calls GET with correct URL when memberId query paramater is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.teamStreaks.getAll({ memberId });

            expect(streakoidClient.get).toBeCalledWith(`/v1/team-streaks?memberId=${memberId}&`);
        });

        test('calls GET with correct URL when timezone query paramater is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.teamStreaks.getAll({ timezone });

            expect(streakoidClient.get).toBeCalledWith(`/v1/team-streaks?timezone=${timezone}&`);
        });

        test('calls GET with correct URL when status query paramater is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.teamStreaks.getAll({ status });

            expect(streakoidClient.get).toBeCalledWith(`/v1/team-streaks?status=${status}&`);
        });

        test('calls GET with correct URL when completedToday query paramater is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.teamStreaks.getAll({ completedToday });

            expect(streakoidClient.get).toBeCalledWith(`/v1/team-streaks?completedToday=${completedToday}&`);
        });

        test('calls GET with correct URL when active query paramater is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.teamStreaks.getAll({ active });

            expect(streakoidClient.get).toBeCalledWith(`/v1/team-streaks?active=${active}&`);
        });

        test('calls GET with correct URL when sortField query paramater is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.teamStreaks.getAll({ sortField });

            expect(streakoidClient.get).toBeCalledWith(`/v1/team-streaks?sortField=${sortField}&`);
        });

        test('calls GET with correct URL when all paramaters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.teamStreaks.getAll(query);

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/team-streaks?creatorId=${creatorId}&memberId=${memberId}&timezone=${timezone}&status=${status}&completedToday=${completedToday}&active=${true}&sortField=${sortField}&`,
            );
        });
    });

    describe('getOne', () => {
        test('calls GET with correct URL', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.teamStreaks.getOne('id');

            expect(streakoidClient.get).toBeCalledWith(`/v1/team-streaks/id`);
        });
    });

    describe('create', () => {
        test('calls POST with correct URL and  parmaters', async () => {
            expect.assertions(1);
            streakoidClient.post = jest.fn().mockResolvedValue(true);

            const creatorId = 'abcdefgh';
            const streakName = 'Followed our calorie level';
            const streakDescription = 'Stuck to our recommended calorie level';

            const members: [] = [];

            await streakoid.teamStreaks.create({
                creatorId,
                streakName,
                streakDescription,
                members,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/team-streaks`, {
                creatorId,
                streakName,
                streakDescription,
                members,
            });
        });
    });

    describe('update', () => {
        test('calls PATCH with correct URL and  parmaters', async () => {
            expect.assertions(1);
            streakoidClient.patch = jest.fn().mockResolvedValue(true);
            const streakName = 'streakName';
            const streakDescription = 'streakDescription';
            const numberOfMinutes = 30;
            const timezone = 'Europe/London';
            const status = StreakStatus.archived;
            const currentStreak: CurrentStreak = {
                startDate: new Date().toString(),
                numberOfDaysInARow: 1,
            };
            const pastStreaks: PastStreak[] = [];
            const completedToday = true;
            const active = true;

            const updateData = {
                streakName,
                streakDescription,
                numberOfMinutes,
                timezone,
                status,
                currentStreak,
                pastStreaks,
                completedToday,
                active,
            };

            await streakoid.teamStreaks.update({
                teamStreakId: 'id',
                updateData,
            });

            expect(streakoidClient.patch).toBeCalledWith(`/v1/team-streaks/id`, {
                ...updateData,
            });
        });
    });
});
