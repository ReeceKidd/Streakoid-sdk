import { streakoid } from '../../src/streakoid';
import mongoose from 'mongoose';
import { User } from '@streakoid/streakoid-models/lib/Models/User';
import PushNotificationSupportedDeviceTypes from '@streakoid/streakoid-models/lib/Types/PushNotificationSupportedDeviceTypes';
import { getServiceConfig } from '../../getServiceConfig';

const getUserWithPushNotificationsEnabled = async (): Promise<User> => {
    const username = getServiceConfig().USER;
    const email = getServiceConfig().EMAIL;
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
                pushNotification: {
                    token: 'token',
                    endpointArn: 'endpointArn',
                    deviceType: PushNotificationSupportedDeviceTypes.android,
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

export { getUserWithPushNotificationsEnabled };
