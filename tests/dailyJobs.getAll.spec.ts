import { StreakTypes, AgendaJobNames } from '../src';
import { streakoidTest, getUser } from './setup/streakoidTest';
import { StreakoidFactory } from '../src/streakoid';

jest.setTimeout(120000);

describe('POST /streak-tracking-events', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    const jobName = AgendaJobNames.soloStreakDailyTracker;
    const agendaJobId = 'agendaJobId';
    const timezone = 'Europe/London';
    const localisedJobCompleteTime = new Date().toString();

    beforeAll(async () => {
        const user = await getUser();
        userId = user._id;
        streakoid = await streakoidTest();

        await streakoid.dailyJobs.create({
            agendaJobId,
            jobName,
            timezone,
            localisedJobCompleteTime,
            streakType: StreakTypes.solo,
        });
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
    });

    test(`gets a dailyJob using the agendaJobId query paramater`, async () => {
        expect.assertions(9);

        const dailyJobs = await streakoid.dailyJobs.getAll({ agendaJobId });
        const dailyJob = dailyJobs[0];

        expect(dailyJob._id).toEqual(expect.any(String));
        expect(dailyJob.agendaJobId).toEqual(agendaJobId);
        expect(dailyJob.jobName).toEqual(AgendaJobNames.soloStreakDailyTracker);
        expect(dailyJob.timezone).toEqual('Europe/London');
        expect(dailyJob.localisedJobCompleteTime).toEqual(expect.any(String));
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

    test(`gets a dailyJob using the jobName query paramater`, async () => {
        expect.assertions(9);

        const dailyJobs = await streakoid.dailyJobs.getAll({ jobName });
        const dailyJob = dailyJobs[0];

        expect(dailyJob._id).toEqual(expect.any(String));
        expect(dailyJob.agendaJobId).toEqual(agendaJobId);
        expect(dailyJob.jobName).toEqual(AgendaJobNames.soloStreakDailyTracker);
        expect(dailyJob.timezone).toEqual('Europe/London');
        expect(dailyJob.localisedJobCompleteTime).toEqual(expect.any(String));
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

    test(`gets a dailyJob using the timezone query paramater`, async () => {
        expect.assertions(9);

        const dailyJobs = await streakoid.dailyJobs.getAll({ timezone });
        const dailyJob = dailyJobs[0];

        expect(dailyJob._id).toEqual(expect.any(String));
        expect(dailyJob.agendaJobId).toEqual(agendaJobId);
        expect(dailyJob.jobName).toEqual(AgendaJobNames.soloStreakDailyTracker);
        expect(dailyJob.timezone).toEqual('Europe/London');
        expect(dailyJob.localisedJobCompleteTime).toEqual(expect.any(String));
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
