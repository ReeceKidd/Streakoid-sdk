import { streakoid } from '../src/streakoid';
import { StreakTypes, AgendaJobNames } from '../src';

jest.setTimeout(120000);

describe('POST /streak-tracking-events', () => {
    test(`creates a successful soloStreakDailyTrackerJob dailyJob`, async () => {
        expect.assertions(9);

        const agendaJobId = 'agendaJobId';
        const timezone = 'Europe/London';
        const localisedJobCompleteTime = new Date().toString();

        const dailyJob = await streakoid.dailyJobs.create({
            agendaJobId,
            jobName: AgendaJobNames.soloStreakDailyTracker,
            timezone,
            localisedJobCompleteTime,
            streakType: StreakTypes.solo,
        });

        expect(dailyJob._id).toEqual(expect.any(String));
        expect(dailyJob.agendaJobId).toEqual(agendaJobId);
        expect(dailyJob.jobName).toEqual(AgendaJobNames.soloStreakDailyTracker);
        expect(dailyJob.timezone).toEqual('Europe/London');
        expect(dailyJob.localisedJobCompleteTime).toEqual(localisedJobCompleteTime);
        expect(dailyJob.streakType).toEqual(StreakTypes.solo);
        expect(dailyJob.createdAt).toEqual(expect.any(String));
        expect(dailyJob.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(dailyJob).sort()).toEqual(
            [
                '_id',
                'agendaJobId',
                'jobName',
                'timezone',
                'localisedJobCompleteTime',
                'streakType',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });
});
