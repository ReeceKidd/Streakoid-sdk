import ApiVersions from './ApiVersions';
import { AxiosInstance } from 'axios';
import { Email } from '@streakoid/streakoid-models/lib/Models/Email';
import RouterCategories from '@streakoid/streakoid-models/lib/Types/RouterCategories';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const emails = (streakoidClient: AxiosInstance) => {
    const create = async ({
        name,
        email,
        subject,
        message,
        userId,
        username,
    }: {
        name: string;
        email: string;
        subject: string;
        message: string;
        userId?: string;
        username?: string;
    }): Promise<Email> => {
        try {
            const { data } = await streakoidClient.post(`/${ApiVersions.v1}/${RouterCategories.emails}`, {
                name,
                email,
                subject,
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
