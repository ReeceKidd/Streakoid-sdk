import { streakoidFactory, streakoidClient } from './streakoid';
jest.genMockFromModule('./streakoid');

describe('SDK users', () => {
    const streakoid = streakoidFactory(streakoidClient);

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('create', () => {
        test('calls POST with correct URL and  parmaters', async () => {
            expect.assertions(1);

            streakoidClient.post = jest.fn().mockResolvedValue(true);
            const username = 'username';
            const email = 'email@gmail.com';

            await streakoid.users.create({ username, email });

            expect(streakoidClient.post).toBeCalledWith(`/v1/user`, {
                username,
                email,
            });
        });
    });

    describe('getAll', () => {
        test('calls GET with correct URL and searchQuery paramater', async () => {
            expect.assertions(1);

            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.users.getAll({ searchQuery: 'searchQuery' });

            expect(streakoidClient.get).toBeCalledWith(`/v1/users?searchQuery=searchQuery&`);
        });

        test('calls GET with correct URL without searchQuery paramater', async () => {
            expect.assertions(1);

            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.users.getAll({});

            expect(streakoidClient.get).toBeCalledWith(`/v1/users?`);
        });

        test('calls GET with correct URL and username paramater', async () => {
            expect.assertions(1);

            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.users.getAll({ username: 'username' });

            expect(streakoidClient.get).toBeCalledWith(`/v1/users?username=username&`);
        });

        test('calls GET with correct URL and email paramater', async () => {
            expect.assertions(1);

            streakoidClient.get = jest.fn().mockResolvedValue(true);

            await streakoid.users.getAll({ email: 'email' });

            expect(streakoidClient.get).toBeCalledWith(`/v1/users?email=email&`);
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
