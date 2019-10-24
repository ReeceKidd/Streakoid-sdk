import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import { AxiosInstance } from 'axios';
import ProfileImages from './models/ProfileImages';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const profileImages = (streakoidClient: AxiosInstance) => {
    const create = async ({ image }: { image: string }): Promise<ProfileImages> => {
        try {
            const { data } = await streakoidClient.post(`/${ApiVersions.v1}/${RouterCategories.profileImages}`, {
                image,
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

export { profileImages };
