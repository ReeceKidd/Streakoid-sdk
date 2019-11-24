import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { StreakoidFactory } from '../src/streakoid';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { BadgeTypes } from '../src';

jest.setTimeout(120000);

describe('POST /challenges', () => {
    let streakoid: StreakoidFactory;
    let badgeId: string;

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            await getPayingUser();
            streakoid = await streakoidTest();
            const name = 'Duolingo';
            const description = 'Everyday I must complete a duolingo lesson';
            const badgeType = BadgeTypes.challenge;
            const icon = 'duolingo';
            const badge = await streakoid.badges.create({
                name,
                description,
                badgeType,
                icon,
            });
            badgeId = badge._id;
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`creates a challenge with minimum paramaters`, async () => {
        expect.assertions(13);

        const name = 'Duolingo';
        const description = 'Everyday I must complete a duolingo lesson';
        const icon = 'duolingo';
        const color = 'blue';
        const levels = [{ level: 0, criteria: 'criteria' }];

        const challenge = await streakoid.challenges.create({
            name,
            description,
            icon,
            color,
            badgeId,
            levels,
        });

        expect(challenge._id).toEqual(expect.any(String));
        expect(challenge.name).toEqual(name);
        expect(challenge.description).toEqual(description);
        expect(challenge.icon).toEqual(icon);
        expect(challenge.color).toEqual(color);
        expect(challenge.members).toEqual([]);
        expect(challenge.levels.length).toEqual(1);
        const level = challenge.levels[0];
        expect(Object.keys(level).sort()).toEqual(['_id', 'level', 'criteria'].sort());
        expect(level.level).toEqual(0);
        expect(level.criteria).toEqual('criteria');
        expect(challenge.createdAt).toEqual(expect.any(String));
        expect(challenge.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(challenge).sort()).toEqual(
            [
                '_id',
                'name',
                'description',
                'icon',
                'color',
                'badgeId',
                'levels',
                'members',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });

    test(`creates a challenge with maximum paramaters`, async () => {
        expect.assertions(14);

        const name = 'Duolingo';
        const description = 'Everyday I must complete a duolingo lesson';
        const icon = 'duolingo';
        const color = 'blue';
        const levels = [{ level: 0, criteria: 'criteria' }];
        const numberOfMinutes = 30;

        const challenge = await streakoid.challenges.create({
            name,
            description,
            icon,
            color,
            badgeId,
            levels,
            numberOfMinutes,
        });

        expect(challenge._id).toEqual(expect.any(String));
        expect(challenge.name).toEqual(name);
        expect(challenge.description).toEqual(description);
        expect(challenge.icon).toEqual(icon);
        expect(challenge.color).toEqual(color);
        expect(challenge.members).toEqual([]);
        expect(challenge.levels.length).toEqual(1);
        expect(challenge.numberOfMinutes).toEqual(30);
        const level = challenge.levels[0];
        expect(Object.keys(level).sort()).toEqual(['_id', 'level', 'criteria'].sort());
        expect(level.level).toEqual(0);
        expect(level.criteria).toEqual('criteria');
        expect(challenge.createdAt).toEqual(expect.any(String));
        expect(challenge.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(challenge).sort()).toEqual(
            [
                '_id',
                'name',
                'description',
                'icon',
                'color',
                'badgeId',
                'levels',
                'numberOfMinutes',
                'members',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });
});
