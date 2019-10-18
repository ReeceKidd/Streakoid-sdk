import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import Feedback from './models/Feedback';
import { AxiosInstance } from 'axios';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const feedbacks = (streakoidClient: AxiosInstance) => {
    const create = async ({
        userId,
        pageUrl,
        username,
        userEmail,
        feedbackText,
    }: {
        userId: string;
        pageUrl: string;
        username: string;
        userEmail: string;
        feedbackText: string;
    }): Promise<Feedback> => {
        try {
            const { data } = await streakoidClient.post(`/${ApiVersions.v1}/${RouterCategories.feedbacks}`, {
                userId,
                pageUrl,
                username,
                userEmail,
                feedbackText,
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

export { feedbacks };
