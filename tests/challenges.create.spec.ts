import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { StreakoidFactory } from '../src/streakoid';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';

jest.setTimeout(120000);

describe('POST /challenges', () => {
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

    test(`creates a challenge with with minimum paramaters`, async () => {
        expect.assertions(22);

        const name = 'Duolingo';
        const description = 'Everyday I must complete a duolingo lesson';
        const icon = 'duolingo';

        const { challenge } = await streakoid.challenges.create({
            name,
            description,
            icon,
        });

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

    test(`creates a challenge with maximum paramaters`, async () => {
        expect.assertions(25);

        const name = 'Duolingo';
        const description = 'Everyday I must complete a duolingo lesson';
        const icon = 'duolingo';
        const numberOfMinutes = 30;
        const whatsappGroupLink = 'whatsapp.com/chat';
        const discordGroupLink = ' discordGroupLink';

        const { challenge } = await streakoid.challenges.create({
            name,
            description,
            icon,
            numberOfMinutes,
            whatsappGroupLink,
            discordGroupLink,
        });

        expect(challenge._id).toEqual(expect.any(String));
        expect(challenge.name).toEqual(name);
        expect(challenge.description).toEqual(description);
        expect(challenge.icon).toEqual(icon);
        expect(challenge.members).toEqual([]);
        expect(challenge.numberOfMembers).toEqual(0);
        expect(challenge.numberOfMinutes).toEqual(30);
        expect(challenge.whatsappGroupLink).toEqual(whatsappGroupLink);
        expect(challenge.discordGroupLink).toEqual(discordGroupLink);
        expect(challenge.createdAt).toEqual(expect.any(String));
        expect(challenge.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(challenge).sort()).toEqual(
            [
                '_id',
                'name',
                'description',
                'icon',
                'numberOfMinutes',
                'whatsappGroupLink',
                'discordGroupLink',
                'members',
                'numberOfMembers',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });
});
