import { londonTimezone, StreakoidFactory } from '../src/streakoid';
import { getUser, streakoidTest } from './setup/streakoidTest';

const streakName = '10 minutes journaling';

jest.setTimeout(120000);

describe('GET /group-member-streaks/:groupMemberStreakId', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let teamStreakId: string;
    let groupMemberStreakId: string;

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
        await streakoid.groupMemberStreaks.deleteOne(groupMemberStreakId);
    });

    test(`team member streak can be retreived`, async () => {
        expect.assertions(12);

        const groupMemberStreak = await streakoid.groupMemberStreaks.getOne(groupMemberStreakId);

        expect(groupMemberStreak._id).toEqual(expect.any(String));
        expect(groupMemberStreak.currentStreak.numberOfDaysInARow).toEqual(0);
        expect(Object.keys(groupMemberStreak.currentStreak).sort()).toEqual(['numberOfDaysInARow'].sort());
        expect(groupMemberStreak.completedToday).toEqual(false);
        expect(groupMemberStreak.active).toEqual(false);
        expect(groupMemberStreak.pastStreaks).toEqual([]);
        expect(groupMemberStreak.userId).toEqual(expect.any(String));
        expect(groupMemberStreak.teamStreakId).toEqual(teamStreakId);
        expect(groupMemberStreak.timezone).toEqual(londonTimezone);
        expect(groupMemberStreak.createdAt).toEqual(expect.any(String));
        expect(groupMemberStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(groupMemberStreak).sort()).toEqual(
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

    test(`sends team member streak does not exist error when team member streak doesn't exist`, async () => {
        expect.assertions(5);

        try {
            await streakoid.groupMemberStreaks.getOne('5d54487483233622e43270f9');
        } catch (err) {
            const { data } = err.response;
            const { code, message, httpStatusCode } = data;
            expect(err.response.status).toEqual(400);
            expect(code).toEqual('400-34');
            expect(message).toEqual('Group member streak does not exist.');
            expect(httpStatusCode).toEqual(400);
            expect(Object.keys(data).sort()).toEqual(['code', 'message', 'httpStatusCode'].sort());
        }
    });
});
