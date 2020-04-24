import { username, email } from './environment';
import { streakoid } from '../../src/streakoid';
import mongoose from 'mongoose';
import { User } from '@streakoid/streakoid-models/lib/Models/User';

const getPayingUser = async (): Promise<User> => {
    await streakoid.users.create({
        username,
        email,
    });
    const user = await mongoose.connection.db.collection('Users').findOne({});
    const updatedUser = await mongoose.connection.db.collection('Users').findOneAndUpdate(
        { _id: user._id },
        {
            $set: {
                membershipInformation: {
                    ...user.membershipInformation,
                    isPayingMember: true,
                    currentMembershipStartDate: new Date(),
                },
                stripe: {
                    customer: 'customer',
                    subscription: 'subscription',
                },
            },
        },
    );
    const payingUser = await mongoose.connection.db.collection('Users').findOne({ _id: updatedUser.value._id });
    if (!payingUser) {
        throw new Error('Could not find user to update');
    }
    return payingUser;
};

export { getPayingUser };
