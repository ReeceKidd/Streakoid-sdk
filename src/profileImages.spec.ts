import { streakoidFactory, streakoidClient } from './streakoid';

describe('SDK dailyJobs', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('create', () => {
        test('calls POST with correct URL and  parmaters', async () => {
            expect.assertions(1);

            streakoidClient.post = jest.fn().mockResolvedValue(true);

            const image = 'image';

            await streakoid.profileImages.create({
                image,
            });

            expect(streakoidClient.post).toBeCalledWith(`/v1/profile-images`, {
                image,
            });
        });
    });
});
