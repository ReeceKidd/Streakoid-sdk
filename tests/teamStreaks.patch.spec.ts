import { streakoid } from '../src/streakoid';
import StreakStatus from '../src/StreakStatus';

const registeredEmail = 'patch-team-streak-user@gmail.com';
const registeredUsername = 'patch-team-streak-user';

jest.setTimeout(120000);

describe(`PATCH /team-streaks`, () => {
    let userId: string;
    let teamStreakId: string;

    const streakName = 'Paleo';
    const streakDescription = 'I will follow the paleo diet every day';

    beforeAll(async () => {
        const user = await streakoid.users.create({
            username: registeredUsername,
            email: registeredEmail,
        });
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
        expect.assertions(14);

        const updatedName = 'Intermittent fasting';
        const updatedDescription = 'Cannot eat till 1pm everyday';
        const numberOfMinutes = 30;
        const updatedTimezone = 'Europe/Rome';

        const teamStreak = await streakoid.teamStreaks.update({
            teamStreakId,
            updateData: {
                streakName: updatedName,
                streakDescription: updatedDescription,
                numberOfMinutes,
                timezone: updatedTimezone,
            },
        });

        expect(teamStreak._id).toEqual(expect.any(String));
        expect(teamStreak.creatorId).toEqual(userId);
        expect(teamStreak.streakName).toEqual(updatedName);
        expect(teamStreak.status).toEqual(StreakStatus.live);
        expect(teamStreak.streakDescription).toEqual(updatedDescription);
        expect(teamStreak.timezone).toEqual(updatedTimezone);
        expect(teamStreak.numberOfMinutes).toEqual(numberOfMinutes);
        expect(teamStreak.createdAt).toEqual(expect.any(String));
        expect(teamStreak.updatedAt).toEqual(expect.any(String));

        expect(Object.keys(teamStreak).sort()).toEqual(
            [
                'members',
                '_id',
                'creatorId',
                'streakName',
                'status',
                'streakDescription',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
                'numberOfMinutes',
            ].sort(),
        );

        expect(teamStreak.members.length).toEqual(1);
        const member = teamStreak.members[0];
        expect(member.groupMemberStreakId).toEqual(expect.any(String));
        expect(member.memberId).toEqual(userId);
        expect(Object.keys(teamStreak.members[0]).sort()).toEqual(['memberId', 'groupMemberStreakId'].sort());
    });
});
