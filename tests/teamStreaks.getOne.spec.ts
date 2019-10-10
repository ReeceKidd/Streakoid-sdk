import { streakoid, londonTimezone } from '../src/streakoid';
import StreakStatus from '../src/StreakStatus';

const email = 'get--one-team-streak@gmail.com';
const username = 'get-one-team-streak-user';

const streakName = 'Daily Meditation';
const streakDescription = 'Each day I must meditate at ';

jest.setTimeout(120000);

describe('GET /team-streaks/:teamStreakId', () => {
    let userId: string;
    let teamStreakId: string;

    beforeAll(async () => {
        const user = await streakoid.users.create({
            username,
            email,
        });
        userId = user._id;

        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            streakDescription,
            members,
        });
        teamStreakId = teamStreak._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.teamStreaks.deleteOne(teamStreakId);
    });

    test(`team streak can be retreived with populated member information`, async () => {
        expect.assertions(14);

        const teamStreak = await streakoid.teamStreaks.getOne(teamStreakId);

        expect(teamStreak.members.length).toEqual(1);
        const member = teamStreak.members[0];
        expect(member._id).toBeDefined();
        expect(member.username).toEqual(username);
        expect(Object.keys(member).sort()).toEqual(['_id', 'username', 'groupMemberStreak'].sort());

        const { groupMemberStreak } = member;
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

        expect(teamStreak.streakName).toEqual(streakName);
        expect(teamStreak.status).toEqual(StreakStatus.live);
        expect(teamStreak.streakDescription).toEqual(streakDescription);
        expect(teamStreak.creatorId).toEqual(userId);
        expect(teamStreak.timezone).toEqual(londonTimezone);
        expect(Object.keys(teamStreak).sort()).toEqual(
            [
                '_id',
                'status',
                'members',
                'creatorId',
                'streakName',
                'streakDescription',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
                'creator',
            ].sort(),
        );

        const { creator } = teamStreak;
        expect(creator._id).toBeDefined();
        expect(creator.username).toEqual(username);
        expect(Object.keys(creator).sort()).toEqual(['_id', 'username'].sort());
    });

    test(`sends team streak does not exist error when solo streak doesn't exist`, async () => {
        expect.assertions(5);

        try {
            await streakoid.teamStreaks.getOne('5d54487483233622e43270f9');
        } catch (err) {
            const { data } = err.response;
            const { code, message, httpStatusCode } = data;
            expect(err.response.status).toEqual(400);
            expect(code).toEqual('400-25');
            expect(message).toEqual('Team streak does not exist.');
            expect(httpStatusCode).toEqual(400);
            expect(Object.keys(data).sort()).toEqual(['code', 'message', 'httpStatusCode'].sort());
        }
    });
});
