import ApiVersions from './ApiVersions';
import { pushNotifications } from './user.pushNotifications';
import { PopulatedCurrentUser } from '@streakoid/streakoid-models/lib/Models/PopulatedCurrentUser';
import { Onboarding } from '@streakoid/streakoid-models/lib/Models/Onboarding';
import RouterCategories from '@streakoid/streakoid-models/lib/Types/RouterCategories';
import { GetRequest, PatchRequest } from './request';
import UserTypes from '@streakoid/streakoid-models/lib/Types/UserTypes';
import StreakStatus from '@streakoid/streakoid-models/lib/Types/StreakStatus';
import { GetAllSoloStreaksSortFields } from './soloStreaks';
import { SoloStreak } from '@streakoid/streakoid-models/lib/Models/SoloStreak';

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
                androidToken?: string;
                iosToken?: string;
            };
            hasProfileImageBeenCustomized?: boolean;
            hasCompletedTutorial?: boolean;
            hasCompletedIntroduction?: boolean;
            onboarding?: Onboarding;
            hasCompletedOnboarding?: boolean;
            userType?: UserTypes;
            hasVerifiedEmail?: boolean;
            hasCustomPassword?: boolean;
            teamStreaksOrder?: string[];
        };
    }): Promise<PopulatedCurrentUser> => {
        try {
            return patchRequest({ route: `/${ApiVersions.v1}/${RouterCategories.user}`, params: updateData });
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const soloStreaks = async ({
        completedToday,
        timezone,
        active,
        status,
        sortField,
        limit,
    }: {
        timezone?: string;
        status?: StreakStatus;
        active?: boolean;
        completedToday?: boolean;
        sortField?: GetAllSoloStreaksSortFields;
        limit?: number;
    }): Promise<SoloStreak[]> => {
        try {
            let getAllSoloStreaksURL = `/${ApiVersions.v1}/${RouterCategories.user}/solo-streaks?`;

            if (timezone) {
                getAllSoloStreaksURL = `${getAllSoloStreaksURL}timezone=${timezone}&`;
            }

            if (status) {
                getAllSoloStreaksURL = `${getAllSoloStreaksURL}status=${status}&`;
            }

            if (completedToday !== undefined) {
                getAllSoloStreaksURL = `${getAllSoloStreaksURL}completedToday=${Boolean(completedToday)}&`;
            }

            if (active !== undefined) {
                getAllSoloStreaksURL = `${getAllSoloStreaksURL}active=${Boolean(active)}&`;
            }

            if (sortField) {
                getAllSoloStreaksURL = `${getAllSoloStreaksURL}sortField=${sortField}&`;
            }

            if (limit) {
                getAllSoloStreaksURL = `${getAllSoloStreaksURL}limit=${limit}&`;
            }

            return getRequest({ route: getAllSoloStreaksURL });
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        getCurrentUser,
        updateCurrentUser,
        pushNotifications: pushNotifications({ patchRequest }),
        soloStreaks,
    };
};

export { user };
