import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { getPayingUser } from './setup/getPayingUser';

jest.setTimeout(120000);

describe('GET /challenges/:challengeId', () => {
    let streakoid: StreakoidFactory;
    let challengeId: string;
    const name = 'Duolingo';
    const description = 'Everyday I must complete a duolingo lesson';
    const icon = 'duolingo';

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            streakoid = await streakoidTest();
            await getPayingUser();
            const name = 'Duolingo';
            const description = 'Everyday I must complete a duolingo lesson';
            const { challenge } = await streakoid.challenges.create({
                name,
                description,
                icon,
            });
            challengeId = challenge._id;
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`gets a challenge using challengeId`, async () => {
        expect.assertions(15);

        const challenge = await streakoid.challenges.getOne({ challengeId });

        expect(challenge._id).toEqual(expect.any(String));
        expect(challenge.name).toEqual(name);
        expect(challenge.description).toEqual(description);
        expect(challenge.icon).toEqual(icon);
        expect(challenge.members).toEqual([]);
        expect(challenge.numberOfMembers).toEqual(0);
        expect(challenge.createdAt).toEqual(expect.any(String));
        expect(challenge.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(challenge).sort()).toEqual(
            [
                '_id',
                'name',
                'description',
                'icon',
                'color',
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
