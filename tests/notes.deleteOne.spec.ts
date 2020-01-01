import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';

jest.setTimeout(120000);

describe('DELETE /notes', () => {
    let streakoid: StreakoidFactory;
    let userId: string;

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            const user = await getPayingUser();
            userId = user._id;
            streakoid = await streakoidTest();
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`deletes note`, async () => {
        expect.assertions(3);

        const note = await streakoid.notes.create({ userId, streakId: 'streakId', note: 'Worked on Johnny Cash Hurt' });

        const { status } = await streakoid.notes.deleteOne({ noteId: note._id });

        expect(status).toEqual(204);

        try {
            await streakoid.notes.getOne(note._id);
        } catch (err) {
            expect(err.response.status).toEqual(400);
            expect(err.response.data.message).toEqual('Note does not exist.');
        }
    });
});
