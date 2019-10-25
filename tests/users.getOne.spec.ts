import { StreakoidFactory, londonTimezone } from '../src/streakoid';
import { streakoidTest, getUser } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { connectToDatabase } from './setup/connectToDatabase';
import { disconnectFromDatabase } from './setup/disconnectFromDatabase';
import UserTypes from '../src/userTypes';
import { username } from './setup/environment';

jest.setTimeout(120000);

describe('GET /users/:userId', () => {
    let streakoid: StreakoidFactory;
    let userId: string;

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await connectToDatabase();
            const user = await getUser();
            userId = user._id;
            streakoid = await streakoidTest();
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await disconnectFromDatabase();
        }
    });

    test(`retreives user`, async () => {
        expect.assertions(13);

        const user = await streakoid.users.getOne(userId);

        expect(Object.keys(user.stripe).sort()).toEqual(['customer', 'subscription'].sort());
        expect(user.stripe.subscription).toEqual(null);
        expect(user.stripe.customer).toEqual(null);
        expect(user.userType).toEqual(UserTypes.basic);
        expect(user.friends).toEqual([]);
        expect(user._id).toEqual(expect.any(String));
        expect(user.username).toEqual(username);
        expect(user.email).toBeUndefined();
        expect(user.timezone).toEqual(londonTimezone);
        expect(user.profileImages).toEqual({
            originalImageUrl: 'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
        });
        expect(user.createdAt).toEqual(expect.any(String));
        expect(user.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(user).sort()).toEqual(
            [
                'stripe',
                'userType',
                'friends',
                '_id',
                'username',
                'timezone',
                'profileImages',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });

    test(`sends string must be 24 characters long error when userId is not valid`, async () => {
        expect.assertions(2);

        try {
            await streakoid.users.getOne('notLongEnough');
        } catch (err) {
            expect(err.response.status).toBe(422);
            expect(err.response.data.message).toEqual(
                'child "userId" fails because ["userId" length must be 24 characters long]',
            );
        }
    });
});
