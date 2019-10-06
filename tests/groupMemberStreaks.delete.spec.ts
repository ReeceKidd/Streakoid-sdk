import { streakoid } from '../src/streakoid';

const email = 'delete-groupMember-streak-user@gmail.com';
const username = 'delete-groupMember-streak-user';

jest.setTimeout(120000);

describe('DELETE /group-member-streaks', () => {
    let userId: string;
    let teamStreakId: string;
    let groupMemberStreakId: string;

    const streakName = 'Daily Spanish';
    const streakDescription = 'Everyday I must do Spanish on Duolingo';

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

        const groupMemberStreak = await streakoid.groupMemberStreaks.create({
            userId,
            teamStreakId: teamStreak._id,
        });

        groupMemberStreakId = groupMemberStreak._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.teamStreaks.deleteOne(teamStreakId);
    });

    test(`deletes groupMember streak`, async () => {
        expect.assertions(1);

        const response = await streakoid.groupMemberStreaks.deleteOne(groupMemberStreakId);
        expect(response.status).toEqual(204);
    });
});
