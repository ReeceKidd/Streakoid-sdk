import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { getPayingUser } from './setup/getPayingUser';

jest.setTimeout(120000);

describe('GET /streak-recommendations', () => {
    let streakoid: StreakoidFactory;
    const streakName = 'Daily Spanish';
    const streakDescription = 'Everyday I must do Spanish';
    const numberOfMinutes = 30;

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            await getPayingUser();
            streakoid = await streakoidTest();
            await streakoid.streakRecommendations.create({
                streakName,
                streakDescription,
            });
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`random streak recommendations can be retreived`, async () => {
        expect.assertions(7);

        const streakRecommendations = await streakoid.streakRecommendations.getAll({ random: true, limit: 5 });

        const streakRecommendation = streakRecommendations[0];

        expect(streakRecommendation._id).toEqual(expect.any(String));
        expect(streakRecommendation.streakName).toEqual(streakName);
        expect(streakRecommendation.streakDescription).toEqual(streakDescription);
        expect(streakRecommendation.numberOfMinutes).toEqual(numberOfMinutes);
        expect(streakRecommendation.createdAt).toEqual(expect.any(String));
        expect(streakRecommendation.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(streakRecommendation).sort()).toEqual(
            ['_id', 'streakName', 'numberOfMinutes', 'streakDescription', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`non random streak recommendations can be retreived`, async () => {
        expect.assertions(7);

        const streakRecommendations = await streakoid.streakRecommendations.getAll({ random: false, limit: 5 });

        const streakRecommendation = streakRecommendations[0];

        expect(streakRecommendation._id).toEqual(expect.any(String));
        expect(streakRecommendation.streakName).toEqual(streakName);
        expect(streakRecommendation.streakDescription).toEqual(streakDescription);
        expect(streakRecommendation.numberOfMinutes).toEqual(numberOfMinutes);
        expect(streakRecommendation.createdAt).toEqual(expect.any(String));
        expect(streakRecommendation.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(streakRecommendation).sort()).toEqual(
            ['_id', 'streakName', 'numberOfMinutes', 'streakDescription', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });
});
