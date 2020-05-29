import { AxiosInstance } from 'axios';
import { GetRequest, PostRequest, DeleteRequest, PatchRequest } from './request';
import { StreakoidSDK, streakoidSDKFactory } from './streakoidSDKFactory';

export const streakoidAxiosSDKFactory = (streakoidClient: AxiosInstance): StreakoidSDK => {
    const getRequest: GetRequest = async ({ route }) => {
        const { body } = await streakoidClient.get(route);
        return body;
    };
    const getRequestActivityFeed: GetRequest = ({ route }) => streakoidClient.get(route);
    const postRequest: PostRequest = async ({ route, params }) => {
        const { body } = await streakoidClient.post(route, params);
        return body;
    };
    const patchRequest: PatchRequest = async ({ route, params }) => {
        if (params) {
            const { body } = await streakoidClient.patch(route, params);
            return body;
        }
        const { body } = await streakoidClient.patch(route);
        return body;
    };
    const deleteRequest: DeleteRequest = async ({ route }) => streakoidClient.delete(route);
    return streakoidSDKFactory({ getRequest, getRequestActivityFeed, postRequest, patchRequest, deleteRequest });
};
