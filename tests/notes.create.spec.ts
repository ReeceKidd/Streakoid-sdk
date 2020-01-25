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

describe('POST /notes', () => {
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

    test(`creates a note for a solo streak`, async () => {
        try {
            expect.assertions(7);

            const soloStreak = await streakoid.soloStreaks.create({
                userId,
                streakName,
                streakDescription,
                numberOfMinutes,
            });

            const text = 'Finished reading book';

            const note = await streakoid.notes.create({
                userId,
                streakId: soloStreak._id,
                text,
                streakType: StreakTypes.team,
            });

            expect(note.userId).toBeDefined();
            expect(note.streakId).toEqual(soloStreak._id);
            expect(note.text).toEqual(text);
            expect(note.streakType).toEqual(StreakTypes.team);
            expect(note.createdAt).toEqual(expect.any(String));
            expect(note.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(note).sort()).toEqual(
                ['_id', 'userId', 'streakId', 'text', 'streakType', 'createdAt', 'updatedAt', '__v'].sort(),
            );
        } catch (err) {
            console.log(err);
        }
    });
});
