import { streakoid } from '../src/streakoid';

const email = 'delete-user@gmail.com';
const username = 'delete-user';

jest.setTimeout(120000);

describe('DELETE /users/:userId', () => {
    let userId = '';

    beforeAll(async () => {
        const registrationResponse = await streakoid.users.create({
            email,
            username,
        });
        userId = registrationResponse._id;
    });

    test(`deletes user`, async () => {
        expect.assertions(3);

        try {
            const deleteUserResponse = await streakoid.users.deleteOne(userId);
            expect(deleteUserResponse.status).toBe(204);
            await streakoid.users.getOne(userId);
        } catch (err) {
            expect(err.response.status).toBe(400);
            expect(err.response.data.message).toEqual('User does not exist.');
        }
    });

    test(`sends NoUserToDeleteFound error when user does not exist`, async () => {
        expect.assertions(2);

        try {
            await streakoid.users.deleteOne(userId);
        } catch (err) {
            expect(err.response.status).toBe(400);
            expect(err.response.data.message).toEqual('User does not exist.');
        }
    });
});
