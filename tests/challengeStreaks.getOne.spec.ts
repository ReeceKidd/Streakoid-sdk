import { StreakoidFactory, londonTimezone } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import StreakStatus from '@streakoid/streakoid-models/lib/Types/StreakStatus';

jest.setTimeout(120000);

describe('GET /challenge-streaks/:challengeStreakId', () => {
    let streakoid: StreakoidFactory;

    beforeEach(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            streakoid = await streakoidTest();
        }
    });

    afterEach(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`challenge streak can be retrieved`, async () => {
        expect.assertions(15);

        const name = 'Duolingo';
        const description = 'Everyday I must complete a duolingo lesson';
        const icon = 'duolingo';
        const { challenge } = await streakoid.challenges.create({
            name,
            description,
            icon,
        });

        const user = await getPayingUser();
        const userId = user._id;
        const createdChallengeStreak = await streakoid.challengeStreaks.create({
            userId,
            challengeId: challenge._id,
        });
        const challengeStreakId = createdChallengeStreak._id;

        const challengeStreak = await streakoid.challengeStreaks.getOne({ challengeStreakId });

        expect(challengeStreak.status).toEqual(StreakStatus.live);
        expect(challengeStreak.userId).toEqual(String(user._id));
        expect(challengeStreak.userProfileImage).toEqual(user.profileImages.originalImageUrl);
        expect(challengeStreak.challengeId).toEqual(challenge._id);
        expect(challengeStreak.challengeName).toEqual(name);
        expect(challengeStreak.completedToday).toEqual(false);
        expect(challengeStreak.active).toEqual(false);
        expect(challengeStreak.pastStreaks).toEqual([]);
        expect(challengeStreak.timezone).toEqual(londonTimezone);
        expect(challengeStreak.currentStreak.numberOfDaysInARow).toEqual(0);
        expect(Object.keys(challengeStreak.currentStreak)).toEqual(['numberOfDaysInARow']);
        expect(challengeStreak._id).toEqual(expect.any(String));
        expect(challengeStreak.createdAt).toEqual(expect.any(String));
        expect(challengeStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(challengeStreak).sort()).toEqual(
            [
                '_id',
                'status',
                'currentStreak',
                'completedToday',
                'active',
                'pastStreaks',
                'userId',
                'userProfileImage',
                'challengeId',
                'challengeName',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });

    test(`sends challenge streak does not exist error when challenge streak doesn't exist`, async () => {
        expect.assertions(5);

        try {
            await getPayingUser();
            await streakoid.challengeStreaks.getOne({ challengeStreakId: '5d54487483233622e43270f9' });
        } catch (err) {
            const { data } = err.response;
            const { code, message, httpStatusCode } = data;
            expect(err.response.status).toEqual(400);
            expect(code).toEqual('400-76');
            expect(message).toEqual('Challenge streak does not exist.');
            expect(httpStatusCode).toEqual(400);
            expect(Object.keys(data).sort()).toEqual(['code', 'message', 'httpStatusCode'].sort());
        }
    });
});
