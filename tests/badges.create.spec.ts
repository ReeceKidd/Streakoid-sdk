import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { StreakoidFactory } from '../src/streakoid';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { BadgeTypes } from '../src';

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
        expect.assertions(8);

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

        expect(badge._id).toEqual(expect.any(String));
        expect(badge.name).toEqual(name);
        expect(badge.description).toEqual(description);
        expect(badge.icon).toEqual(icon);
        expect(badge.badgeType).toEqual(BadgeTypes.challenge);
        expect(badge.createdAt).toEqual(expect.any(String));
        expect(badge.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(badge).sort()).toEqual(
            ['_id', 'name', 'description', 'badgeType', 'icon', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });
});
