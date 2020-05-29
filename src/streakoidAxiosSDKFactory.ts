import { AxiosInstance } from 'axios';
import { GetRequest, PostRequest, DeleteRequest, PatchRequest } from './request';
import { StreakoidSDK, streakoidSDKFactory } from './streakoidSDKFactory';
import SupportedResponseHeaders from '@streakoid/streakoid-models/lib/Types/SupportedResponseHeaders';

export const streakoidAxiosSDKFactory = (streakoidClient: AxiosInstance): StreakoidSDK => {
    const getRequest: GetRequest = async ({ route }) => {
        const { data } = await streakoidClient.get(route);
        return data;
    };
    const getRequestActivityFeed: GetRequest = async ({ route }) => {
        const response = await streakoidClient.get(route);
        return {
            activityFeedItems: response.data,
            totalCountOfActivityFeedItems: Number(response.headers[SupportedResponseHeaders.TotalCount]),
        };
    };
    const postRequest: PostRequest = async ({ route, params }) => {
        const { data } = await streakoidClient.post(route, params);
        return data;
    };
    const patchRequest: PatchRequest = async ({ route, params }) => {
        if (params) {
            const { data } = await streakoidClient.patch(route, params);
            return data;
        }
        const { data } = await streakoidClient.patch(route);
        return data;
    };
    const deleteRequest: DeleteRequest = async ({ route }) => streakoidClient.delete(route);
    return streakoidSDKFactory({ getRequest, getRequestActivityFeed, postRequest, patchRequest, deleteRequest });
};
