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

    beforeEach(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            streakoid = await streakoidTest();
            await getPayingUser();
        }
    });

    afterEach(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`gets a challenge using the exact name query paramater`, async () => {
        expect.assertions(10);

        await streakoid.challenges.create({
            name,
            description,
            icon,
        });

        const challenges = await streakoid.challenges.getAll({ searchQuery: name });
        const challenge = challenges[0];

        expect(challenge._id).toEqual(expect.any(String));
        expect(challenge.databaseName).toEqual(name.toLowerCase());
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
                'databaseName',
                'description',
                'icon',
                'members',
                'numberOfMembers',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });

    test(`gets a challenge using a partial challenge name query paramater`, async () => {
        expect.assertions(10);

        await streakoid.challenges.create({
            name,
            description,
            icon,
        });

        const challenges = await streakoid.challenges.getAll({ searchQuery: 'duo' });
        const challenge = challenges[0];

        expect(challenge._id).toEqual(expect.any(String));
        expect(challenge.name).toEqual(name);
        expect(challenge.databaseName).toEqual(name.toLowerCase());
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
                'databaseName',
                'description',
                'icon',
                'members',
                'numberOfMembers',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });

    test(`gets a challenge without the query paramater`, async () => {
        expect.assertions(10);

        await streakoid.challenges.create({
            name,
            description,
            icon,
        });

        const challenges = await streakoid.challenges.getAll({});
        const challenge = challenges[0];

        expect(challenge._id).toEqual(expect.any(String));
        expect(challenge.name).toEqual(name);
        expect(challenge.databaseName).toEqual(name.toLowerCase());
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
                'databaseName',
                'description',
                'icon',
                'members',
                'numberOfMembers',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });

    test(`gets one challenge when two exist`, async () => {
        expect.assertions(11);

        await streakoid.challenges.create({
            name,
            description,
            icon,
        });

        await streakoid.challenges.create({
            name: 'Second challenge',
            description,
            icon,
        });

        const challenges = await streakoid.challenges.getAll({ limit: 1 });
        expect(challenges.length).toEqual(1);
        const challenge = challenges[0];

        expect(challenge._id).toEqual(expect.any(String));
        expect(challenge.name).toEqual(name);
        expect(challenge.databaseName).toEqual(name.toLowerCase());
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
                'databaseName',
                'description',
                'icon',
                'members',
                'numberOfMembers',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });
});
