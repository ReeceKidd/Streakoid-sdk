import axios, { AxiosInstance } from 'axios';
import SupportedRequestHeaders from './SupportedRequestHeaders';

export const streakoidClientFactory = (
    applicationUrl: string,
    timezone?: string,
    authorisation?: string,
): AxiosInstance => {
    let headers: {
        'Content-Type'?: string;
        [SupportedRequestHeaders.xTimezone]?: string;
        [SupportedRequestHeaders.Authorization]?: string;
    } = {
        'Content-Type': 'application/json',
    };
    if (timezone) {
        headers = { ...headers, [SupportedRequestHeaders.xTimezone]: timezone };
    }
    if (authorisation) {
        headers = { ...headers, [SupportedRequestHeaders.Authorization]: authorisation };
    }
    return axios.create({
        headers,
        baseURL: applicationUrl,
    });
};
