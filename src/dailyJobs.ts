import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import { AxiosInstance } from 'axios';
import AgendaJobNames from './AgendaJobNames';
import StreakTypes from './StreakTypes';
import DailyJob from './models/DailyJob';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const dailyJobs = (streakoidClient: AxiosInstance) => {
    const getAll = async ({
        agendaJobId,
        jobName,
        timezone,
    }: {
        agendaJobId?: string;
        jobName?: AgendaJobNames;
        timezone?: string;
    }): Promise<DailyJob[]> => {
        try {
            let getAllDailyJobsURL = `/${ApiVersions.v1}/${RouterCategories.dailyJobs}?`;

            if (agendaJobId) {
                getAllDailyJobsURL = `${getAllDailyJobsURL}agendaJobId=${agendaJobId}&`;
            }

            if (jobName) {
                getAllDailyJobsURL = `${getAllDailyJobsURL}jobName=${jobName}&`;
            }

            if (timezone) {
                getAllDailyJobsURL = `${getAllDailyJobsURL}timezone=${timezone}&`;
            }

            const { data } = await streakoidClient.get(getAllDailyJobsURL);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };
    const create = async ({
        agendaJobId,
        jobName,
        timezone,
        localisedJobCompleteTime,
        streakType,
    }: {
        agendaJobId: string;
        jobName: AgendaJobNames;
        timezone: string;
        localisedJobCompleteTime: string;
        streakType: StreakTypes;
    }): Promise<DailyJob> => {
        try {
            const { data } = await streakoidClient.post(`/${ApiVersions.v1}/${RouterCategories.dailyJobs}`, {
                agendaJobId,
                jobName,
                timezone,
                localisedJobCompleteTime,
                streakType,
            });
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        getAll,
        create,
    };
};

export { dailyJobs };
