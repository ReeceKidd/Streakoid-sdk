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

    test(`creates a challenge with a badge with minimum paramaters`, async () => {
        expect.assertions(22);

        const name = 'Duolingo';
        const description = 'Everyday I must complete a duolingo lesson';
        const icon = 'duolingo';
        const color = 'blue';
        const levels = [{ level: 0, criteria: 'criteria' }];

        const { challenge, badge } = await streakoid.challenges.create({
            name,
            description,
            icon,
            color,
            levels,
        });

        expect(challenge._id).toEqual(expect.any(String));
        expect(challenge.name).toEqual(name);
        expect(challenge.description).toEqual(description);
        expect(challenge.icon).toEqual(icon);
        expect(challenge.color).toEqual(color);
        expect(challenge.members).toEqual([]);
        expect(challenge.numberOfMembers).toEqual(0);
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
                'numberOfMembers',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );

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

    test(`creates a challenge and badge with maximum paramaters`, async () => {
        expect.assertions(25);

        const name = 'Duolingo';
        const description = 'Everyday I must complete a duolingo lesson';
        const icon = 'duolingo';
        const color = 'blue';
        const levels = [{ level: 0, criteria: 'criteria' }];
        const numberOfMinutes = 30;
        const whatsappGroupLink = 'whatsapp.com/chat';
        const discordGroupLink = ' discordGroupLink';

        const { challenge, badge } = await streakoid.challenges.create({
            name,
            description,
            icon,
            color,
            levels,
            numberOfMinutes,
            whatsappGroupLink,
            discordGroupLink,
        });

        expect(challenge._id).toEqual(expect.any(String));
        expect(challenge.name).toEqual(name);
        expect(challenge.description).toEqual(description);
        expect(challenge.icon).toEqual(icon);
        expect(challenge.color).toEqual(color);
        expect(challenge.members).toEqual([]);
        expect(challenge.numberOfMembers).toEqual(0);
        expect(challenge.levels.length).toEqual(1);
        expect(challenge.numberOfMinutes).toEqual(30);
        expect(challenge.whatsappGroupLink).toEqual(whatsappGroupLink);
        expect(challenge.discordGroupLink).toEqual(discordGroupLink);
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
                'whatsappGroupLink',
                'discordGroupLink',
                'members',
                'numberOfMembers',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );

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
