import StreakStatus from '../src/StreakStatus';
import { StreakoidFactory } from '../src/streakoid';
import { getUser, streakoidTest } from './setup/streakoidTest';

jest.setTimeout(120000);

describe(`PATCH /team-streaks`, () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let teamStreakId: string;

    const streakName = 'Paleo';
    const streakDescription = 'I will follow the paleo diet every day';

    beforeAll(async () => {
        const user = await getUser();
        userId = user._id;
        streakoid = await streakoidTest();
        userId = user._id;

        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            streakDescription,
            members,
        });
        teamStreakId = teamStreak._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.teamStreaks.deleteOne(teamStreakId);
    });

    test(`that request passes when team streak is patched with correct keys`, async () => {
        expect.assertions(17);

        const updatedName = 'Intermittent fasting';
        const updatedDescription = 'Cannot eat till 1pm everyday';
        const numberOfMinutes = 30;
        const updatedTimezone = 'Europe/Rome';
        const numberOfDaysInARow = 10;

        const teamStreak = await streakoid.teamStreaks.update({
            teamStreakId,
            updateData: {
                streakName: updatedName,
                streakDescription: updatedDescription,
                numberOfMinutes,
                timezone: updatedTimezone,
                status: StreakStatus.live,
                currentStreak: {
                    startDate: new Date().toString(),
                    numberOfDaysInARow,
                },
                pastStreaks: [],
                completedToday: false,
                active: false,
            },
        });

        expect(teamStreak.streakName).toEqual(expect.any(String));
        expect(teamStreak.status).toEqual(StreakStatus.live);
        expect(teamStreak.streakDescription).toEqual(expect.any(String));
        expect(teamStreak.numberOfMinutes).toEqual(numberOfMinutes);
        expect(teamStreak.creatorId).toEqual(userId);
        expect(teamStreak.timezone).toEqual(expect.any(String));
        expect(teamStreak.active).toEqual(false);
        expect(teamStreak.completedToday).toEqual(false);
        expect(teamStreak.currentStreak.numberOfDaysInARow).toEqual(numberOfDaysInARow);
        expect(teamStreak.currentStreak.startDate).toEqual(expect.any(String));
        expect(Object.keys(teamStreak.currentStreak).sort()).toEqual(['startDate', 'numberOfDaysInARow'].sort());
        expect(teamStreak.pastStreaks.length).toEqual(0);
        expect(Object.keys(teamStreak).sort()).toEqual(
            [
                '_id',
                'members',
                'status',
                'creatorId',
                'streakName',
                'streakDescription',
                'numberOfMinutes',
                'timezone',
                'active',
                'completedToday',
                'currentStreak',
                'pastStreaks',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );

        const { members } = teamStreak;
        expect(members.length).toEqual(1);

        const member = members[0];
        expect(member.memberId).toBeDefined();
        expect(member.groupMemberStreakId).toEqual(expect.any(String));
        expect(Object.keys(member).sort()).toEqual(['memberId', 'groupMemberStreakId'].sort());
    });
});
