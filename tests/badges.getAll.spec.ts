import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { getPayingUser } from './setup/getPayingUser';

jest.setTimeout(120000);

describe('GET /badges', () => {
    let streakoid: StreakoidFactory;
    const name = 'Duolingo';
    const description = 'Everyday I must complete a duolingo lesson';
    const icon = 'duolingo';
    const levels = [{ level: 0, color: 'blue', criteria: '30 days of Duolingo' }];

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            streakoid = await streakoidTest();
            await getPayingUser();
            await streakoid.badges.create({
                name,
                description,
                icon,
                levels,
            });
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`gets a badge using the name query paramater`, async () => {
        expect.assertions(13);

        const badges = await streakoid.badges.getAll({ name });
        const badge = badges[0];

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

    test(`gets a badge without the query paramater`, async () => {
        expect.assertions(13);

        const badges = await streakoid.badges.getAll({ name });
        const badge = badges[0];

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
