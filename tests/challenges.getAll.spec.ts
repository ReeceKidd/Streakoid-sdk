import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { getPayingUser } from './setup/getPayingUser';

jest.setTimeout(120000);

describe('GET /challenges', () => {
    let streakoid: StreakoidFactory;
    const name = 'Duolingo';
    const description = 'Everyday I must complete a duolingo lesson';
    const icon = 'duolingo';
    const color = 'blue';

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            streakoid = await streakoidTest();
            await getPayingUser();
            await streakoid.challenges.create({
                name,
                description,
                icon,
                color,
            });
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`gets a challenge using the name query paramater`, async () => {
        expect.assertions(9);

        const challenges = await streakoid.challenges.getAll({ name });
        const challenge = challenges[0];

        expect(challenge._id).toEqual(expect.any(String));
        expect(challenge.name).toEqual(name);
        expect(challenge.description).toEqual(description);
        expect(challenge.icon).toEqual(icon);
        expect(challenge.color).toEqual(color);
        expect(challenge.members).toEqual([]);
        expect(challenge.createdAt).toEqual(expect.any(String));
        expect(challenge.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(challenge).sort()).toEqual(
            ['_id', 'name', 'description', 'icon', 'color', 'members', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`gets a challenge without the query paramater`, async () => {
        expect.assertions(9);

        const challenges = await streakoid.challenges.getAll({ name });
        const challenge = challenges[0];

        expect(challenge._id).toEqual(expect.any(String));
        expect(challenge.name).toEqual(name);
        expect(challenge.description).toEqual(description);
        expect(challenge.icon).toEqual(icon);
        expect(challenge.color).toEqual(color);
        expect(challenge.members).toEqual([]);
        expect(challenge.createdAt).toEqual(expect.any(String));
        expect(challenge.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(challenge).sort()).toEqual(
            ['_id', 'name', 'description', 'icon', 'color', 'members', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });
});