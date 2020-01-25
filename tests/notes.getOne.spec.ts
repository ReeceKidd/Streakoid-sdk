import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { StreakTypes } from '../src';

jest.setTimeout(120000);

describe('GET /notes/:noteId', () => {
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

    test(`get note with noteId`, async () => {
        expect.assertions(6);

        const note = await streakoid.notes.create({
            userId,
            streakId: 'streakId',
            text: 'Worked on Johnny Cash Hurt',
            streakType: StreakTypes.solo,
        });
        expect(note.userId).toBeDefined();
        expect(note.streakId).toEqual(expect.any(String));
        expect(note.text).toEqual(expect.any(String));
        expect(note.streakType).toEqual(StreakTypes.solo);
        expect(note.createdAt).toEqual(expect.any(String));
        expect(note.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(note).sort()).toEqual(
            ['_id', 'userId', 'streakId', 'text', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });
});
