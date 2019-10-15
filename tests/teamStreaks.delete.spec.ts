import { streakoidTest, getUser } from './setup/streakoidTest';
import { StreakoidFactory } from '../src/streakoid';

jest.setTimeout(120000);

describe(`DELETE /team-streaks`, () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let teamStreakId: string;

    const name = 'Reading';
    const description = 'I will read 30 minutes every day';

    beforeAll(async () => {
        const user = await getUser();
        userId = user._id;
        streakoid = await streakoidTest();
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
