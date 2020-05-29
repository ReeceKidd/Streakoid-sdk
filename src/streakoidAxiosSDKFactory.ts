import { AxiosInstance } from 'axios';
import { GetRequest, PostRequest, DeleteRequest, PatchRequest } from './request';
import { StreakoidSDK, streakoidSDKFactory } from './streakoidSDKFactory';

export const streakoidAxiosSDKFactory = (streakoidClient: AxiosInstance): StreakoidSDK => {
    const getRequest: GetRequest = async ({ route }) => {
        const { data } = await streakoidClient.get(route);
        return data;
    };
    const getRequestActivityFeed: GetRequest = ({ route }) => streakoidClient.get(route);
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
