import { StreakoidFactory } from '../src/streakoid';
import { getUser, streakoidTest, username } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { connectToDatabase } from './setup/connectToDatabase';
import { disconnectFromDatabase } from './setup/disconnectFromDatabase';
import UserTypes from '../src/userTypes';

jest.setTimeout(120000);

describe('GET /complete-solo-streak-tasks', () => {
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

    test(`that request passes when updatedUser is patched with correct keys`, async () => {
        expect.assertions(12);

        const updatedTimezone = 'Europe/Paris';

        const updatedUser = await streakoid.users.update({
            userId,
            updateData: {
                timezone: updatedTimezone,
            },
        });

        expect(Object.keys(updatedUser.stripe)).toEqual(['customer', 'subscription']);
        expect(updatedUser.stripe.subscription).toEqual(null);
        expect(updatedUser.stripe.customer).toEqual(null);
        expect(updatedUser.userType).toEqual(UserTypes.basic);
        expect(updatedUser.friends).toEqual([]);
        expect(updatedUser._id).toEqual(expect.any(String));
        expect(updatedUser.username).toEqual(username);
        expect(updatedUser.email).toBeUndefined();
        expect(updatedUser.timezone).toEqual(updatedTimezone);
        expect(updatedUser.profileImages).toEqual({
            avatarImageUrl: 'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
            originalImageUrl: 'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
        });
        expect(updatedUser.createdAt).toEqual(expect.any(String));
        expect(updatedUser.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(updatedUser).sort()).toEqual(
            [
                'stripe',
                'userType',
                'friends',
                '_id',
                'timezone',
                'profileImages',
                'username',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });
});
