import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import Email from './models/Email';
import { AxiosInstance } from 'axios';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const emails = (streakoidClient: AxiosInstance) => {
    const create = async ({
        name,
        email,
        message,
        userId,
        username,
    }: {
        name: string;
        email: string;
        message: string;
        userId?: string;
        username?: string;
    }): Promise<Email> => {
        try {
            const { data } = await streakoidClient.post(`/${ApiVersions.v1}/${RouterCategories.emails}`, {
                name,
                email,
                message,
                userId,
                username,
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

export { emails };
