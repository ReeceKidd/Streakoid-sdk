import { streakoidFactory, streakoidClient } from './streakoid';

describe('SDK teamMembers', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('create', () => {
        test('calls POST with correct URL and  parmaters', async () => {
            expect.assertions(1);

            streakoidClient.post = jest.fn().mockResolvedValue(true);

            const followerId = 'followerId';
            const teamStreakId = 'teamStreakId';

            await streakoid.teamStreaks.teamMembers.create({
                followerId,
                teamStreakId,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/team-streaks/teamStreakId/members`, {
                followerId,
            });
        });
    });

    describe('deleteOne', () => {
        test('calls DELETE correct URL ', async () => {
            expect.assertions(1);
            streakoidClient.delete = jest.fn();

            await streakoid.teamStreaks.teamMembers.deleteOne({
                teamStreakId: 'teamStreakId',
                memberId: 'memberId',
            });

            expect(streakoidClient.delete).toBeCalledWith(`/v1/team-streaks/teamStreakId/members/memberId`);
        });
    });
});
