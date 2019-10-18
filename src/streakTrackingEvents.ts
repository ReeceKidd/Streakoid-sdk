import { AxiosInstance } from 'axios';

import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import StreakTrackingEvent from './models/StreakTrackingEvent';
import { StreakTrackingEventTypes } from '.';
import StreakTypes from './StreakTypes';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const streakTrackingEvents = (streakoidClient: AxiosInstance) => {
    const getAll = async ({
        type,
        userId,
        streakId,
        streakType,
    }: {
        type?: StreakTrackingEventTypes;
        userId?: string;
        streakId?: string;
        streakType?: StreakTypes;
    }): Promise<StreakTrackingEvent[]> => {
        try {
            let getAllSoloStreaksURL = `/${ApiVersions.v1}/${RouterCategories.streakTrackingEvents}?`;

            if (type) {
                getAllSoloStreaksURL = `${getAllSoloStreaksURL}type=${type}&`;
            }
            if (userId) {
                getAllSoloStreaksURL = `${getAllSoloStreaksURL}userId=${userId}&`;
            }
            if (streakId) {
                getAllSoloStreaksURL = `${getAllSoloStreaksURL}streakId=${streakId}&`;
            }
            if (streakType) {
                getAllSoloStreaksURL = `${getAllSoloStreaksURL}streakType=${streakType}&`;
            }
            const { data } = await streakoidClient.get(getAllSoloStreaksURL);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const getOne = async (streakTrackingEventId: string): Promise<StreakTrackingEvent> => {
        try {
            const { data } = await streakoidClient.get(
                `/${ApiVersions.v1}/${RouterCategories.streakTrackingEvents}/${streakTrackingEventId}`,
            );
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const create = async ({
        type,
        streakId,
        streakType,
        userId,
    }: {
        type: StreakTrackingEventTypes;
        streakId: string;
        streakType: StreakTypes;
        userId?: string;
    }): Promise<StreakTrackingEvent> => {
        try {
            const { data } = await streakoidClient.post(`/${ApiVersions.v1}/${RouterCategories.streakTrackingEvents}`, {
                type,
                streakId,
                userId,
                streakType,
            });
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        getAll,
        getOne,
        create,
    };
};

export { streakTrackingEvents };
