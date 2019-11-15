import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';

jest.setTimeout(120000);

const streakName = 'Daily Spanish';
const streakDescription = 'I must do 30 minutes of Spanish everyday';
const numberOfMinutes = 30;

describe('POST /streak-recommendations', () => {
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

    test.only(`creates streak recommendation with a description and numberOfMinutes`, async () => {
        expect.assertions(7);

        const streakRecommendation = await streakoid.streakRecommendations.create({
            streakName,
            streakDescription,
            numberOfMinutes,
        });

        expect(streakRecommendation._id).toBeDefined();
        expect(streakRecommendation.streakName).toEqual(streakName);
        expect(streakRecommendation.streakDescription).toEqual(streakDescription);
        expect(streakRecommendation.numberOfMinutes).toEqual(numberOfMinutes);

        expect(streakRecommendation.createdAt).toBeDefined();
        expect(streakRecommendation.updatedAt).toBeDefined();
        expect(Object.keys(streakRecommendation).sort()).toEqual(
            ['streakName', 'streakDescription', 'numberOfMinutes', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`creates streak recommendation without a description or number of minutes`, async () => {
        expect.assertions(5);

        const streakRecomendation = await streakoid.streakRecommendations.create({
            streakName,
        });

        expect(streakRecomendation._id).toBeDefined();
        expect(streakRecomendation.streakName).toEqual(streakName);
        expect(numberOfMinutes).toEqual(undefined);
        expect(streakDescription).toEqual('');
        expect(Object.keys(streakRecomendation).sort()).toEqual(['streakName', 'createdAt', 'updatedAt', '__v'].sort());
    });
});
