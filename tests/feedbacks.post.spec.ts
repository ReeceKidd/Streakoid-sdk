import { streakoid } from "../src/streakoid";

const email = "create-feedback-user@gmail.com";
const username = "create-feedback-user";

jest.setTimeout(120000);

describe("POST /feedbacks", () => {
    let registeredUserId: string;
    let feedbackId: string;

    beforeAll(async () => {
        const registrationResponse = await streakoid.users.create(
            {
                username,
                email
            }
        );
        registeredUserId = registrationResponse._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(registeredUserId);
        await streakoid.feedbacks.deleteOne(feedbackId);
    });

    test(`creates feedback`, async () => {
        expect.assertions(7);

        const feedbackPageUrl = "/solo-streaks";
        const feedbackUsername = "username";
        const feedbackUserEmail = "userEmail";
        const feedback = "feedback";

        const feedbackDocument = await streakoid.feedbacks.create({
            userId: registeredUserId,
            pageUrl: feedbackPageUrl,
            username: feedbackUsername,
            userEmail: feedbackUserEmail,
            feedbackText: feedback,
        }
        );

        const {
            _id,
            userId,
            pageUrl,
            username,
            userEmail,
            feedbackText
        } = feedbackDocument

        feedbackId = feedbackDocument.id;
        expect(_id).toEqual(expect.any(String))
        expect(userId).toEqual(registeredUserId);
        expect(pageUrl).toEqual(feedbackPageUrl);
        expect(username).toEqual(feedbackUsername);
        expect(userEmail).toEqual(feedbackUserEmail);
        expect(feedback).toEqual(feedbackText);
        expect(Object.keys(feedbackDocument).sort()).toEqual([
            "_id",
            "userId",
            "pageUrl",
            "username",
            "userEmail",
            "feedbackText",
            "createdAt",
            "updatedAt",
            "__v"
        ].sort());

    });
});
