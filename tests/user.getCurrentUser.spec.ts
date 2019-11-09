import { StreakoidFactory, londonTimezone } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import UserTypes from '../src/userTypes';
import { username } from './setup/environment';

jest.setTimeout(120000);

describe('GET /users/:userId', () => {
    let streakoid: StreakoidFactory;

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            await getPayingUser();
            streakoid = await streakoidTest();
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`retreives current user`, async () => {
        expect.assertions(10);

        try {
            const user = await streakoid.user.getCurrentUser();

            expect(user._id).toEqual(expect.any(String));
            expect(user.username).toEqual(username);
            expect(user.userType).toEqual(UserTypes.basic);
            expect(user.friends).toEqual([]);
            expect(user.timezone).toEqual(londonTimezone);
            expect(user.profileImages).toEqual({
                originalImageUrl: 'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
            });
            expect(user.pushNotificationToken).toBeNull();
            expect(user.createdAt).toEqual(expect.any(String));
            expect(user.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(user).sort()).toEqual(
                [
                    'userType',
                    'isPayingMember',
                    'friends',
                    '_id',
                    'username',
                    'timezone',
                    'profileImages',
                    'pushNotificationToken',
                    'createdAt',
                    'updatedAt',
                ].sort(),
            );
        } catch (err) {
            console.log(err);
        }
    });
});
