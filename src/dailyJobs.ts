import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import CompleteSoloStreakTask from './models/CompleteSoloStreakTask';
import { AxiosInstance } from 'axios';
import AgendaJobNames from './AgendaJobNames';
import StreakTypes from './StreakTypes';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (streakoidClient: AxiosInstance) => {
    const create = async ({
        agendaJobId,
        jobName,
        timezone,
        localisedJobCompleteTime,
        streakType,
        wasSuccessful,
    }: {
        agendaJobId: string;
        jobName: AgendaJobNames;
        timezone: string;
        localisedJobCompleteTime: string;
        streakType: StreakTypes;
        wasSuccessful: boolean;
    }): Promise<CompleteSoloStreakTask> => {
        try {
            const { data } = await streakoidClient.post(`/${ApiVersions.v1}/${RouterCategories.dailyJobs}`, {
                agendaJobId,
                jobName,
                timezone,
                localisedJobCompleteTime,
                streakType,
                wasSuccessful,
            });
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        create,
    };
};
