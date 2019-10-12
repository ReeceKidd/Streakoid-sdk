import { streakoidFactory, streakoidClient } from './streakoid';
import { AgendaJobNames, StreakTypes } from '.';

describe('SDK soloStreaks', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
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
