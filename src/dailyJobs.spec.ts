import { streakoidFactory, streakoidClient } from './streakoid';
import AgendaJobNames from '@streakoid/streakoid-models/lib/Types/AgendaJobNames';
import StreakTypes from '@streakoid/streakoid-models/lib/Types/StreakTypes';

describe('SDK dailyJobs', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        const agendaJobId = 'agendaJobId';
        const jobName = AgendaJobNames.teamStreakDailyTracker;
        const timezone = 'Europe/London';

        const query = {
            agendaJobId,
            jobName,
            timezone,
        };

        test('calls GET with correct URL when no query paramters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.dailyJobs.getAll({});

            expect(streakoidClient.get).toBeCalledWith(`/v1/daily-jobs?`);
        });

        test('calls GET with correct URL when all query paramters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.dailyJobs.getAll(query);

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/daily-jobs?agendaJobId=${agendaJobId}&jobName=${jobName}&timezone=${timezone}&`,
            );
        });

        test('calls GET with correct URL when agendaJobId query paramter is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.dailyJobs.getAll({ agendaJobId });

            expect(streakoidClient.get).toBeCalledWith(`/v1/daily-jobs?agendaJobId=${agendaJobId}&`);
        });

        test('calls GET with correct URL when jobName query paramter is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.dailyJobs.getAll({ jobName });

            expect(streakoidClient.get).toBeCalledWith(`/v1/daily-jobs?jobName=${jobName}&`);
        });

        test('calls GET with correct URL when timezone query paramter is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            const timezone = `Europe/London`;

            await streakoid.dailyJobs.getAll({ timezone });

            expect(streakoidClient.get).toBeCalledWith(`/v1/daily-jobs?timezone=${timezone}&`);
        });
    });

    describe('create', () => {
        test('calls POST with correct URL and  parmaters', async () => {
            expect.assertions(1);

            streakoidClient.post = jest.fn().mockResolvedValue(true);
            const agendaJobId = 'agendaJobId';
            const jobName = AgendaJobNames.soloStreakDailyTracker;
            const timezone = 'Europe/London';
            const localisedJobCompleteTime = new Date().toString();
            const streakType = StreakTypes.solo;

            await streakoid.dailyJobs.create({
                agendaJobId,
                jobName,
                timezone,
                localisedJobCompleteTime,
                streakType,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/daily-jobs`, {
                agendaJobId,
                jobName,
                timezone,
                localisedJobCompleteTime,
                streakType,
            });
        });
    });
});
