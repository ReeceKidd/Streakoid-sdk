import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import UserTypes from '../src/userTypes';
import { email, username } from './setup/environment';

jest.setTimeout(120000);

describe('GET /users', () => {
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

    test(`returns all users when no searchTerm is used`, async () => {
        expect.assertions(11);

        const users = await streakoid.users.getAll({});
        expect(users.length).toBeGreaterThanOrEqual(1);

        const user = users[0];

        expect(user.userType).toEqual(UserTypes.basic);
        expect(user.isPayingMember).toEqual(true);
        expect(user.friends).toEqual(expect.any(Array));
        expect(user._id).toEqual(expect.any(String));
        expect(user.username).toEqual(expect.any(String));
        expect(user.timezone).toEqual(expect.any(String));
        expect(user.profileImages).toEqual({
            originalImageUrl: 'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
        });
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
                'createdAt',
                'updatedAt',
            ].sort(),
        );
    });

    test(`returns user when full searchTerm is used`, async () => {
        expect.assertions(11);

        const users = await streakoid.users.getAll({ searchQuery: username });
        expect(users.length).toBeGreaterThanOrEqual(1);

        const user = users[0];
        expect(user.userType).toEqual(UserTypes.basic);
        expect(user.isPayingMember).toEqual(true);
        expect(user.friends).toEqual([]);
        expect(user._id).toEqual(expect.any(String));
        expect(user.username).toEqual(username);
        expect(user.timezone).toEqual(expect.any(String));
        expect(user.profileImages).toEqual({
            originalImageUrl: 'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
        });
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
                'createdAt',
                'updatedAt',
            ].sort(),
        );
    });

    test('returns user when partial searchTerm is used', async () => {
        expect.assertions(11);

        const users = await streakoid.users.getAll({ searchQuery: 'tes' });
        expect(users.length).toBeGreaterThanOrEqual(1);

        const user = users[0];
        expect(user.userType).toEqual(UserTypes.basic);
        expect(user.isPayingMember).toEqual(true);
        expect(user.friends).toEqual([]);
        expect(user._id).toEqual(expect.any(String));
        expect(user.username).toEqual(username);
        expect(user.timezone).toEqual(expect.any(String));
        expect(user.profileImages).toEqual({
            originalImageUrl: 'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
        });
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
                'createdAt',
                'updatedAt',
            ].sort(),
        );
    });

    test('returns exact user when username query paramater is used', async () => {
        expect.assertions(11);

        const users = await streakoid.users.getAll({ username });
        expect(users.length).toBeGreaterThanOrEqual(1);

        const user = users[0];
        expect(user.userType).toEqual(UserTypes.basic);
        expect(user.isPayingMember).toEqual(true);
        expect(user.friends).toEqual([]);
        expect(user._id).toEqual(expect.any(String));
        expect(user.username).toEqual(username);
        expect(user.timezone).toEqual(expect.any(String));
        expect(user.profileImages).toEqual({
            originalImageUrl: 'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
        });
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
                'createdAt',
                'updatedAt',
            ].sort(),
        );
    });

    test('returns exact user when email query paramater is used', async () => {
        expect.assertions(11);

        const users = await streakoid.users.getAll({ email });
        expect(users.length).toBeGreaterThanOrEqual(1);

        const user = users[0];
        expect(user.userType).toEqual(UserTypes.basic);
        expect(user.isPayingMember).toEqual(true);
        expect(user.friends).toEqual([]);
        expect(user._id).toEqual(expect.any(String));
        expect(user.username).toEqual(username);
        expect(user.timezone).toEqual(expect.any(String));
        expect(user.profileImages).toEqual({
            originalImageUrl: 'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
        });
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
                'createdAt',
                'updatedAt',
            ].sort(),
        );
    });
});
