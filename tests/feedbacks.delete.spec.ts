import { streakoid } from '../src/streakoid';

const email = 'delete-feedback-user@gmail.com';
const username = 'delete-feedback-user';

jest.setTimeout(120000);

describe('DELETE /feedbacks/:feedbackId', () => {
    let registeredUserId: string;

    beforeAll(async () => {
        const user = await streakoid.users.create({
            email,
            username,
        });
        registeredUserId = user._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(registeredUserId);
    });

    test(`deletes feedback`, async () => {
        expect.assertions(1);

        const feedbackPageUrl = '/solo-streaks';
        const feedbackUsername = 'username';
        const feedbackUserEmail = 'userEmail';
        const feedbackText = 'feedback';

        const feedback = await streakoid.feedbacks.create({
            userId: registeredUserId,
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
