import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { StreakTypes } from '../src';

jest.setTimeout(120000);

const streakName = 'Daily Spanish';
const streakDescription = 'I must do 30 minutes of Spanish everyday';
const numberOfMinutes = 30;

describe('GET /notes', () => {
    let streakoid: StreakoidFactory;
    let userId: string;

    beforeEach(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            const user = await getPayingUser();
            userId = user._id;
            streakoid = await streakoidTest();
        }
    });

    afterEach(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`gets all created notes with no query paramaters.`, async () => {
        expect.assertions(6);

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName,
            streakDescription,
            numberOfMinutes,
        });

        const noteText = 'Finished reading book';

        await streakoid.notes.create({
            userId,
            streakId: soloStreak._id,
            text: noteText,
            streakType: StreakTypes.solo,
        });

        const notes = await streakoid.notes.getAll({});

        const note = notes[0];

        expect(note.userId).toBeDefined();
        expect(note.streakId).toEqual(soloStreak._id);
        expect(note.text).toEqual(noteText);
        expect(note.streakType).toEqual(StreakTypes.solo);
        expect(note.createdAt).toEqual(expect.any(String));
        expect(note.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(note).sort()).toEqual(
            ['_id', 'userId', 'streakId', 'streakType', 'text', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`gets all created notes with user query paramater.`, async () => {
        expect.assertions(6);

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName,
            streakDescription,
            numberOfMinutes,
        });

        const text = 'Finished reading book';

        await streakoid.notes.create({ userId, streakId: soloStreak._id, text, streakType: StreakTypes.solo });

        const notes = await streakoid.notes.getAll({ userId });
        const note = notes[0];

        expect(note.userId).toBeDefined();
        expect(note.streakId).toEqual(soloStreak._id);
        expect(note.text).toEqual(text);
        expect(note.streakType).toEqual(StreakTypes.solo);
        expect(note.createdAt).toEqual(expect.any(String));
        expect(note.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(note).sort()).toEqual(
            ['_id', 'userId', 'streakId', 'text', 'streakType', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`gets all created notes with user query paramater.`, async () => {
        expect.assertions(6);

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName,
            streakDescription,
            numberOfMinutes,
        });

        const text = 'Finished reading book';

        await streakoid.notes.create({ userId, streakId: soloStreak._id, streakType: StreakTypes.solo, text });

        const notes = await streakoid.notes.getAll({ streakId: soloStreak._id });
        const note = notes[0];

        expect(note.userId).toBeDefined();
        expect(note.streakId).toEqual(soloStreak._id);
        expect(note.text).toEqual(text);
        expect(note.streakType).toEqual(StreakTypes.solo);
        expect(note.createdAt).toEqual(expect.any(String));
        expect(note.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(note).sort()).toEqual(
            ['_id', 'userId', 'streakId', 'streakType', 'text', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });
});
