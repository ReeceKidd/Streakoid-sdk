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

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            streakoid = await streakoidTest();
            const user = await getPayingUser();
            userId = user._id;
            const friend = await getFriend();
            friendId = friend._id;
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`gets a ${ActivityFeedItemTypes.createdSoloStreak} activity`, async () => {
        expect.assertions(8);

        const streakName = 'Daily Spanish';
        const streakDescription = 'Everyday I must do 30 minutes of Spanish';

        // When a solo streak is created a createdSoloStreak activity is created.
        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName,
            streakDescription,
        });

        const { activityFeedItems, totalCountOfActivityFeedItems } = await streakoid.activityFeedItems.getAll({
            userIds: [userId],
            subjectId: soloStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.createdSoloStreak,
            limit: 10,
            skip: 0,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.subjectId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.createdSoloStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'subjectId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );

        expect(totalCountOfActivityFeedItems).toEqual(expect.any(Number));
    });

    test(`gets a ${ActivityFeedItemTypes.completedSoloStreak} activity`, async () => {
        expect.assertions(8);

        const streakName = 'Daily Spanish';
        const streakDescription = 'Everyday I must do 30 minutes of Spanish';

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName,
            streakDescription,
        });

        await streakoid.completeSoloStreakTasks.create({ userId, soloStreakId: soloStreak._id });

        const { activityFeedItems, totalCountOfActivityFeedItems } = await streakoid.activityFeedItems.getAll({
            userIds: [userId, 'friendId'],
            subjectId: soloStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.completedSoloStreak,
            limit: 10,
            skip: 0,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.subjectId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.completedSoloStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'subjectId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );

        expect(totalCountOfActivityFeedItems).toEqual(expect.any(Number));
    });

    test(`gets a ${ActivityFeedItemTypes.incompletedSoloStreak} activity`, async () => {
        expect.assertions(8);

        const streakName = 'Daily Spanish';
        const streakDescription = 'Everyday I must do 30 minutes of Spanish';

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName,
            streakDescription,
        });

        await streakoid.completeSoloStreakTasks.create({ userId, soloStreakId: soloStreak._id });

        await streakoid.incompleteSoloStreakTasks.create({ userId, soloStreakId: soloStreak._id });

        const { activityFeedItems, totalCountOfActivityFeedItems } = await streakoid.activityFeedItems.getAll({
            userIds: [userId],
            subjectId: soloStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.incompletedSoloStreak,
            limit: 10,
            skip: 0,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.subjectId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.incompletedSoloStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'subjectId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );

        expect(totalCountOfActivityFeedItems).toEqual(expect.any(Number));
    });

    test(`gets a ${ActivityFeedItemTypes.archivedSoloStreak} activity`, async () => {
        expect.assertions(8);

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName: 'Daily Spanish',
            streakDescription: 'Everyday I must study Spanish',
        });

        await streakoid.soloStreaks.update({
            soloStreakId: soloStreak._id,
            updateData: { status: StreakStatus.archived },
        });

        const { activityFeedItems, totalCountOfActivityFeedItems } = await streakoid.activityFeedItems.getAll({
            userIds: [userId],
            subjectId: soloStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.archivedSoloStreak,
            limit: 10,
            skip: 0,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.subjectId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.archivedSoloStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'subjectId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );

        expect(totalCountOfActivityFeedItems).toEqual(expect.any(Number));
    });

    test(`gets a ${ActivityFeedItemTypes.deletedSoloStreak} activity`, async () => {
        expect.assertions(8);

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName: 'Daily Spanish',
            streakDescription: 'Everyday I must study Spanish',
        });

        await streakoid.soloStreaks.update({
            soloStreakId: soloStreak._id,
            updateData: { status: StreakStatus.deleted },
        });

        const { activityFeedItems, totalCountOfActivityFeedItems } = await streakoid.activityFeedItems.getAll({
            userIds: [userId],
            subjectId: soloStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.deletedSoloStreak,
            limit: 10,
            skip: 0,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.subjectId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.deletedSoloStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'subjectId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );

        expect(totalCountOfActivityFeedItems).toEqual(expect.any(Number));
    });

    test(`gets a ${ActivityFeedItemTypes.restoredSoloStreak} activity`, async () => {
        expect.assertions(8);

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName: 'Daily Spanish',
            streakDescription: 'Everyday I must study Spanish',
        });

        await streakoid.soloStreaks.update({
            soloStreakId: soloStreak._id,
            updateData: { status: StreakStatus.live },
        });

        const { activityFeedItems, totalCountOfActivityFeedItems } = await streakoid.activityFeedItems.getAll({
            userIds: [userId],
            subjectId: soloStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.restoredSoloStreak,
            limit: 10,
            skip: 0,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.subjectId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.restoredSoloStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'subjectId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );

        expect(totalCountOfActivityFeedItems).toEqual(expect.any(Number));
    });

    test(`gets a ${ActivityFeedItemTypes.editedSoloStreakName} activity`, async () => {
        expect.assertions(8);

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName: 'Daily Spanish',
            streakDescription: 'Everyday I must study Spanish',
        });

        await streakoid.soloStreaks.update({
            soloStreakId: soloStreak._id,
            updateData: { streakName: 'New name' },
        });

        const { activityFeedItems, totalCountOfActivityFeedItems } = await streakoid.activityFeedItems.getAll({
            userIds: [userId],
            subjectId: soloStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.editedSoloStreakName,
            limit: 10,
            skip: 0,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.subjectId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.editedSoloStreakName);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'subjectId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );

        expect(totalCountOfActivityFeedItems).toEqual(expect.any(Number));
    });

    test(`gets a ${ActivityFeedItemTypes.editedSoloStreakDescription} activity`, async () => {
        expect.assertions(8);

        const soloStreak = await streakoid.soloStreaks.create({
            userId,
            streakName: 'Daily Spanish',
            streakDescription: 'Everyday I must study Spanish',
        });

        await streakoid.soloStreaks.update({
            soloStreakId: soloStreak._id,
            updateData: { streakDescription: 'New description' },
        });

        const { activityFeedItems, totalCountOfActivityFeedItems } = await streakoid.activityFeedItems.getAll({
            userIds: [userId],
            subjectId: soloStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.editedSoloStreakDescription,
            limit: 10,
            skip: 0,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.subjectId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.editedSoloStreakDescription);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'subjectId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );

        expect(totalCountOfActivityFeedItems).toEqual(expect.any(Number));
    });

    test(`gets a ${ActivityFeedItemTypes.createdTeamStreak} activity`, async () => {
        expect.assertions(8);

        const streakName = 'Daily Spanish';

        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            members,
        });

        const { activityFeedItems, totalCountOfActivityFeedItems } = await streakoid.activityFeedItems.getAll({
            userIds: [userId],
            subjectId: teamStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.createdTeamStreak,
            limit: 10,
            skip: 0,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.subjectId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.createdTeamStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'subjectId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );

        expect(totalCountOfActivityFeedItems).toEqual(expect.any(Number));
    });

    test(`gets a ${ActivityFeedItemTypes.joinedTeamStreak} activity`, async () => {
        expect.assertions(8);

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

        const { activityFeedItems, totalCountOfActivityFeedItems } = await streakoid.activityFeedItems.getAll({
            userIds: [userId],
            subjectId: teamStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.joinedTeamStreak,
            limit: 10,
            skip: 0,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.subjectId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.joinedTeamStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'subjectId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );

        expect(totalCountOfActivityFeedItems).toEqual(expect.any(Number));
    });

    test(`gets a ${ActivityFeedItemTypes.completedTeamMemberStreak} activity`, async () => {
        expect.assertions(8);

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

        const { activityFeedItems, totalCountOfActivityFeedItems } = await streakoid.activityFeedItems.getAll({
            userIds: [userId],
            subjectId: teamStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.completedTeamMemberStreak,
            limit: 10,
            skip: 0,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.subjectId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.completedTeamMemberStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'subjectId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );

        expect(totalCountOfActivityFeedItems).toEqual(expect.any(Number));
    });

    test(`gets a ${ActivityFeedItemTypes.incompletedTeamMemberStreak} activity`, async () => {
        expect.assertions(8);

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

        const { activityFeedItems, totalCountOfActivityFeedItems } = await streakoid.activityFeedItems.getAll({
            userIds: [userId],
            subjectId: teamStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.incompletedTeamMemberStreak,
            limit: 10,
            skip: 0,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.subjectId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.incompletedTeamMemberStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'subjectId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );

        expect(totalCountOfActivityFeedItems).toEqual(expect.any(Number));
    });

    test(`gets a ${ActivityFeedItemTypes.archivedTeamStreak} activity`, async () => {
        expect.assertions(8);

        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName: 'Daily Spanish',
            members,
        });

        await streakoid.teamStreaks.update({
            teamStreakId: teamStreak._id,
            updateData: { status: StreakStatus.archived },
        });

        const { activityFeedItems, totalCountOfActivityFeedItems } = await streakoid.activityFeedItems.getAll({
            userIds: [userId],
            subjectId: teamStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.archivedTeamStreak,
            limit: 10,
            skip: 0,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.subjectId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.archivedTeamStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'subjectId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );

        expect(totalCountOfActivityFeedItems).toEqual(expect.any(Number));
    });

    test(`gets a ${ActivityFeedItemTypes.restoredTeamStreak} activity`, async () => {
        expect.assertions(8);

        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName: 'Daily Spanish',
            members,
        });

        await streakoid.teamStreaks.update({
            teamStreakId: teamStreak._id,
            updateData: { status: StreakStatus.live },
        });

        const { activityFeedItems, totalCountOfActivityFeedItems } = await streakoid.activityFeedItems.getAll({
            userIds: [userId],
            subjectId: teamStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.restoredTeamStreak,
            limit: 10,
            skip: 0,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.subjectId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.restoredTeamStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'subjectId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );

        expect(totalCountOfActivityFeedItems).toEqual(expect.any(Number));
    });

    test(`gets a ${ActivityFeedItemTypes.deletedTeamStreak} activity`, async () => {
        expect.assertions(8);

        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName: 'Daily Spanish',
            members,
        });

        await streakoid.teamStreaks.update({
            teamStreakId: teamStreak._id,
            updateData: { status: StreakStatus.deleted },
        });

        const { activityFeedItems, totalCountOfActivityFeedItems } = await streakoid.activityFeedItems.getAll({
            userIds: [userId],
            subjectId: teamStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.deletedTeamStreak,
            limit: 10,
            skip: 0,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.subjectId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.deletedTeamStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'subjectId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );

        expect(totalCountOfActivityFeedItems).toEqual(expect.any(Number));
    });

    test(`gets a ${ActivityFeedItemTypes.editedTeamStreakName} activity`, async () => {
        expect.assertions(8);

        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName: 'Daily Spanish',
            members,
        });

        await streakoid.teamStreaks.update({
            teamStreakId: teamStreak._id,
            updateData: { streakName: 'New name' },
        });

        const { activityFeedItems, totalCountOfActivityFeedItems } = await streakoid.activityFeedItems.getAll({
            userIds: [userId],
            subjectId: teamStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.editedTeamStreakName,
            limit: 10,
            skip: 0,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.subjectId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.editedTeamStreakName);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'subjectId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );

        expect(totalCountOfActivityFeedItems).toEqual(expect.any(Number));
    });

    test(`gets a ${ActivityFeedItemTypes.editedTeamStreakDescription} activity`, async () => {
        expect.assertions(8);

        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName: 'Daily Spanish',
            members,
        });

        await streakoid.teamStreaks.update({
            teamStreakId: teamStreak._id,
            updateData: { streakDescription: 'New description' },
        });

        const { activityFeedItems, totalCountOfActivityFeedItems } = await streakoid.activityFeedItems.getAll({
            userIds: [userId],
            subjectId: teamStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.editedTeamStreakDescription,
            limit: 10,
            skip: 0,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.subjectId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.editedTeamStreakDescription);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'subjectId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );

        expect(totalCountOfActivityFeedItems).toEqual(expect.any(Number));
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

        const { activityFeedItems, totalCountOfActivityFeedItems } = await streakoid.activityFeedItems.getAll({
            userIds: [userId],
            subjectId: challengeStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.joinedChallenge,
            limit: 10,
            skip: 0,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.subjectId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.joinedChallenge);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'subjectId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );

        expect(totalCountOfActivityFeedItems).toEqual(expect.any(Number));
    });

    test(`gets a ${ActivityFeedItemTypes.completedChallengeStreak} activity`, async () => {
        expect.assertions(8);

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

        const { activityFeedItems, totalCountOfActivityFeedItems } = await streakoid.activityFeedItems.getAll({
            userIds: [userId],
            subjectId: challengeStreakId,
            activityFeedItemType: ActivityFeedItemTypes.completedChallengeStreak,
            limit: 10,
            skip: 0,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.subjectId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.completedChallengeStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'subjectId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );

        expect(totalCountOfActivityFeedItems).toEqual(expect.any(Number));
    });

    test(`gets a ${ActivityFeedItemTypes.incompletedChallengeStreak} activity`, async () => {
        expect.assertions(8);

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

        const { activityFeedItems, totalCountOfActivityFeedItems } = await streakoid.activityFeedItems.getAll({
            userIds: [userId],
            subjectId: challengeStreakId,
            activityFeedItemType: ActivityFeedItemTypes.incompletedChallengeStreak,
            limit: 10,
            skip: 0,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.subjectId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.incompletedChallengeStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'subjectId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );

        expect(totalCountOfActivityFeedItems).toEqual(expect.any(Number));
    });

    test(`gets a ${ActivityFeedItemTypes.archivedChallengeStreak} activity`, async () => {
        expect.assertions(8);

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

        const { activityFeedItems, totalCountOfActivityFeedItems } = await streakoid.activityFeedItems.getAll({
            userIds: [userId],
            subjectId: challengeStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.archivedChallengeStreak,
            limit: 10,
            skip: 0,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.subjectId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.archivedChallengeStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'subjectId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );

        expect(totalCountOfActivityFeedItems).toEqual(expect.any(Number));
    });

    test(`gets a ${ActivityFeedItemTypes.restoredChallengeStreak} activity`, async () => {
        expect.assertions(8);

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

        const { activityFeedItems, totalCountOfActivityFeedItems } = await streakoid.activityFeedItems.getAll({
            userIds: [userId],
            subjectId: challengeStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.restoredChallengeStreak,
            limit: 10,
            skip: 0,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.subjectId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.restoredChallengeStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'subjectId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );

        expect(totalCountOfActivityFeedItems).toEqual(expect.any(Number));
    });

    test(`gets a ${ActivityFeedItemTypes.deletedChallengeStreak} activity`, async () => {
        expect.assertions(8);

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
            updateData: { status: StreakStatus.deleted },
        });

        const { activityFeedItems, totalCountOfActivityFeedItems } = await streakoid.activityFeedItems.getAll({
            userIds: [userId],
            subjectId: challengeStreak._id,
            activityFeedItemType: ActivityFeedItemTypes.deletedChallengeStreak,
            limit: 10,
            skip: 0,
        });
        const activity = activityFeedItems[0];

        expect(activity._id).toEqual(expect.any(String));
        expect(activity.userId).toEqual(expect.any(String));
        expect(activity.subjectId).toEqual(expect.any(String));
        expect(activity.activityFeedItemType).toEqual(ActivityFeedItemTypes.deletedChallengeStreak);
        expect(activity.createdAt).toEqual(expect.any(String));
        expect(activity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(activity).sort()).toEqual(
            ['_id', 'userId', 'subjectId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );

        expect(totalCountOfActivityFeedItems).toEqual(expect.any(Number));
    });

    test('if one of two team members has not completed their task the new team streak does not get completed for the day', async () => {
        expect.assertions(15);

        const members = [{ memberId: userId }, { memberId: friendId }];

        const teamStreakWithTwoMembers = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName: 'Daily Spanish',
            members,
        });

        let teamMemberStreaks = await streakoid.teamMemberStreaks.getAll({
            userId,
            teamStreakId: teamStreakWithTwoMembers._id,
        });
        const userTeamMemberStreak = teamMemberStreaks[0];
        const userTeamMemberStreakId = userTeamMemberStreak._id;

        teamMemberStreaks = await streakoid.teamMemberStreaks.getAll({
            userId: friendId,
            teamStreakId: teamStreakWithTwoMembers._id,
        });

        const friendTeamMemberStreak = teamMemberStreaks[0];
        const friendTeamMemberStreakId = friendTeamMemberStreak._id;

        await streakoid.completeTeamMemberStreakTasks.create({
            userId,
            teamStreakId: teamStreakWithTwoMembers._id,
            teamMemberStreakId: userTeamMemberStreakId,
        });

        await streakoid.completeTeamMemberStreakTasks.create({
            userId: friendId,
            teamStreakId: teamStreakWithTwoMembers._id,
            teamMemberStreakId: friendTeamMemberStreakId,
        });

        const { activityFeedItems, totalCountOfActivityFeedItems } = await streakoid.activityFeedItems.getAll({
            userIds: [userId, friendId],
            subjectId: teamStreakWithTwoMembers._id,
            limit: 10,
            skip: 0,
        });

        const userActivity = activityFeedItems.find(item => item.userId == userId);
        const friendActivity = activityFeedItems.find(item => item.userId == friendId);

        if (!userActivity || !friendActivity) {
            throw new Error('User activity or friendActivity is not defined');
        }

        expect(userActivity._id).toEqual(expect.any(String));
        expect(userActivity.userId).toEqual(expect.any(String));
        expect(userActivity.subjectId).toEqual(expect.any(String));
        expect(userActivity.activityFeedItemType).toEqual(expect.any(String));
        expect(userActivity.createdAt).toEqual(expect.any(String));
        expect(userActivity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(userActivity).sort()).toEqual(
            ['_id', 'userId', 'subjectId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );

        expect(friendActivity._id).toEqual(expect.any(String));
        expect(friendActivity.userId).toEqual(expect.any(String));
        expect(friendActivity.subjectId).toEqual(expect.any(String));
        expect(friendActivity.activityFeedItemType).toEqual(expect.any(String));
        expect(friendActivity.createdAt).toEqual(expect.any(String));
        expect(friendActivity.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(userActivity).sort()).toEqual(
            ['_id', 'userId', 'subjectId', 'activityFeedItemType', 'createdAt', 'updatedAt', '__v'].sort(),
        );

        expect(totalCountOfActivityFeedItems).toEqual(expect.any(Number));
    });
});
