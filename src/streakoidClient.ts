import axios, { AxiosInstance } from 'axios';
import SupportedRequestHeaders from './SupportedRequestHeaders';

export const streakoidClientFactory = (applicationUrl: string, timezone?: string): AxiosInstance => {
    if (timezone) {
        return axios.create({
            headers: {
                'Content-Type': 'application/json',
                [SupportedRequestHeaders.xTimezone]: timezone,
            },
            baseURL: applicationUrl,
        });
    }

    return axios.create({
        headers: {
            'Content-Type': 'application/json',
        },
        baseURL: applicationUrl,
    });
};
