import { StreakoidFactory } from '../src/streakoid';
import { getUser, streakoidTest, username, email } from './setup/streakoidTest';
import { isTestEnvironment } from './setup/isTestEnvironment';
import { connectToDatabase } from './setup/connectToDatabase';
import { disconnectFromDatabase } from './setup/disconnectFromDatabase';
import fs from 'fs';
import UserTypes from '../src/userTypes';
import FormData from 'form-data';

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

    test(`creates solo streak without a description or number of minutes`, async () => {
        expect.assertions(14);

        const fd = new FormData();
        const profilePicture = fs.createReadStream('./setup/profilePicture.jpg');
        console.log(profilePicture);
        fd.append('image', profilePicture);
        try {
            const profileImages = await streakoid.profileImages.create({
                formData: fd,
            });

            expect(profileImages.avatarImageUrl).toEqual(
                'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
            );
            expect(profileImages.originalImageUrl).toEqual(
                'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
            );
            expect(Object.keys(profileImages).sort()).toEqual(['avatarImageUrl', 'originalImageUrl'].sort());

            const user = await streakoid.users.getOne(userId);

            expect(Object.keys(user.stripe)).toEqual(['customer', 'subscription']);
            expect(user.stripe.subscription).toEqual(null);
            expect(user.stripe.customer).toEqual(null);
            expect(user.userType).toEqual(UserTypes.basic);
            expect(user.friends).toEqual([]);
            expect(user._id).toEqual(expect.any(String));
            expect(user.username).toEqual(username);
            expect(user.email).toEqual(email);
            expect(user.timezone).toEqual('Europe/London');
            expect(user.profileImages).toEqual({
                avatarImageUrl: 'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
                originalImageUrl: 'https://streakoid-profile-pictures.s3-eu-west-1.amazonaws.com/steve.jpg',
            });
            expect(user.createdAt).toEqual(expect.any(String));
            expect(user.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(user).sort()).toEqual(
                [
                    'stripe',
                    'userType',
                    'friends',
                    '_id',
                    'timezone',
                    'username',
                    'email',
                    'profileImages',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ].sort(),
            );
        } catch (err) {
            console.log(err.response.data);
        }
    });
});
