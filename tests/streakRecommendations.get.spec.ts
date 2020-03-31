import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { getPayingUser } from './setup/getPayingUser';

jest.setTimeout(120000);

describe('GET /streak-recommendations', () => {
    let streakoid: StreakoidFactory;
    const name = 'Duolingo';
    const description = 'Everyday I must complete a duolingo lesson';
    const icon = 'duolingo';
    const color = 'blue';
    const levels = [{ level: 0, criteria: 'criteria' }];

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            await getPayingUser();
            streakoid = await streakoidTest();
            await streakoid.challenges.create({
                name,
                description,
                icon,
                color,
                levels,
            });
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`random streak recommendations can be retreived`, async () => {
        expect.assertions(15);

        const streakRecommendations = await streakoid.streakRecommendations.getAll({ random: true, limit: 5 });

        const streakRecommendation = streakRecommendations[0];

        expect(streakRecommendation._id).toEqual(expect.any(String));
        expect(streakRecommendation.name).toEqual(name);
        expect(streakRecommendation.description).toEqual(description);
        expect(streakRecommendation.icon).toEqual(icon);
        expect(streakRecommendation.color).toEqual(color);
        expect(streakRecommendation.badgeId).toBeDefined();
        expect(streakRecommendation.members).toEqual([]);
        expect(streakRecommendation.numberOfMembers).toEqual(0);
        expect(streakRecommendation.levels.length).toEqual(1);
        const level = streakRecommendation.levels[0];
        expect(Object.keys(level).sort()).toEqual(['_id', 'level', 'criteria'].sort());
        expect(level.level).toEqual(0);
        expect(level.criteria).toEqual('criteria');
        expect(streakRecommendation.createdAt).toEqual(expect.any(String));
        expect(streakRecommendation.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(streakRecommendation).sort()).toEqual(
            [
                '_id',
                'name',
                'description',
                'icon',
                'color',
                'badgeId',
                'levels',
                'members',
                'numberOfMembers',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });

    test(`non random streak recommendations can be retreived`, async () => {
        expect.assertions(15);

        const streakRecommendations = await streakoid.streakRecommendations.getAll({ random: false, limit: 5 });

        const streakRecommendation = streakRecommendations[0];

        expect(streakRecommendation._id).toEqual(expect.any(String));
        expect(streakRecommendation.name).toEqual(name);
        expect(streakRecommendation.description).toEqual(description);
        expect(streakRecommendation.icon).toEqual(icon);
        expect(streakRecommendation.color).toEqual(color);
        expect(streakRecommendation.badgeId).toBeDefined();
        expect(streakRecommendation.members).toEqual([]);
        expect(streakRecommendation.numberOfMembers).toEqual(0);
        expect(streakRecommendation.levels.length).toEqual(1);
        const level = streakRecommendation.levels[0];
        expect(Object.keys(level).sort()).toEqual(['_id', 'level', 'criteria'].sort());
        expect(level.level).toEqual(0);
        expect(level.criteria).toEqual('criteria');
        expect(streakRecommendation.createdAt).toEqual(expect.any(String));
        expect(streakRecommendation.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(streakRecommendation).sort()).toEqual(
            [
                '_id',
                'name',
                'description',
                'icon',
                'color',
                'badgeId',
                'levels',
                'members',
                'numberOfMembers',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });
});
