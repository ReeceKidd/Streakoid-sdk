import { StreakoidFactory } from '../src/streakoid';
import { PastStreak } from '../src';
import { getUser, streakoidTest } from './setup/streakoidTest';

const streakName = 'Daily Italian';

jest.setTimeout(120000);

describe('GET /group-member-streaks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let teamStreakId: string;
    let groupMemberStreakId: string;
    let secondteamStreakId: string;
    let secondGroupMemberStreakId: string;
    let completedGroupMemberStreakTaskId: string;

    beforeAll(async () => {
        const user = await getUser();
        userId = user._id;
        streakoid = await streakoidTest();
        userId = user._id;
        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            members,
        });
        teamStreakId = teamStreak._id;

        const groupMemberStreak = await streakoid.groupMemberStreaks.create({
            userId,
            teamStreakId,
        });
        groupMemberStreakId = groupMemberStreak._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.teamStreaks.deleteOne(teamStreakId);
        await streakoid.teamStreaks.deleteOne(secondteamStreakId);
        await streakoid.groupMemberStreaks.deleteOne(groupMemberStreakId);
        await streakoid.groupMemberStreaks.deleteOne(secondGroupMemberStreakId);
        await streakoid.completeGroupMemberStreakTasks.deleteOne(completedGroupMemberStreakTaskId);
    });

    test(`request passes when group member streak is patched with correct keys`, async () => {
        expect.assertions(13);

        const timezone = 'Europe/Paris';
        const completedToday = false;
        const active = false;
        const currentStreak = {
            numberOfDaysInARow: 10,
            startDate: new Date().toString(),
        };
        const pastStreaks: PastStreak[] = [];

        const updatedGroupMemberStreak = await streakoid.groupMemberStreaks.update({
            groupMemberStreakId,
            updateData: {
                timezone,
                completedToday,
                active,
                currentStreak,
                pastStreaks,
            },
        });

        expect(updatedGroupMemberStreak._id).toEqual(expect.any(String));
        expect(updatedGroupMemberStreak.currentStreak.numberOfDaysInARow).toEqual(10);
        expect(updatedGroupMemberStreak.currentStreak.startDate).toEqual(expect.any(String));
        expect(Object.keys(updatedGroupMemberStreak.currentStreak).sort()).toEqual(
            ['startDate', 'numberOfDaysInARow'].sort(),
        );
        expect(updatedGroupMemberStreak.completedToday).toEqual(false);
        expect(updatedGroupMemberStreak.active).toEqual(false);
        expect(updatedGroupMemberStreak.pastStreaks).toEqual([]);
        expect(updatedGroupMemberStreak.userId).toEqual(expect.any(String));
        expect(updatedGroupMemberStreak.teamStreakId).toEqual(expect.any(String));
        expect(updatedGroupMemberStreak.timezone).toEqual(timezone);
        expect(updatedGroupMemberStreak.createdAt).toEqual(expect.any(String));
        expect(updatedGroupMemberStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(updatedGroupMemberStreak).sort()).toEqual(
            [
                '_id',
                'currentStreak',
                'completedToday',
                'active',
                'pastStreaks',
                'userId',
                'teamStreakId',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });
});
