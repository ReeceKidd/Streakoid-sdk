import mongoose from 'mongoose';

import { PopulatedCurrentUser } from '../../src';
import { streakoid } from '../../src/streakoid';

export const friendUsername = 'follower';
export const friendEmail = 'follower@gmail.com';

const getFriend = async (): Promise<PopulatedCurrentUser> => {
    await streakoid.users.create({ username: friendUsername, email: friendEmail });
    const user = await mongoose.connection.db.collection('Users').findOne({ username: friendUsername });
    const updatedUser = await mongoose.connection.db.collection('Users').findOneAndUpdate(
        { _id: user._id },
        {
            $set: {
                membershipInformation: {
                    isPayingMember: true,
                    currentMembershipStartDate: new Date(),
                },
                pushNotificationToken: 'ExponentPushToken[joIk5nKe5G3IjcfZ2PyurD]',
            },
        },
    );
    const payingUser = await mongoose.connection.db.collection('Users').findOne({ _id: updatedUser.value._id });
    if (!payingUser) {
        throw new Error('Could not find user to update');
    }
    return payingUser;
};

export { getFriend };
