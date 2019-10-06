import { streakoidFactory, streakoidClient } from './streakoid';

describe('SDK groupMembers', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('create', () => {
        test('calls POST with correct URL and  parmaters', async () => {
            expect.assertions(1);

            streakoidClient.post = jest.fn().mockResolvedValue(true);

            const friendId = 'friendId';
            const teamStreakId = 'teamStreakId';

            await streakoid.teamStreaks.groupMembers.create({
                friendId,
                teamStreakId,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/team-streaks/teamStreakId/members`, {
                friendId,
            });
        });
    });

    describe('deleteOne', () => {
        test('calls DELETE correct URL ', async () => {
            expect.assertions(1);
            streakoidClient.delete = jest.fn();

            await streakoid.teamStreaks.groupMembers.deleteOne({
                teamStreakId: 'teamStreakId',
                memberId: 'memberId',
            });

            expect(streakoidClient.delete).toBeCalledWith(`/v1/team-streaks/teamStreakId/members/memberId`);
        });
    });
});
