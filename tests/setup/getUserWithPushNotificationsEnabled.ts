import { username, email } from './environment';
import { streakoid } from '../../src/streakoid';
import { User } from '../../src';
import mongoose from 'mongoose';

const getUserWithPushNotificationsEnabled = async (): Promise<User> => {
    await streakoid.users.create({
        username,
        email,
    });
    const user = await mongoose.connection.db.collection('Users').findOne({ username });
    const updatedUser = await mongoose.connection.db.collection('Users').findOneAndUpdate(
        { _id: user._id },
        {
            $set: {
                membershipInformation: {
                    ...user.membershipInformation,
                    isPayingMember: true,
                    currentMembershipStartDate: new Date(),
                },
                endpointArn: `ExponentPushToken[oUwWRuBBN99CrfQwZs509b]`,
            },
        },
    );
    const payingUser = await mongoose.connection.db.collection('Users').findOne({ _id: updatedUser.value._id });
    if (!payingUser) {
        throw new Error('Could not find user to update');
    }
    return payingUser;
};

export { getUserWithPushNotificationsEnabled };
