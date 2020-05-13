import mongoose from 'mongoose';

import { streakoid } from '../../src/streakoid';
import { PopulatedCurrentUser } from '@streakoid/streakoid-models/lib/Models/PopulatedCurrentUser';
import PushNotificationSupportedDeviceTypes from '@streakoid/streakoid-models/lib/Types/PushNotificationSupportedDeviceTypes';

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

export { getFriend };
