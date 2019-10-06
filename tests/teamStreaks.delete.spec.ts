import { streakoid } from '../src/streakoid';

const email = 'delete-team-streak-user@gmail.com';
const username = 'delete-team-streak-user';

jest.setTimeout(120000);

describe(`DELETE /team-streaks`, () => {
    let userId: string;
    let teamStreakId: string;

    const name = 'Reading';
    const description = 'I will read 30 minutes every day';

    beforeAll(async () => {
        const user = await streakoid.users.create({
            email,
            username,
        });
        userId = user._id;
        const creatorId = userId;
        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId,
            streakName: name,
            streakDescription: description,
            members,
        });
        teamStreakId = teamStreak._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
    });

    test(`that team streak can be deleted`, async () => {
        expect.assertions(1);

        const response = await streakoid.teamStreaks.deleteOne(teamStreakId);

        expect(response.status).toEqual(204);
    });
});
