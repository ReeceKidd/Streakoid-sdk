import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import { getPayingUser } from './setup/getPayingUser';
import { getFriend } from './setup/getFriend';
import ActivityFeedItemTypes from '../src/ActivityFeedItemTypes';
import { StreakStatus } from '../src';

jest.setTimeout(120000);

// Tests should be in the order of the ActivityFeedItemTypes enum.

describe('GET /activityFeedItems', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let friendId: string;

    beforeEach(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            streakoid = await streakoidTest();
            const user = await getPayingUser();
            userId = user._id;
            const friend = await getFriend();
            friendId = friend._id;
        }
    });

    afterEach(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`gets a ${ActivityFeedItemTypes.createdSoloStreak} activity`, async () => {
        expect.assertions(7);

        const streakName = 'Daily Spanish';
        const streakDescription = 'Everyday I must do 30 minutes of Spanish';

        // When a solo streak is created a createdSoloStreak activity is created.
        await streakoid.soloStreaks.create({
            userId,
            streakName,
            streakDescription,
        });

        const activityFeedItems = await streakoid.activityFeedItems.getAll({
            userId,
            activityFeedItemType: ActivityFeedItemTypes.createdSoloStreak,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.streakId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.createdSoloStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'streakId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`gets a ${ActivityFeedItemTypes.completedSoloStreak} activity`, async () => {
        expect.assertions(7);

        const streakName = 'Daily Spanish';
        const streakDescription = 'Everyday I must do 30 minutes of Spanish';

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName,
            streakDescription,
        });

        await streakoid.completeSoloStreakTasks.create({ userId, soloStreakId: soloStreak._id });

        const activityFeedItems = await streakoid.activityFeedItems.getAll({
            userId,
            streakId: soloStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.completedSoloStreak,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.streakId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.completedSoloStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'streakId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`gets a ${ActivityFeedItemTypes.incompletedSoloStreak} activity`, async () => {
        expect.assertions(7);

        const streakName = 'Daily Spanish';
        const streakDescription = 'Everyday I must do 30 minutes of Spanish';

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName,
            streakDescription,
        });

        await streakoid.completeSoloStreakTasks.create({ userId, soloStreakId: soloStreak._id });

        await streakoid.incompleteSoloStreakTasks.create({ userId, soloStreakId: soloStreak._id });

        const activityFeedItems = await streakoid.activityFeedItems.getAll({
            userId,
            streakId: soloStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.incompletedSoloStreak,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.streakId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.incompletedSoloStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'streakId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`gets a ${ActivityFeedItemTypes.createdTeamStreak} activity`, async () => {
        expect.assertions(7);

        const streakName = 'Daily Spanish';

        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            members,
        });

        const activityFeedItems = await streakoid.activityFeedItems.getAll({
            userId,
            streakId: teamStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.createdTeamStreak,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.streakId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.createdTeamStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'streakId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`gets a ${ActivityFeedItemTypes.joinedTeamStreak} activity`, async () => {
        expect.assertions(7);

        const streakName = 'Daily Spanish';

        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            members,
        });

        await streakoid.teamStreaks.teamMembers.create({
            friendId,
            teamStreakId: teamStreak._id,
        });

        const activityFeedItems = await streakoid.activityFeedItems.getAll({
            userId,
            streakId: teamStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.joinedTeamStreak,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.streakId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.joinedTeamStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'streakId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`gets a ${ActivityFeedItemTypes.completedTeamMemberStreak} activity`, async () => {
        expect.assertions(7);

        const creatorId = userId;
        const members = [{ memberId: userId }];
        const teamStreak = await streakoid.teamStreaks.create({ creatorId, streakName: 'Daily Spanish', members });
        const teamStreakId = teamStreak._id;

        const teamMemberStreaks = await streakoid.teamMemberStreaks.getAll({
            userId,
            teamStreakId,
        });
        const teamMemberStreak = teamMemberStreaks[0];
        const teamMemberStreakId = teamMemberStreak._id;

        await streakoid.completeTeamMemberStreakTasks.create({ userId, teamMemberStreakId, teamStreakId });

        const activityFeedItems = await streakoid.activityFeedItems.getAll({
            userId,
            streakId: teamStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.completedTeamMemberStreak,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.streakId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.completedTeamMemberStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'streakId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`gets a ${ActivityFeedItemTypes.incompletedTeamMemberStreak} activity`, async () => {
        expect.assertions(7);

        const creatorId = userId;
        const members = [{ memberId: userId }];
        const teamStreak = await streakoid.teamStreaks.create({ creatorId, streakName: 'Daily Spanish', members });
        const teamStreakId = teamStreak._id;

        const teamMemberStreaks = await streakoid.teamMemberStreaks.getAll({
            userId,
            teamStreakId,
        });
        const teamMemberStreak = teamMemberStreaks[0];
        const teamMemberStreakId = teamMemberStreak._id;

        await streakoid.completeTeamMemberStreakTasks.create({ userId, teamMemberStreakId, teamStreakId });

        await streakoid.incompleteTeamMemberStreakTasks.create({ userId, teamMemberStreakId, teamStreakId });

        const activityFeedItems = await streakoid.activityFeedItems.getAll({
            userId,
            streakId: teamStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.incompletedTeamMemberStreak,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.streakId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.incompletedTeamMemberStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'streakId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`gets a ${ActivityFeedItemTypes.joinedChallenge} activity`, async () => {
        expect.assertions(8);

        const name = 'Duolingo';
        const color = 'blue';
        const levels = [{ level: 0, criteria: 'criteria' }];
        const description = 'Everyday I must complete a duolingo lesson';
        const icon = 'duolingo';
        const { challenge } = await streakoid.challenges.create({
            name,
            description,
            icon,
            color,
            levels,
        });
        const challengeStreak = await streakoid.challengeStreaks.create({
            userId,
            challengeId: challenge._id,
        });

        const activityFeedItems = await streakoid.activityFeedItems.getAll({
            userId,
            streakId: challengeStreak._id,
            challengeId: challenge._id,
            activityFeedItemType: ActivityFeedItemTypes.joinedChallenge,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.streakId).toEqual(expect.any(String));
        expect(activity.challengeId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.joinedChallenge);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            [
                '_id',
                'userId',
                'streakId',
                'challengeId',
                'activityFeedItemType',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });

    test(`gets a ${ActivityFeedItemTypes.archivedSoloStreak} activity`, async () => {
        expect.assertions(7);

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName: 'Daily Spanish',
            streakDescription: 'Everyday I must study Spanish',
        });

        await streakoid.soloStreaks.update({
            soloStreakId: soloStreak._id,
            updateData: { status: StreakStatus.archived },
        });

        const activityFeedItems = await streakoid.activityFeedItems.getAll({
            userId,
            streakId: soloStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.archivedSoloStreak,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.streakId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.archivedSoloStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'streakId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`gets a ${ActivityFeedItemTypes.deletedSoloStreak} activity`, async () => {
        expect.assertions(7);

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName: 'Daily Spanish',
            streakDescription: 'Everyday I must study Spanish',
        });

        await streakoid.soloStreaks.update({
            soloStreakId: soloStreak._id,
            updateData: { status: StreakStatus.deleted },
        });

        const activityFeedItems = await streakoid.activityFeedItems.getAll({
            userId,
            streakId: soloStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.deletedSoloStreak,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.streakId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.deletedSoloStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'streakId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`gets a ${ActivityFeedItemTypes.restoredSoloStreak} activity`, async () => {
        expect.assertions(7);

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName: 'Daily Spanish',
            streakDescription: 'Everyday I must study Spanish',
        });

        await streakoid.soloStreaks.update({
            soloStreakId: soloStreak._id,
            updateData: { status: StreakStatus.live },
        });

        const activityFeedItems = await streakoid.activityFeedItems.getAll({
            userId,
            streakId: soloStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.restoredSoloStreak,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.streakId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.restoredSoloStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'streakId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`gets a ${ActivityFeedItemTypes.completedChallengeStreak} activity`, async () => {
        expect.assertions(7);

        const color = 'blue';
        const levels = [{ level: 0, criteria: 'criteria' }];
        const name = 'Duolingo';
        const description = 'Everyday I must complete a duolingo lesson';
        const icon = 'duolingo';
        const { challenge } = await streakoid.challenges.create({ name, description, icon, color, levels });
        const challengeId = challenge._id;
        const challengeStreak = await streakoid.challengeStreaks.create({ userId, challengeId });
        const challengeStreakId = challengeStreak._id;

        await streakoid.completeChallengeStreakTasks.create({
            userId,
            challengeStreakId,
        });

        const activityFeedItems = await streakoid.activityFeedItems.getAll({
            userId,
            streakId: challengeStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.completedChallengeStreak,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.streakId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.completedChallengeStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'streakId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`gets a ${ActivityFeedItemTypes.incompletedChallengeStreak} activity`, async () => {
        expect.assertions(7);

        const color = 'blue';
        const levels = [{ level: 0, criteria: 'criteria' }];
        const name = 'Duolingo';
        const description = 'Everyday I must complete a duolingo lesson';
        const icon = 'duolingo';
        const { challenge } = await streakoid.challenges.create({ name, description, icon, color, levels });
        const challengeId = challenge._id;
        const challengeStreak = await streakoid.challengeStreaks.create({ userId, challengeId });
        const challengeStreakId = challengeStreak._id;

        await streakoid.completeChallengeStreakTasks.create({
            userId,
            challengeStreakId,
        });

        await streakoid.incompleteChallengeStreakTasks.create({
            userId,
            challengeStreakId,
        });

        const activityFeedItems = await streakoid.activityFeedItems.getAll({
            userId,
            streakId: challengeStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.incompletedChallengeStreak,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.streakId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.incompletedChallengeStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'streakId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`gets a ${ActivityFeedItemTypes.archivedChallengeStreak} activity`, async () => {
        expect.assertions(7);

        const color = 'blue';
        const levels = [{ level: 0, criteria: 'criteria' }];
        const name = 'Duolingo';
        const description = 'Everyday I must complete a duolingo lesson';
        const icon = 'duolingo';
        const { challenge } = await streakoid.challenges.create({ name, description, icon, color, levels });
        const challengeId = challenge._id;
        const challengeStreak = await streakoid.challengeStreaks.create({ userId, challengeId });
        const challengeStreakId = challengeStreak._id;

        await streakoid.challengeStreaks.update({
            challengeStreakId,
            updateData: { status: StreakStatus.archived },
        });

        const activityFeedItems = await streakoid.activityFeedItems.getAll({
            userId,
            streakId: challengeStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.archivedChallengeStreak,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.streakId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.archivedChallengeStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'streakId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test.only(`gets a ${ActivityFeedItemTypes.restoredChallengeStreak} activity`, async () => {
        expect.assertions(7);

        try {
            const color = 'blue';
            const levels = [{ level: 0, criteria: 'criteria' }];
            const name = 'Duolingo';
            const description = 'Everyday I must complete a duolingo lesson';
            const icon = 'duolingo';
            const { challenge } = await streakoid.challenges.create({ name, description, icon, color, levels });
            const challengeId = challenge._id;
            const challengeStreak = await streakoid.challengeStreaks.create({ userId, challengeId });
            const challengeStreakId = challengeStreak._id;

            await streakoid.challengeStreaks.update({
                challengeStreakId,
                updateData: { status: StreakStatus.live },
            });

            const activityFeedItems = await streakoid.activityFeedItems.getAll({
                userId,
                streakId: challengeStreak._id,
                activityFeedItemType: ActivityFeedItemTypes.restoredChallengeStreak,
            });
            const activity = activityFeedItems[0];

            expect(activity._id).toEqual(expect.any(String));
            expect(activity.userId).toEqual(expect.any(String));
            expect(activity.streakId).toEqual(expect.any(String));
            expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.restoredChallengeStreak);
            expect(activity.createdAt).toEqual(expect.any(String));
            expect(activity.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(activity).sort()).toEqual(
                ['_id', 'userId', 'streakId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
            );
        } catch (err) {
            console.log(err);
        }
    });
});
