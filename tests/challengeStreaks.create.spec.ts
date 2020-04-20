import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { StreakStatus, ActivityFeedItemTypes } from '../src';

jest.setTimeout(120000);

describe('POST /challenge-streaks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let username: string;
    let userProfileImage: string;
    let challengeId: string;
    const name = 'Duolingo';
    const description = 'Everyday I must complete a duolingo lesson';
    const icon = 'duolingo';

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            const user = await getPayingUser();
            userId = user._id;
            username = user.username;
            userProfileImage = user.profileImages.originalImageUrl;
            streakoid = await streakoidTest();
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

    test(`creates challenge streak, adds user to challenge members.`, async () => {
        expect.assertions(30);

        const challengeStreak = await streakoid.challengeStreaks.create({
            userId,
            challengeId,
        });

        expect(challengeStreak._id).toBeDefined();
        expect(challengeStreak.status).toEqual(StreakStatus.live);
        expect(challengeStreak.userId).toBeDefined();
        expect(challengeStreak.challengeId).toBeDefined();
        expect(Object.keys(challengeStreak.currentStreak)).toEqual(['numberOfDaysInARow']);
        expect(challengeStreak.currentStreak.numberOfDaysInARow).toEqual(0);
        expect(challengeStreak.completedToday).toEqual(false);
        expect(challengeStreak.active).toEqual(false);
        expect(challengeStreak.pastStreaks).toEqual([]);
        expect(challengeStreak.createdAt).toBeDefined();
        expect(challengeStreak.updatedAt).toBeDefined();
        expect(Object.keys(challengeStreak).sort()).toEqual(
            [
                'currentStreak',
                'status',
                'completedToday',
                'active',
                'pastStreaks',
                '_id',
                'userId',
                'challengeId',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );

        const updatedChallenge = await streakoid.challenges.getOne({ challengeId });

        expect(updatedChallenge._id).toEqual(expect.any(String));
        expect(updatedChallenge.name).toEqual(name);
        expect(updatedChallenge.description).toEqual(description);
        expect(updatedChallenge.icon).toEqual(icon);
        expect(updatedChallenge.members.length).toEqual(1);
        const challengeMember = updatedChallenge.members[0];
        expect(Object.keys(challengeMember).sort()).toEqual(['profileImage', 'userId', 'username'].sort());
        expect(updatedChallenge.numberOfMembers).toEqual(1);
        expect(updatedChallenge.createdAt).toEqual(expect.any(String));
        expect(updatedChallenge.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(updatedChallenge).sort()).toEqual(
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

    test('when user joins a challenge a JoinedChallengeActivityItem is created', async () => {
        expect.assertions(7);

        const name = 'Duolingo';
        const description = 'Everyday I must complete a duolingo lesson';
        const icon = 'duolingo';
        const { challenge } = await streakoid.challenges.create({ name, description, icon });
        const challengeId = challenge._id;

        const challengeStreak = await streakoid.challengeStreaks.create({
            userId,
            challengeId,
        });

        const { activityFeedItems } = await streakoid.activityFeedItems.getAll({
            activityFeedItemType: ActivityFeedItemTypes.joinedChallenge,
        });
        const completedChallengeStrekActivityFeedItem = activityFeedItems.find(
            item => item.activityFeedItemType === ActivityFeedItemTypes.joinedChallenge,
        );
        if (
            completedChallengeStrekActivityFeedItem &&
            completedChallengeStrekActivityFeedItem.activityFeedItemType === ActivityFeedItemTypes.joinedChallenge
        ) {
            expect(completedChallengeStrekActivityFeedItem.challengeStreakId).toEqual(String(challengeStreak._id));
            expect(completedChallengeStrekActivityFeedItem.challengeId).toEqual(String(challenge._id));
            expect(completedChallengeStrekActivityFeedItem.challengeName).toEqual(String(challenge.name));
            expect(completedChallengeStrekActivityFeedItem.userId).toEqual(String(userId));
            expect(completedChallengeStrekActivityFeedItem.username).toEqual(username);
            expect(completedChallengeStrekActivityFeedItem.userProfileImage).toEqual(userProfileImage);
            expect(Object.keys(completedChallengeStrekActivityFeedItem).sort()).toEqual(
                [
                    '_id',
                    'activityFeedItemType',
                    'userId',
                    'username',
                    'userProfileImage',
                    'challengeStreakId',
                    'challengeId',
                    'challengeName',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );
        }
    });
});
