import { StreakoidFactory } from '../src/streakoid';
import { getUser, streakoidTest } from './setup/streakoidTest';

jest.setTimeout(120000);

describe('POST /feedbacks', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let feedbackId: string;

    beforeAll(async () => {
        const user = await getUser();
        userId = user._id;
        streakoid = await streakoidTest();
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.feedbacks.deleteOne(feedbackId);
    });

    test(`creates feedback`, async () => {
        expect.assertions(7);

        const feedbackPageUrl = '/solo-streaks';
        const feedbackUsername = 'feedbackusername';
        const feedbackUserEmail = 'userEmail';
        const feedback = 'feedback';

        const feedbackDocument = await streakoid.feedbacks.create({
            userId,
            pageUrl: feedbackPageUrl,
            username: feedbackUsername,
            userEmail: feedbackUserEmail,
            feedbackText: feedback,
        });

        const { _id, pageUrl, username, userEmail, feedbackText } = feedbackDocument;

        feedbackId = feedbackDocument._id;
        expect(_id).toEqual(expect.any(String));
        expect(feedbackDocument.userId).toEqual(userId);
        expect(pageUrl).toEqual(feedbackPageUrl);
        expect(username).toEqual(feedbackUsername);
        expect(userEmail).toEqual(feedbackUserEmail);
        expect(feedback).toEqual(feedbackText);
        expect(Object.keys(feedbackDocument).sort()).toEqual(
            [
                '_id',
                'userId',
                'pageUrl',
                'username',
                'userEmail',
                'feedbackText',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });
});
