import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { getPayingUser } from './setup/getPayingUser';
import { BadgeTypes } from '../src';

jest.setTimeout(120000);

describe('GET /badges/:badgeId', () => {
    let streakoid: StreakoidFactory;
    let badgeId: string;
    const name = 'Duolingo';
    const description = 'Everyday I must complete a duolingo lesson';
    const badgeType = BadgeTypes.challenge;
    const icon = 'duolingo';

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            streakoid = await streakoidTest();
            await getPayingUser();
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

    test(`gets a badge using badgeId`, async () => {
        expect.assertions(8);

        const badge = await streakoid.badges.getOne({ badgeId });

        expect(badge._id).toEqual(expect.any(String));
        expect(badge.name).toEqual(name);
        expect(badge.description).toEqual(description);
        expect(badge.icon).toEqual(icon);
        expect(badge.badgeType).toEqual(BadgeTypes.challenge);
        expect(badge.createdAt).toEqual(expect.any(String));
        expect(badge.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(badge).sort()).toEqual(
            ['_id', 'name', 'description', 'icon', 'badgeType', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });
});
