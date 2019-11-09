import { streakoidFactory, streakoidClient } from './streakoid';
jest.genMockFromModule('./streakoid');

describe('SDK users', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getCurrentUser', () => {
        test('calls GET with correct URL', async () => {
            expect.assertions(1);

            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.user.getCurrentUser();

            expect(streakoidClient.get).toBeCalledWith(`/v1/user`);
        });
    });
});
