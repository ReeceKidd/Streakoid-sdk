import ApiVersions from './ApiVersions';
import { pushNotifications } from './user.pushNotifications';
import { PopulatedCurrentUser } from '@streakoid/streakoid-models/lib/Models/PopulatedCurrentUser';
import { Onboarding } from '@streakoid/streakoid-models/lib/Models/Onboarding';
import RouterCategories from '@streakoid/streakoid-models/lib/Types/RouterCategories';
import PushNotificationSupportedDeviceTypes from '@streakoid/streakoid-models/lib/Types/PushNotificationSupportedDeviceTypes';
import { GetRequest, PatchRequest } from './request';
import UserTypes from '@streakoid/streakoid-models/lib/Types/UserTypes';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const user = ({ getRequest, patchRequest }: { getRequest: GetRequest; patchRequest: PatchRequest }) => {
    const getCurrentUser = async (): Promise<PopulatedCurrentUser> => {
        try {
            return getRequest({ route: `/${ApiVersions.v1}/${RouterCategories.user}` });
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const updateCurrentUser = async ({
        updateData,
    }: {
        updateData?: {
            email?: string;
            username?: string;
            firstName?: string;
            lastName?: string;
            hasUsernameBeenCustomized?: boolean;
            timezone?: string;
            pushNotification?: {
                deviceType: PushNotificationSupportedDeviceTypes;
                token: string;
            };
            hasProfileImageBeenCustomized?: boolean;
            hasCompletedTutorial?: boolean;
            hasCompletedIntroduction?: boolean;
            onboarding?: Onboarding;
            hasCompletedOnboarding?: boolean;
            userType?: UserTypes;
            hasVerifiedEmail?: boolean;
            hasCustomPassword?: boolean;
            soloStreaksOrder?: string[];
            challengeStreaksOrder?: string[];
            teamStreaksOrder?: string[];
        };
    }): Promise<PopulatedCurrentUser> => {
        try {
            return patchRequest({ route: `/${ApiVersions.v1}/${RouterCategories.user}`, params: updateData });
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        getCurrentUser,
        updateCurrentUser,
        pushNotifications: pushNotifications({ patchRequest }),
    };
};

export { user };
