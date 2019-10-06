import { streakoid, londonTimezone } from '../src/streakoid';
import StreakStatus from '../src/StreakStatus';

const registeredEmail = 'create-groupmember-user@gmail.com';
const registeredUsername = 'create-groupmember-user';

const friendEmail = 'friend@gmail.com';
const friendUsername = 'friendUser';

jest.setTimeout(120000);

describe('DELETE /team-streaks/:id/members/:id', () => {
    let userId: string;
    let friendId: string;
    let createdteamStreakId: string;

    const streakName = 'Drink water';
    const streakDescription = 'Everyday I must drink two litres of water';

    beforeAll(async () => {
        const user = await streakoid.users.create({
            username: registeredUsername,
            email: registeredEmail,
        });
        userId = user._id;

        const friend = await streakoid.users.create({
            username: friendUsername,
            email: friendEmail,
        });

        friendId = friend._id;

        const members = [{ memberId: userId }];

        const teamStreak = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            streakDescription,
            members,
        });
        createdteamStreakId = teamStreak._id;

        await streakoid.teamStreaks.groupMembers.create({
            friendId,
            teamStreakId: createdteamStreakId,
        });
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.users.deleteOne(friendId);
        await streakoid.teamStreaks.deleteOne(createdteamStreakId);
    });

    test(`deletes member from team streak`, async () => {
        expect.assertions(28);

        const { status } = await streakoid.teamStreaks.groupMembers.deleteOne({
            teamStreakId: createdteamStreakId,
            memberId: friendId,
        });

        expect(status).toEqual(204);

        const updatedTeamStreak = await streakoid.teamStreaks.getOne(createdteamStreakId);

        expect(updatedTeamStreak._id).toEqual(expect.any(String));
        expect(updatedTeamStreak.status).toEqual(StreakStatus.live);
        expect(updatedTeamStreak.creatorId).toEqual(userId);
        expect(updatedTeamStreak.streakName).toEqual(streakName);
        expect(updatedTeamStreak.streakDescription).toEqual(streakDescription);
        expect(updatedTeamStreak.timezone).toEqual(londonTimezone);
        expect(updatedTeamStreak.createdAt).toEqual(expect.any(String));
        expect(updatedTeamStreak.updatedAt).toEqual(expect.any(String));

        expect(Object.keys(updatedTeamStreak.creator)).toEqual(['_id', 'username']);
        expect(updatedTeamStreak.creator._id).toEqual(userId);
        expect(updatedTeamStreak.creator.username).toEqual(registeredUsername);

        expect(Object.keys(updatedTeamStreak).sort()).toEqual(
            [
                '_id',
                'status',
                'members',
                'creatorId',
                'streakName',
                'streakDescription',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
                'creator',
            ].sort(),
        );

        expect(updatedTeamStreak.members.length).toEqual(1);

        const member = updatedTeamStreak.members[0];
        expect(member._id).toEqual(userId);
        expect(member.username).toEqual(registeredUsername);
        expect(Object.keys(member)).toEqual(['_id', 'username', 'groupMemberStreak']);

        expect(member.groupMemberStreak._id).toEqual(expect.any(String));
        expect(member.groupMemberStreak.completedToday).toEqual(false);
        expect(member.groupMemberStreak.active).toEqual(false);
        expect(member.groupMemberStreak.activity).toEqual([]);
        expect(member.groupMemberStreak.pastStreaks).toEqual([]);
        expect(member.groupMemberStreak.userId).toEqual(userId);
        expect(member.groupMemberStreak.teamStreakId).toEqual(createdteamStreakId);
        expect(member.groupMemberStreak.timezone).toEqual(londonTimezone);
        expect(member.groupMemberStreak.createdAt).toEqual(expect.any(String));
        expect(member.groupMemberStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(member.groupMemberStreak)).toEqual([
            '_id',
            'currentStreak',
            'completedToday',
            'active',
            'activity',
            'pastStreaks',
            'userId',
            'teamStreakId',
            'timezone',
            'createdAt',
            'updatedAt',
            '__v',
        ]);
    });
});
