import { StreakoidFactory } from '../src/streakoid';
import { getUser, streakoidTest } from './setup/streakoidTest';

jest.setTimeout(120000);

describe('DELETE /group-member-streaks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let teamStreakId: string;
    let teamMemberStreakId: string;

    const streakName = 'Daily Spanish';
    const streakDescription = 'Everyday I must do Spanish on Duolingo';

    beforeAll(async () => {
        const user = await getUser();
        userId = user._id;
        streakoid = await streakoidTest();
        userId = user._id;

        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            streakDescription,
            members,
        });
        teamStreakId = teamStreak._id;

        const teamMemberStreak = await streakoid.teamMemberStreaks.create({
            userId,
            teamStreakId: teamStreak._id,
        });

        teamMemberStreakId = teamMemberStreak._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.teamStreaks.deleteOne(teamStreakId);
    });

    test(`deletes teamMember streak`, async () => {
        expect.assertions(1);

        const response = await streakoid.teamMemberStreaks.deleteOne(teamMemberStreakId);
        expect(response.status).toEqual(204);
    });
});
