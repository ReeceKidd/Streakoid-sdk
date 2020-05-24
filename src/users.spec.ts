import { streakoidFactory, streakoidClient } from './streakoid';
jest.genMockFromModule('./streakoid');

describe('SDK users', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('create', () => {
        test('calls POST with correct URL and  parameters', async () => {
            expect.assertions(1);

            streakoidClient.post = jest.fn().mockResolvedValue(true);
            const username = 'username';
            const email = 'email@gmail.com';

            await streakoid.users.create({ username, email });

            expect(streakoidClient.post).toBeCalledWith(`/v1/users`, {
                username,
                email,
            });
        });
    });

    describe('createTemporary', () => {
        test('calls POST with correct URL and  parameters', async () => {
            expect.assertions(1);

            streakoidClient.post = jest.fn().mockResolvedValue(true);
            const userIdentifier = 'userIdentifier';

            await streakoid.users.createTemporary({ userIdentifier });

            expect(streakoidClient.post).toBeCalledWith(`/v1/users/temporary`, {
                userIdentifier,
            });
        });
    });

    describe('getAll', () => {
        test('calls GET with correct URL and skip paramter', async () => {
            expect.assertions(1);

            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.users.getAll({ skip: 10 });

            expect(streakoidClient.get).toBeCalledWith(`/v1/users?skip=10&`);
        });
        test('calls GET with correct URL and limit paramter', async () => {
            expect.assertions(1);

            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.users.getAll({ limit: 10 });

            expect(streakoidClient.get).toBeCalledWith(`/v1/users?limit=10&`);
        });
        test('calls GET with correct URL and searchQuery paramter', async () => {
            expect.assertions(1);

            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.users.getAll({ searchQuery: 'searchQuery' });

            expect(streakoidClient.get).toBeCalledWith(`/v1/users?searchQuery=searchQuery&`);
        });

        test('calls GET with correct URL without searchQuery paramter', async () => {
            expect.assertions(1);

            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.users.getAll({});

            expect(streakoidClient.get).toBeCalledWith(`/v1/users?`);
        });

        test('calls GET with correct URL and username paramter', async () => {
            expect.assertions(1);

            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.users.getAll({ username: 'username' });

            expect(streakoidClient.get).toBeCalledWith(`/v1/users?username=username&`);
        });

        test('calls GET with correct URL and email paramter', async () => {
            expect.assertions(1);

            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.users.getAll({ email: 'email' });

            expect(streakoidClient.get).toBeCalledWith(`/v1/users?email=email&`);
        });

        test('calls GET with correct URL and userIds paramter', async () => {
            expect.assertions(1);

            streakoidClient.get = jest.fn().mockResolvedValue(true);

            const userIds = ['user1', 'user2'];

            await streakoid.users.getAll({ userIds });

            expect(streakoidClient.get).toBeCalledWith(
                `/v1/users?userIds=${encodeURIComponent(JSON.stringify(userIds))}&`,
            );
        });
    });

    describe('getOne', () => {
        test('calls GET with correct URL', async () => {
            expect.assertions(1);

            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.users.getOne('userId');

            expect(streakoidClient.get).toBeCalledWith(`/v1/users/userId`);
        });
    });
});
