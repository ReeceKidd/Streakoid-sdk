import { streakoidFactory, streakoidClient } from './streakoid';
import StreakTypes from '@streakoid/streakoid-models/lib/Types/StreakTypes';

describe('SDK notes', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        test('calls GET with correct URL when no query paramters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.notes.getAll({});

            expect(streakoidClient.get).toBeCalledWith(`/v1/notes?`);
        });

        test('calls GET with correct URL when userId query paramater is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            const userId = 'userId';

            await streakoid.notes.getAll({ userId });

            expect(streakoidClient.get).toBeCalledWith(`/v1/notes?userId=${userId}&`);
        });

        test('calls GET with correct URL when subjectId query paramater is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            const subjectId = 'subjectId';

            await streakoid.notes.getAll({ subjectId });

            expect(streakoidClient.get).toBeCalledWith(`/v1/notes?subjectId=subjectId&`);
        });

        test('calls GET with correct URL when all available paramaters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            const userId = 'userId';
            const subjectId = 'subjectId';

            await streakoid.notes.getAll({ userId, subjectId });

            expect(streakoidClient.get).toBeCalledWith(`/v1/notes?userId=${userId}&subjectId=${subjectId}&`);
        });
    });

    describe('getOne', () => {
        test('calls GET with correct URL', async () => {
            expect.assertions(1);

            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.notes.getOne('id');

            expect(streakoidClient.get).toBeCalledWith(`/v1/notes/id`);
        });
    });

    describe('create', () => {
        test('calls POST with correct URL and  parmaters', async () => {
            expect.assertions(1);

            streakoidClient.post = jest.fn().mockResolvedValue(true);
            const userId = 'userId';
            const subjectId = 'subjectId';
            const text = 'Finished reading 4 hour work week';
            const streakType = StreakTypes.solo;

            await streakoid.notes.create({
                userId,
                subjectId,
                text,
                streakType,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/notes`, {
                userId,
                subjectId,
                text,
                streakType,
            });
        });
    });

    describe('deleteOne', () => {
        test('calls DELETE correct URL ', async () => {
            expect.assertions(1);
            streakoidClient.delete = jest.fn();

            await streakoid.notes.deleteOne({
                noteId: 'noteId',
            });

            expect(streakoidClient.delete).toBeCalledWith(`/v1/notes/noteId`);
        });
    });
});
