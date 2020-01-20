import { streakoidFactory, streakoidClient } from './streakoid';

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

        test('calls GET with correct URL when streakId query paramater is passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            const streakId = 'streakId';

            await streakoid.notes.getAll({ streakId });

            expect(streakoidClient.get).toBeCalledWith(`/v1/notes?streakId=streakId&`);
        });

        test('calls GET with correct URL when all available paramaters are passed', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            const userId = 'userId';
            const streakId = 'streakId';

            await streakoid.notes.getAll({ userId, streakId });

            expect(streakoidClient.get).toBeCalledWith(`/v1/notes?userId=${userId}&streakId=${streakId}&`);
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
            const streakId = 'streakId';
            const text = 'Finished reading 4 hour work week';

            await streakoid.notes.create({
                userId,
                streakId,
                text,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/notes`, {
                userId,
                streakId,
                text,
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
