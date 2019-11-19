import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { StreakoidFactory } from '../src/streakoid';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';

jest.setTimeout(120000);

describe('POST /badges', () => {
    let streakoid: StreakoidFactory;

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            await getPayingUser();
            streakoid = await streakoidTest();
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`creates a badge`, async () => {
        expect.assertions(13);

        const name = 'Duolingo';
        const description = 'Everyday I must complete a duolingo lesson';
        const icon = 'duolingo';
        const levels = [{ level: 0, color: 'blue', criteria: '30 days of Duolingo' }];

        const badge = await streakoid.badges.create({
            name,
            description,
            icon,
            levels,
        });

        expect(badge._id).toEqual(expect.any(String));
        expect(badge.name).toEqual(name);
        expect(badge.description).toEqual(description);
        expect(badge.icon).toEqual(icon);
        expect(badge.levels).toEqual(expect.any(Array));
        const level = badge.levels[0];
        expect(Object.keys(level).sort()).toEqual(['_id', 'level', 'color', 'criteria'].sort());
        expect(level._id).toEqual(expect.any(String));
        expect(level.level).toEqual(0);
        expect(level.color).toEqual('blue');
        expect(level.criteria).toEqual(expect.any(String));
        expect(badge.createdAt).toEqual(expect.any(String));
        expect(badge.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(badge).sort()).toEqual(
            ['_id', 'name', 'description', 'icon', 'levels', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });
});
