import { getUser, streakoidTest } from './setup/streakoidTest';
import { StreakoidFactory } from '../src/streakoid';

jest.setTimeout(120000);

describe('DELETE /users/:userId', () => {
    let streakoid: StreakoidFactory;
    let userId: string;

    beforeAll(async () => {
        const user = await getUser();
        userId = user._id;
        streakoid = await streakoidTest();
    });

    test(`deletes user`, async () => {
        expect.assertions(3);

        try {
            const deleteUserResponse = await streakoid.users.deleteOne(userId);
            expect(deleteUserResponse.status).toBe(204);
            await streakoid.users.getOne(userId);
        } catch (err) {
            expect(err.response.status).toBe(400);
            expect(err.response.data.message).toEqual('Not authorized.');
        }
    });

    test(`sends NoUserToDeleteFound error when user does not exist`, async () => {
        expect.assertions(2);

        try {
            await streakoid.users.deleteOne(userId);
        } catch (err) {
            expect(err.response.status).toBe(400);
            expect(err.response.data.message).toEqual('Not authorized.');
        }
    });
});
