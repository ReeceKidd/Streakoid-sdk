import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { getPayingUser } from './setup/getPayingUser';
import ActivityTypes from '../src/ActivityTypes';

jest.setTimeout(120000);

describe('GET /activities', () => {
    let streakoid: StreakoidFactory;
    let userId: string;

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            streakoid = await streakoidTest();
            const user = await getPayingUser();
            userId = user._id;
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`gets a create solo streak activity using the userId query paramater`, async () => {
        expect.assertions(7);

        const streakName = 'Daily Spanish';
        const streakDescription = 'Everyday I must do 30 minutes of Spanish';

        // When a solo streak is created a createdSoloStreak activity is created.
        await streakoid.soloStreaks.create({
            userId,
            streakName,
            streakDescription,
        });

        const activities = await streakoid.activities.getAll({});
        const activity = activities[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.streakId).toEqual(expect.any(String));
        expect(activity.activityType).toEqual(ActivityTypes.createdSoloStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'streakId', 'activityType', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });
});
