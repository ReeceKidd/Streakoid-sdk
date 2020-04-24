import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import StreakStatus from '@streakoid/streakoid-models/lib/Types/StreakStatus';
import {
    CustomStreakReminder,
    CustomChallengeStreakReminder,
} from '@streakoid/streakoid-models/lib/Models/StreakReminders';
import StreakReminderTypes from '@streakoid/streakoid-models/lib/Types/StreakReminderTypes';
import ActivityFeedItemTypes from '@streakoid/streakoid-models/lib/Types/ActivityFeedItemTypes';

jest.setTimeout(120000);

describe('PATCH /challenge-streaks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let username: string;
    let userProfileImage: string;
    let challengeStreakId: string;
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
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`that request passes when challenge streak is patched with correct keys`, async () => {
        expect.assertions(12);

        const { challenge } = await streakoid.challenges.create({
            name,
            description,
            icon,
        });
        const challengeStreak = await streakoid.challengeStreaks.create({
            userId,
            challengeId: challenge._id,
        });
        challengeStreakId = challengeStreak._id;

        const updatedTimezone = 'Europe/Paris';

        const updatedChallengeStreak = await streakoid.challengeStreaks.update({
            challengeStreakId,
            updateData: {
                timezone: updatedTimezone,
            },
        });

        expect(updatedChallengeStreak.status).toEqual(StreakStatus.live);
        expect(updatedChallengeStreak.userId).toBeDefined();
        expect(updatedChallengeStreak.completedToday).toEqual(false);
        expect(updatedChallengeStreak.active).toEqual(false);
        expect(updatedChallengeStreak.pastStreaks).toEqual([]);
        expect(updatedChallengeStreak.timezone).toEqual(updatedTimezone);
        expect(updatedChallengeStreak.currentStreak.numberOfDaysInARow).toEqual(0);
        expect(Object.keys(updatedChallengeStreak.currentStreak)).toEqual(['numberOfDaysInARow']);
        expect(updatedChallengeStreak._id).toEqual(expect.any(String));
        expect(updatedChallengeStreak.createdAt).toEqual(expect.any(String));
        expect(updatedChallengeStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(updatedChallengeStreak).sort()).toEqual(
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
    });

    test(`that when status is set to deleted the user is removed from the challenge and the number of members in the challenge is decreased by one`, async () => {
        expect.assertions(14);

        const { challenge } = await streakoid.challenges.create({
            name,
            description,
            icon,
        });
        const challengeStreak = await streakoid.challengeStreaks.create({
            userId,
            challengeId: challenge._id,
        });
        challengeStreakId = challengeStreak._id;

        const updatedChallengeStreak = await streakoid.challengeStreaks.update({
            challengeStreakId,
            updateData: {
                status: StreakStatus.deleted,
            },
        });

        expect(updatedChallengeStreak.status).toEqual(StreakStatus.deleted);
        expect(updatedChallengeStreak.userId).toBeDefined();
        expect(updatedChallengeStreak.completedToday).toEqual(false);
        expect(updatedChallengeStreak.active).toEqual(false);
        expect(updatedChallengeStreak.pastStreaks).toEqual([]);
        expect(updatedChallengeStreak.timezone).toEqual(expect.any(String));
        expect(updatedChallengeStreak.currentStreak.numberOfDaysInARow).toEqual(0);
        expect(Object.keys(updatedChallengeStreak.currentStreak)).toEqual(['numberOfDaysInARow']);
        expect(updatedChallengeStreak._id).toEqual(expect.any(String));
        expect(updatedChallengeStreak.createdAt).toEqual(expect.any(String));
        expect(updatedChallengeStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(updatedChallengeStreak).sort()).toEqual(
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

        const updatedChallenge = await streakoid.challenges.getOne({ challengeId: updatedChallengeStreak.challengeId });

        expect(updatedChallenge.members.length).toEqual(0);
        expect(updatedChallenge.numberOfMembers).toEqual(0);
    });

    test(`when challenge streak is archived if current user has a customReminder enabled it is disabled`, async () => {
        expect.assertions(2);

        const { challenge } = await streakoid.challenges.create({
            name,
            description,
            icon,
        });
        const challengeStreak = await streakoid.challengeStreaks.create({
            userId,
            challengeId: challenge._id,
        });
        challengeStreakId = challengeStreak._id;

        const customChallengeStreakReminder: CustomChallengeStreakReminder = {
            enabled: true,
            expoId: 'expoId',
            reminderHour: 21,
            reminderMinute: 0,
            challengeStreakId,
            streakReminderType: StreakReminderTypes.customChallengeStreakReminder,
            challengeId: challenge._id,
            challengeName: challenge.name,
        };

        const customStreakReminders: CustomStreakReminder[] = [customChallengeStreakReminder];

        await streakoid.user.pushNotifications.updatePushNotifications({ customStreakReminders });

        await streakoid.challengeStreaks.update({
            challengeStreakId,
            updateData: {
                status: StreakStatus.archived,
            },
        });

        const updatedUser = await streakoid.user.getCurrentUser();

        const updatedCustomChallengeStreakReminder = updatedUser.pushNotifications.customStreakReminders.find(
            reminder => reminder.streakReminderType === StreakReminderTypes.customChallengeStreakReminder,
        );

        if (
            updatedCustomChallengeStreakReminder &&
            updatedCustomChallengeStreakReminder.streakReminderType ===
                StreakReminderTypes.customChallengeStreakReminder
        ) {
            expect(updatedCustomChallengeStreakReminder.enabled).toEqual(false);
            expect(Object.keys(updatedCustomChallengeStreakReminder).sort()).toEqual(
                [
                    'enabled',
                    'expoId',
                    'reminderHour',
                    'reminderMinute',
                    'streakReminderType',
                    'challengeStreakId',
                    'challengeName',
                    'challengeId',
                ].sort(),
            );
        }
    });

    test(`when challenge streak status is archived an ArchivedChallengeStreakActivityFeedItem is created`, async () => {
        expect.assertions(7);
        const { challenge } = await streakoid.challenges.create({
            name,
            description,
            icon,
        });
        const challengeStreak = await streakoid.challengeStreaks.create({
            userId,
            challengeId: challenge._id,
        });
        challengeStreakId = challengeStreak._id;

        await streakoid.challengeStreaks.update({
            challengeStreakId,
            updateData: {
                status: StreakStatus.archived,
            },
        });

        const { activityFeedItems } = await streakoid.activityFeedItems.getAll({
            challengeStreakId: challengeStreak._id,
        });
        const activityFeedItem = activityFeedItems.find(
            item => item.activityFeedItemType === ActivityFeedItemTypes.archivedChallengeStreak,
        );
        if (
            activityFeedItem &&
            activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.archivedChallengeStreak
        ) {
            expect(activityFeedItem.challengeStreakId).toEqual(String(challengeStreak._id));
            expect(activityFeedItem.challengeId).toEqual(String(challenge._id));
            expect(activityFeedItem.challengeName).toEqual(String(challenge.name));
            expect(activityFeedItem.userId).toEqual(String(challengeStreak.userId));
            expect(activityFeedItem.username).toEqual(username);
            expect(activityFeedItem.userProfileImage).toEqual(userProfileImage);
            expect(Object.keys(activityFeedItem).sort()).toEqual(
                [
                    '_id',
                    'activityFeedItemType',
                    'userId',
                    'username',
                    'userProfileImage',
                    'challengeStreakId',
                    'challengeName',
                    'challengeId',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );
        }
    });

    test(`when challenge streak status is restored an RestoredChallengeStreakActivityFeedItem is created`, async () => {
        expect.assertions(7);
        const { challenge } = await streakoid.challenges.create({
            name,
            description,
            icon,
        });
        const challengeStreak = await streakoid.challengeStreaks.create({
            userId,
            challengeId: challenge._id,
        });
        challengeStreakId = challengeStreak._id;

        await streakoid.challengeStreaks.update({
            challengeStreakId,
            updateData: {
                status: StreakStatus.archived,
            },
        });

        await streakoid.challengeStreaks.update({
            challengeStreakId,
            updateData: {
                status: StreakStatus.live,
            },
        });

        const { activityFeedItems } = await streakoid.activityFeedItems.getAll({
            challengeStreakId: challengeStreak._id,
        });
        const activityFeedItem = activityFeedItems.find(
            item => item.activityFeedItemType === ActivityFeedItemTypes.restoredChallengeStreak,
        );
        if (
            activityFeedItem &&
            activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.restoredChallengeStreak
        ) {
            expect(activityFeedItem.challengeStreakId).toEqual(String(challengeStreak._id));
            expect(activityFeedItem.challengeId).toEqual(String(challenge._id));
            expect(activityFeedItem.challengeName).toEqual(String(challenge.name));
            expect(activityFeedItem.userId).toEqual(String(challengeStreak.userId));
            expect(activityFeedItem.username).toEqual(username);
            expect(activityFeedItem.userProfileImage).toEqual(String(userProfileImage));
            expect(Object.keys(activityFeedItem).sort()).toEqual(
                [
                    '_id',
                    'activityFeedItemType',
                    'userId',
                    'username',
                    'userProfileImage',
                    'challengeStreakId',
                    'challengeName',
                    'challengeId',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );
        }
    });

    test(`when challenge streak status is deleted an DeletedChallengeStreakActivityFeedItem is created`, async () => {
        expect.assertions(7);
        const { challenge } = await streakoid.challenges.create({
            name,
            description,
            icon,
        });
        const challengeStreak = await streakoid.challengeStreaks.create({
            userId,
            challengeId: challenge._id,
        });
        challengeStreakId = challengeStreak._id;

        await streakoid.challengeStreaks.update({
            challengeStreakId,
            updateData: {
                status: StreakStatus.archived,
            },
        });

        await streakoid.challengeStreaks.update({
            challengeStreakId,
            updateData: {
                status: StreakStatus.deleted,
            },
        });

        const { activityFeedItems } = await streakoid.activityFeedItems.getAll({
            challengeStreakId: challengeStreak._id,
        });
        const activityFeedItem = activityFeedItems.find(
            item => item.activityFeedItemType === ActivityFeedItemTypes.deletedChallengeStreak,
        );
        if (
            activityFeedItem &&
            activityFeedItem.activityFeedItemType === ActivityFeedItemTypes.deletedChallengeStreak
        ) {
            expect(activityFeedItem.challengeStreakId).toEqual(String(challengeStreak._id));
            expect(activityFeedItem.challengeId).toEqual(String(challenge._id));
            expect(activityFeedItem.challengeName).toEqual(String(challenge.name));
            expect(activityFeedItem.userId).toEqual(String(challengeStreak.userId));
            expect(activityFeedItem.username).toEqual(username);
            expect(activityFeedItem.userProfileImage).toEqual(userProfileImage);
            expect(Object.keys(activityFeedItem).sort()).toEqual(
                [
                    '_id',
                    'activityFeedItemType',
                    'userId',
                    'username',
                    'userProfileImage',
                    'challengeStreakId',
                    'challengeName',
                    'challengeId',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );
        }
    });
});
