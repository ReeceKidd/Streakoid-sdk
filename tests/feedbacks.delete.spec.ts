import { getUser, streakoidTest } from './setup/streakoidTest';
import { StreakoidFactory } from '../src/streakoid';

jest.setTimeout(120000);

describe('DELETE /feedbacks/:feedbackId', () => {
    let streakoid: StreakoidFactory;
    let userId: string;

    beforeAll(async () => {
        const user = await getUser();
        userId = user._id;
        streakoid = await streakoidTest();
        userId = user._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
    });

    test(`deletes feedback`, async () => {
        expect.assertions(1);

        const feedbackPageUrl = '/solo-streaks';
        const feedbackUsername = 'username';
        const feedbackUserEmail = 'userEmail';
        const feedbackText = 'feedback';

        const feedback = await streakoid.feedbacks.create({
            userId,
            pageUrl: feedbackPageUrl,
            username: feedbackUsername,
            userEmail: feedbackUserEmail,
            feedbackText,
        });

        const { _id } = feedback;

        const response = await streakoid.feedbacks.deleteOne(_id);
        expect(response.status).toEqual(204);
    });
});
