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
import { GetAllChallengeStreaksSortFields } from './challengeStreaks';
import { GetAllTeamMemberStreaksSortFields } from './teamMemberStreaks';
import { GetAllTeamStreaksSortFields } from './teamStreaks';
import { TeamMemberStreak } from '@streakoid/streakoid-models/lib/Models/TeamMemberStreak';
import { PopulatedTeamStreak } from '@streakoid/streakoid-models/lib/Models/PopulatedTeamStreak';
import { ChallengeStreak } from '@streakoid/streakoid-models/lib/Models/ChallengeStreak';

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

    const challengeStreaks = async ({
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
        sortField?: GetAllChallengeStreaksSortFields;
        limit?: number;
    }): Promise<ChallengeStreak[]> => {
        try {
            let getAllChallengeStreaksURL = `/${ApiVersions.v1}/${RouterCategories.user}/${RouterCategories.challengeStreaks}?`;

            if (timezone) {
                getAllChallengeStreaksURL = `${getAllChallengeStreaksURL}timezone=${timezone}&`;
            }

            if (status) {
                getAllChallengeStreaksURL = `${getAllChallengeStreaksURL}status=${status}&`;
            }

            if (completedToday !== undefined) {
                getAllChallengeStreaksURL = `${getAllChallengeStreaksURL}completedToday=${Boolean(completedToday)}&`;
            }

            if (active !== undefined) {
                getAllChallengeStreaksURL = `${getAllChallengeStreaksURL}active=${Boolean(active)}&`;
            }

            if (sortField) {
                getAllChallengeStreaksURL = `${getAllChallengeStreaksURL}sortField=${sortField}&`;
            }

            if (limit) {
                getAllChallengeStreaksURL = `${getAllChallengeStreaksURL}limit=${limit}&`;
            }

            return getRequest({ route: getAllChallengeStreaksURL });
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const teamMemberStreaks = async ({
        userId,
        teamStreakId,
        status,
        completedToday,
        timezone,
        active,
        sortField,
        limit,
    }: {
        userId?: string;
        teamStreakId?: string;
        status?: StreakStatus;
        completedToday?: boolean;
        timezone?: string;
        active?: boolean;
        sortField?: GetAllTeamMemberStreaksSortFields;
        limit?: number;
    }): Promise<TeamMemberStreak[]> => {
        try {
            let getAllTeamMemberStreaksURL = `/${ApiVersions.v1}/${RouterCategories.user}/${RouterCategories.teamMemberStreaks}?`;

            if (userId) {
                getAllTeamMemberStreaksURL = `${getAllTeamMemberStreaksURL}userId=${userId}&`;
            }

            if (teamStreakId) {
                getAllTeamMemberStreaksURL = `${getAllTeamMemberStreaksURL}teamStreakId=${teamStreakId}&`;
            }

            if (status) {
                getAllTeamMemberStreaksURL = `${getAllTeamMemberStreaksURL}status=${status}&`;
            }

            if (completedToday !== undefined) {
                getAllTeamMemberStreaksURL = `${getAllTeamMemberStreaksURL}completedToday=${Boolean(completedToday)}&`;
            }

            if (timezone) {
                getAllTeamMemberStreaksURL = `${getAllTeamMemberStreaksURL}timezone=${timezone}&`;
            }

            if (active !== undefined) {
                getAllTeamMemberStreaksURL = `${getAllTeamMemberStreaksURL}active=${Boolean(active)}&`;
            }
            if (sortField) {
                getAllTeamMemberStreaksURL = `${getAllTeamMemberStreaksURL}sortField=${sortField}&`;
            }
            if (limit) {
                getAllTeamMemberStreaksURL = `${getAllTeamMemberStreaksURL}limit=${limit}&`;
            }

            return getRequest({ route: getAllTeamMemberStreaksURL });
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const teamStreaks = async ({
        timezone,
        status,
        completedToday,
        active,
        sortField,
        limit,
    }: {
        creatorId?: string;
        memberId?: string;
        timezone?: string;
        status?: StreakStatus;
        completedToday?: boolean;
        active?: boolean;
        sortField?: GetAllTeamStreaksSortFields;
        limit?: number;
    }): Promise<PopulatedTeamStreak[]> => {
        try {
            let getAllTeamStreaksURL = `/${ApiVersions.v1}/${RouterCategories.user}/${RouterCategories.teamStreaks}?`;

            if (timezone) {
                getAllTeamStreaksURL = `${getAllTeamStreaksURL}timezone=${timezone}&`;
            }
            if (status) {
                getAllTeamStreaksURL = `${getAllTeamStreaksURL}status=${status}&`;
            }
            if (completedToday !== undefined) {
                getAllTeamStreaksURL = `${getAllTeamStreaksURL}completedToday=${Boolean(completedToday)}&`;
            }
            if (active !== undefined) {
                getAllTeamStreaksURL = `${getAllTeamStreaksURL}active=${Boolean(active)}&`;
            }
            if (sortField) {
                getAllTeamStreaksURL = `${getAllTeamStreaksURL}sortField=${sortField}&`;
            }
            if (limit) {
                getAllTeamStreaksURL = `${getAllTeamStreaksURL}limit=${limit}&`;
            }

            return getRequest({ route: getAllTeamStreaksURL });
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        getCurrentUser,
        updateCurrentUser,
        pushNotifications: pushNotifications({ patchRequest }),
        soloStreaks,
        challengeStreaks,
        teamMemberStreaks,
        teamStreaks,
    };
};

export { user };
