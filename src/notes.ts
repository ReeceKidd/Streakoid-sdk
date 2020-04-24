import { AxiosInstance, AxiosResponse } from 'axios';

import ApiVersions from './ApiVersions';
import RouterCategories from '@streakoid/streakoid-models/lib/Types/RouterCategories';
import { Note } from '@streakoid/streakoid-models/lib/Models/Note';
import StreakTypes from '@streakoid/streakoid-models/lib/Types/StreakTypes';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const notes = (streakoidClient: AxiosInstance) => {
    const getAll = async ({ userId, subjectId }: { userId?: string; subjectId?: string }): Promise<Note[]> => {
        try {
            let getAllNotesURL = `/${ApiVersions.v1}/${RouterCategories.notes}?`;

            if (userId) {
                getAllNotesURL = `${getAllNotesURL}userId=${userId}&`;
            }

            if (subjectId) {
                getAllNotesURL = `${getAllNotesURL}subjectId=${subjectId}&`;
            }

            const { data } = await streakoidClient.get(getAllNotesURL);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const getOne = async (noteId: string): Promise<Note> => {
        try {
            const { data } = await streakoidClient.get(`/${ApiVersions.v1}/${RouterCategories.notes}/${noteId}`);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const create = async ({
        userId,
        subjectId,
        text,
        streakType,
    }: {
        userId: string;
        subjectId: string;
        text: string;
        streakType: StreakTypes;
    }): Promise<Note> => {
        try {
            const { data } = await streakoidClient.post(`/${ApiVersions.v1}/${RouterCategories.notes}`, {
                userId,
                subjectId,
                text,
                streakType,
            });
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const deleteOne = ({ noteId }: { noteId: string }): Promise<AxiosResponse> => {
        try {
            return streakoidClient.delete(`/${ApiVersions.v1}/${RouterCategories.notes}/${noteId}`);
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        getAll,
        getOne,
        create,
        deleteOne,
    };
};

export { notes };
