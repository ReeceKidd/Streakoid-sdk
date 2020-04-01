import { streakoidFactory, streakoidClient } from './streakoid';

describe('SDK followers', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        test('calls GET with correct URL and userId', async () => {
            expect.assertions(1);
            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.users.followers.getAll('userId');

            expect(streakoidClient.get).toBeCalledWith(`/v1/users/userId/followers`);
        });
    });
});
