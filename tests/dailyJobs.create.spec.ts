import mongoose from 'mongoose';

import { StreakTypes, AgendaJobNames } from '../src';
import { streakoidTest } from './setup/streakoidTest';
import { StreakoidFactory } from '../src/streakoid';
import { getServiceConfig } from '../src/getServiceConfig';

const { TEST_DATABASE_URI, NODE_ENV } = getServiceConfig();

jest.setTimeout(120000);

describe('GET /complete-solo-streak-tasks', () => {
    let streakoid: StreakoidFactory;

    beforeAll(async () => {
        if (NODE_ENV === 'test' && TEST_DATABASE_URI.includes('TEST')) {
            await mongoose.connect(TEST_DATABASE_URI, { useNewUrlParser: true, useFindAndModify: false });
            streakoid = await streakoidTest();
        }
    });

    afterAll(async () => {
        if (NODE_ENV === 'test' && TEST_DATABASE_URI.includes('TEST')) {
            await mongoose.connection.dropDatabase();
            await mongoose.disconnect();
        }
    });

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
