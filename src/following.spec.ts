import { streakoidFactory, streakoidClient } from './streakoid';

describe('SDK following', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        test('calls GET with correct URL and userId', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.users.following.getAll('userId');

            expect(streakoidClient.get).toBeCalledWith(`/v1/users/userId/following`);
        });
    });

    describe('followUser', () => {
        test('calls POST with correct URL and  parmaters', async () => {
            expect.assertions(1);
            streakoidClient.post = jest.fn().mockResolvedValue(true);

            const userId = 'userId';
            const userToFollowId = 'userToUnfollowId';

            await streakoid.users.following.followUser({ userId, userToFollowId });

            expect(streakoidClient.post).toBeCalledWith(`/v1/users/userId/following`, {
                userToFollowId,
            });
        });
    });

    describe('unfollowUser', () => {
        test('calls PATCH with correct URL ', async () => {
            expect.assertions(1);
            streakoidClient.patch = jest.fn().mockResolvedValue(true);

            await streakoid.users.following.unfollowUser({ userId: 'userId', userToUnfollowId: 'userToUnfollowId' });

            expect(streakoidClient.patch).toBeCalledWith(`/v1/users/userId/following/userToUnfollowId`);
        });
    });
});
