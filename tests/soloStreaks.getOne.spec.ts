import { streakoid, londonTimezone } from '../src/streakoid';
import StreakStatus from '../src/StreakStatus';

const email = 'get-one-solo-streak@gmail.com';
const username = 'get-one-solo-streak-user';

const streakName = '10 minutes journaling';
const streakDescription = 'Each day I must do 10 minutes journaling';

jest.setTimeout(120000);

describe('GET /solo-streaks/:soloStreakId', () => {
    let userId: string;

    let soloStreakId: string;

    beforeAll(async () => {
        const registrationResponse = await streakoid.users.create({
            username,
            email,
        });
        userId = registrationResponse._id;

        const createSoloStreakResponse = await streakoid.soloStreaks.create({
            userId,
            streakName,
            streakDescription,
        });
        soloStreakId = createSoloStreakResponse._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);

        await streakoid.soloStreaks.deleteOne(soloStreakId);
    });

    test(`solo streak can be retreived`, async () => {
        expect.assertions(15);

        const soloStreak = await streakoid.soloStreaks.getOne(soloStreakId);

        expect(soloStreak.streakName).toEqual(streakName);
        expect(soloStreak.status).toEqual(StreakStatus.live);
        expect(soloStreak.streakDescription).toEqual(streakDescription);
        expect(soloStreak.userId).toEqual(userId);
        expect(soloStreak.completedToday).toEqual(false);
        expect(soloStreak.active).toEqual(false);
        expect(soloStreak.activity).toEqual([]);
        expect(soloStreak.pastStreaks).toEqual([]);
        expect(soloStreak.timezone).toEqual(londonTimezone);
        expect(soloStreak.currentStreak.numberOfDaysInARow).toEqual(0);
        expect(Object.keys(soloStreak.currentStreak)).toEqual(['numberOfDaysInARow']);
        expect(soloStreak._id).toEqual(expect.any(String));
        expect(soloStreak.createdAt).toEqual(expect.any(String));
        expect(soloStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(soloStreak).sort()).toEqual(
            [
                '_id',
                'status',
                'currentStreak',
                'completedToday',
                'active',
                'activity',
                'pastStreaks',
                'streakName',
                'streakDescription',
                'userId',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });

    test(`sends solo streak does not exist error when solo streak doesn't exist`, async () => {
        expect.assertions(5);

        try {
            await streakoid.soloStreaks.getOne('5d54487483233622e43270f9');
        } catch (err) {
            const { data } = err.response;
            const { code, message, httpStatusCode } = data;
            expect(err.response.status).toEqual(400);
            expect(code).toEqual('400-07');
            expect(message).toEqual('Solo streak does not exist.');
            expect(httpStatusCode).toEqual(400);
            expect(Object.keys(data).sort()).toEqual(['code', 'message', 'httpStatusCode'].sort());
        }
    });
});
