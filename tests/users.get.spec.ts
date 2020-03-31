import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest } from './setup/streakoidTest';
import { getPayingUser } from './setup/getPayingUser';
import { getFriend } from './setup/getFriend';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { setUpDatabase } from './setup/setUpDatabase';
import { tearDownDatabase } from './setup/tearDownDatabase';
import UserTypes from '../src/userTypes';
import { email, username } from './setup/environment';

jest.setTimeout(120000);

describe('GET /users', () => {
    let streakoid: StreakoidFactory;

    beforeEach(async () => {
        if (isTestEnvironment()) {
            await setUpDatabase();
            await getPayingUser();
            streakoid = await streakoidTest();
        }
    });

    afterEach(async () => {
        if (isTestEnvironment()) {
            await tearDownDatabase();
        }
    });

    test(`returns all users when no searchTerm is used`, async () => {
        expect.assertions(13);

        const users = await streakoid.users.getAll({});
        expect(users.length).toEqual(1);

        const user = users[0];

        expect(user.userType).toEqual(UserTypes.basic);
        expect(user.isPayingMember).toEqual(true);
        expect(user.followers).toEqual(expect.any(Array));
        expect(user.badges).toEqual(expect.any(Array));
        expect(user._id).toEqual(expect.any(String));
        expect(user.username).toEqual(expect.any(String));
        expect(user.timezone).toEqual(expect.any(String));
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
                'followers',
                'badges',
                '_id',
                'username',
                'timezone',
                'profileImages',
                'pushNotificationToken',
                'hasCompletedIntroduction',
                'createdAt',
                'updatedAt',
            ].sort(),
        );
    });

    test(`returns user when full searchTerm is used`, async () => {
        expect.assertions(13);

        const users = await streakoid.users.getAll({ searchQuery: username });
        expect(users.length).toEqual(1);

        const user = users[0];

        expect(user.userType).toEqual(UserTypes.basic);
        expect(user.isPayingMember).toEqual(true);
        expect(user.followers).toEqual(expect.any(Array));
        expect(user.badges).toEqual(expect.any(Array));
        expect(user._id).toEqual(expect.any(String));
        expect(user.username).toEqual(expect.any(String));
        expect(user.timezone).toEqual(expect.any(String));
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
                'followers',
                'badges',
                '_id',
                'username',
                'timezone',
                'profileImages',
                'pushNotificationToken',
                'hasCompletedIntroduction',
                'createdAt',
                'updatedAt',
            ].sort(),
        );
    });

    test('returns user when partial searchTerm is used', async () => {
        expect.assertions(13);

        const users = await streakoid.users.getAll({ searchQuery: username.slice(0, 1) });
        expect(users.length).toEqual(1);

        const user = users[0];
        expect(user.userType).toEqual(UserTypes.basic);
        expect(user.isPayingMember).toEqual(true);
        expect(user.followers).toEqual(expect.any(Array));
        expect(user.badges).toEqual(expect.any(Array));
        expect(user._id).toEqual(expect.any(String));
        expect(user.username).toEqual(expect.any(String));
        expect(user.timezone).toEqual(expect.any(String));
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
                'followers',
                'badges',
                '_id',
                'username',
                'timezone',
                'profileImages',
                'pushNotificationToken',
                'hasCompletedIntroduction',
                'createdAt',
                'updatedAt',
            ].sort(),
        );
    });

    test('returns exact user when username query paramater is used', async () => {
        expect.assertions(13);

        const users = await streakoid.users.getAll({ username });
        expect(users.length).toEqual(1);

        const user = users[0];

        expect(user.userType).toEqual(UserTypes.basic);
        expect(user.isPayingMember).toEqual(true);
        expect(user.followers).toEqual(expect.any(Array));
        expect(user.badges).toEqual(expect.any(Array));
        expect(user._id).toEqual(expect.any(String));
        expect(user.username).toEqual(expect.any(String));
        expect(user.timezone).toEqual(expect.any(String));
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
                'followers',
                'badges',
                '_id',
                'username',
                'timezone',
                'profileImages',
                'pushNotificationToken',
                'hasCompletedIntroduction',
                'createdAt',
                'updatedAt',
            ].sort(),
        );
    });

    test('returns exact user when email query paramater is used', async () => {
        expect.assertions(13);

        const users = await streakoid.users.getAll({ email });
        expect(users.length).toEqual(1);

        const user = users[0];
        expect(user.userType).toEqual(UserTypes.basic);
        expect(user.isPayingMember).toEqual(true);
        expect(user.followers).toEqual(expect.any(Array));
        expect(user.badges).toEqual(expect.any(Array));
        expect(user._id).toEqual(expect.any(String));
        expect(user.username).toEqual(expect.any(String));
        expect(user.timezone).toEqual(expect.any(String));
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
                'followers',
                'badges',
                '_id',
                'username',
                'timezone',
                'profileImages',
                'pushNotificationToken',
                'hasCompletedIntroduction',
                'createdAt',
                'updatedAt',
            ].sort(),
        );
    });

    test(`limits to one user when two are available`, async () => {
        expect.assertions(13);

        await getFriend();

        const users = await streakoid.users.getAll({ limit: 1 });
        expect(users.length).toEqual(1);

        const user = users[0];

        expect(user.userType).toEqual(UserTypes.basic);
        expect(user.isPayingMember).toEqual(true);
        expect(user.followers).toEqual(expect.any(Array));
        expect(user.badges).toEqual(expect.any(Array));
        expect(user._id).toEqual(expect.any(String));
        expect(user.username).toEqual(expect.any(String));
        expect(user.timezone).toEqual(expect.any(String));
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
                'followers',
                'badges',
                '_id',
                'username',
                'timezone',
                'profileImages',
                'pushNotificationToken',
                'hasCompletedIntroduction',
                'createdAt',
                'updatedAt',
            ].sort(),
        );
    });

    test(`skips to second user when two are available`, async () => {
        expect.assertions(13);

        await getFriend();

        const users = await streakoid.users.getAll({ skip: 1 });
        expect(users.length).toEqual(1);

        const user = users[0];

        expect(user.userType).toEqual(UserTypes.basic);
        expect(user.isPayingMember).toEqual(true);
        expect(user.followers).toEqual(expect.any(Array));
        expect(user.badges).toEqual(expect.any(Array));
        expect(user._id).toEqual(expect.any(String));
        expect(user.username).toEqual(expect.any(String));
        expect(user.timezone).toEqual(expect.any(String));
        expect(user.profileImages).toEqual({
            originalImageUrl: 'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
        });
        expect(user.pushNotificationToken).toBeDefined();
        expect(user.createdAt).toEqual(expect.any(String));
        expect(user.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(user).sort()).toEqual(
            [
                'userType',
                'isPayingMember',
                'followers',
                'badges',
                '_id',
                'username',
                'timezone',
                'profileImages',
                'pushNotificationToken',
                'hasCompletedIntroduction',
                'createdAt',
                'updatedAt',
            ].sort(),
        );
    });
});
