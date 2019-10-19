import { StreakoidFactory } from '../src/streakoid';
import { streakoidTest, getUser, username, email } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { connectToDatabase } from './setup/connectToDatabase';
import { disconnectFromDatabase } from './setup/disconnectFromDatabase';
import UserTypes from '../src/userTypes';

jest.setTimeout(120000);

describe('GET /users', () => {
    let streakoid: StreakoidFactory;

    beforeAll(async () => {
        if (isTestEnvironment()) {
            await connectToDatabase();
            await getUser();
            streakoid = await streakoidTest();
        }
    });

    afterAll(async () => {
        if (isTestEnvironment()) {
            await disconnectFromDatabase();
        }
    });

    test(`returns all users when no searchTerm is used`, async () => {
        expect.assertions(13);

        const users = await streakoid.users.getAll({});
        expect(users.length).toBeGreaterThanOrEqual(1);

        const user = users[0];

        expect(Object.keys(user.stripe).sort()).toEqual(['customer', 'subscription'].sort());
        expect(user.stripe.subscription).toEqual(null);
        expect(user.stripe.customer).toEqual(null);
        expect(user.userType).toEqual(UserTypes.basic);
        expect(user.friends).toEqual(expect.any(Array));
        expect(user._id).toEqual(expect.any(String));
        expect(user.username).toEqual(expect.any(String));
        expect(user.email).toBeUndefined();
        expect(user.timezone).toEqual(expect.any(String));
        expect(user.createdAt).toEqual(expect.any(String));
        expect(user.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(user).sort()).toEqual(
            ['stripe', 'type', 'friends', '_id', 'username', 'timezone', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test(`returns user when full searchTerm is used`, async () => {
        expect.assertions(13);

        const users = await streakoid.users.getAll({ searchQuery: username });
        expect(users.length).toBeGreaterThanOrEqual(1);

        const user = users[0];
        expect(Object.keys(user.stripe).sort()).toEqual(['customer', 'subscription'].sort());
        expect(user.stripe.subscription).toEqual(null);
        expect(user.stripe.customer).toEqual(null);
        expect(user.userType).toEqual(UserTypes.basic);
        expect(user.friends).toEqual([]);
        expect(user._id).toEqual(expect.any(String));
        expect(user.username).toEqual(username);
        expect(user.email).toBeUndefined();
        expect(user.timezone).toEqual(expect.any(String));
        expect(user.createdAt).toEqual(expect.any(String));
        expect(user.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(user).sort()).toEqual(
            ['stripe', 'type', 'friends', '_id', 'username', 'timezone', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test('returns user when partial searchTerm is used', async () => {
        expect.assertions(13);

        const users = await streakoid.users.getAll({ searchQuery: 'tes' });
        expect(users.length).toBeGreaterThanOrEqual(1);

        const user = users[0];
        expect(Object.keys(user.stripe)).toEqual(['customer', 'subscription']);
        expect(user.stripe.subscription).toEqual(null);
        expect(user.stripe.customer).toEqual(null);
        expect(user.userType).toEqual(UserTypes.basic);
        expect(user.friends).toEqual([]);
        expect(user._id).toEqual(expect.any(String));
        expect(user.username).toEqual(username);
        expect(user.email).toBeUndefined();
        expect(user.timezone).toEqual(expect.any(String));
        expect(user.createdAt).toEqual(expect.any(String));
        expect(user.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(user).sort()).toEqual(
            ['stripe', 'type', 'friends', '_id', 'username', 'timezone', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test('returns exact user when username query paramater is used', async () => {
        expect.assertions(13);

        const users = await streakoid.users.getAll({ username });
        expect(users.length).toBeGreaterThanOrEqual(1);

        const user = users[0];
        expect(Object.keys(user.stripe)).toEqual(['customer', 'subscription']);
        expect(user.stripe.subscription).toEqual(null);
        expect(user.stripe.customer).toEqual(null);
        expect(user.userType).toEqual(UserTypes.basic);
        expect(user.friends).toEqual([]);
        expect(user._id).toEqual(expect.any(String));
        expect(user.username).toEqual(username);
        expect(user.email).toBeUndefined();
        expect(user.timezone).toEqual(expect.any(String));
        expect(user.createdAt).toEqual(expect.any(String));
        expect(user.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(user).sort()).toEqual(
            ['stripe', 'type', 'friends', '_id', 'username', 'timezone', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });

    test('returns exact user when email query paramater is used', async () => {
        expect.assertions(13);

        const users = await streakoid.users.getAll({ email });
        expect(users.length).toBeGreaterThanOrEqual(1);

        const user = users[0];
        expect(Object.keys(user.stripe)).toEqual(['customer', 'subscription']);
        expect(user.stripe.subscription).toEqual(null);
        expect(user.stripe.customer).toEqual(null);
        expect(user.userType).toEqual(UserTypes.basic);
        expect(user.friends).toEqual([]);
        expect(user._id).toEqual(expect.any(String));
        expect(user.username).toEqual(username);
        expect(user.email).toBeUndefined();
        expect(user.timezone).toEqual(expect.any(String));
        expect(user.createdAt).toEqual(expect.any(String));
        expect(user.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(user).sort()).toEqual(
            ['stripe', 'type', 'friends', '_id', 'username', 'timezone', 'createdAt', 'updatedAt', '__v'].sort(),
        );
    });
});
