import { AxiosInstance, AxiosResponse } from 'axios';

import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import Note from './models/Note';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const notes = (streakoidClient: AxiosInstance) => {
    const getAll = async ({ userId, streakId }: { userId?: string; streakId?: string }): Promise<Note[]> => {
        try {
            let getAllNotesURL = `/${ApiVersions.v1}/${RouterCategories.notes}?`;

            if (userId) {
                getAllNotesURL = `${getAllNotesURL}userId=${userId}&`;
            }

            if (streakId) {
                getAllNotesURL = `${getAllNotesURL}streakId=${streakId}&`;
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
        streakId,
        text,
    }: {
        userId: string;
        streakId: string;
        text: string;
    }): Promise<Note> => {
        try {
            const { data } = await streakoidClient.post(`/${ApiVersions.v1}/${RouterCategories.notes}`, {
                userId,
                streakId,
                text,
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
