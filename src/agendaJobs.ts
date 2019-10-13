import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import { AxiosInstance, AxiosResponse } from 'axios';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const agendaJobs = (streakoidClient: AxiosInstance) => {
    const deleteOne = (agendaJobId: string): Promise<AxiosResponse> => {
        try {
            return streakoidClient.delete(`/${ApiVersions.v1}/${RouterCategories.agendaJobs}/${agendaJobId}`);
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        deleteOne,
    };
};

export { agendaJobs };
