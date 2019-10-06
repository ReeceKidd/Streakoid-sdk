import { streakoid } from '../src/streakoid';
import UserTypes from '../src/userTypes';

const email = 'patch-solo-streak-updateduser@gmail.com';
const username = 'patch-solo-streak-updateduser';

jest.setTimeout(120000);

describe(`PATCH /users`, () => {
    let userId: string;

    beforeAll(async () => {
        const updatedUser = await streakoid.users.create({
            email,
            username,
        });
        userId = updatedUser._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
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
        expect(updatedUser.type).toEqual(UserTypes.basic);
        expect(updatedUser.friends).toEqual([]);
        expect(updatedUser._id).toEqual(expect.any(String));
        expect(updatedUser.username).toEqual(username);
        expect(updatedUser.email).toEqual(email);
        expect(updatedUser.timezone).toEqual(updatedTimezone);
        expect(updatedUser.createdAt).toEqual(expect.any(String));
        expect(updatedUser.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(updatedUser).sort()).toEqual(
            [
                'stripe',
                'type',
                'friends',
                '_id',
                'timezone',
                'username',
                'email',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });
});
