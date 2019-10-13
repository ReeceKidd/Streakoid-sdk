import { streakoid, londonTimezone } from '../src/streakoid';
import StreakStatus from '../src/StreakStatus';

const email = 'create-groupMember-user@gmail.com';
const username = 'create-groupmember-user';

const friendEmail = 'friend@gmail.com';
const friendUsername = 'frienduser';

jest.setTimeout(120000);

describe('POST /team-streaks/:id/members', () => {
    let userId: string;
    let friendId: string;
    let createdteamStreakId: string;

    const streakName = 'Drink water';
    const streakDescription = 'Everyday I must drink two litres of water';

    beforeAll(async () => {
        const user = await streakoid.users.create({
            username,
            email,
        });
        userId = user._id;

        const friendRegistrationResponse = await streakoid.users.create({
            username: friendUsername,
            email: friendEmail,
        });

        friendId = friendRegistrationResponse._id;

        const members = [{ memberId: userId }];

        const createteamStreakResponse = await streakoid.teamStreaks.create({
            creatorId: userId,
            streakName,
            streakDescription,
            members,
        });
        createdteamStreakId = createteamStreakResponse._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.users.deleteOne(friendId);
        await streakoid.teamStreaks.deleteOne(createdteamStreakId);
    });

    test(`adds friend to team streak`, async () => {
        expect.assertions(48);

        const members = await streakoid.teamStreaks.groupMembers.create({
            friendId,
            teamStreakId: createdteamStreakId,
        });

        expect(members.length).toEqual(2);

        const currentUser = members[0];
        expect(currentUser.memberId).toEqual(userId);
        expect(currentUser.groupMemberStreakId).toEqual(expect.any(String));
        expect(Object.keys(currentUser).sort()).toEqual(['memberId', 'groupMemberStreakId'].sort());

        const friend = members[1];
        expect(friend.memberId).toEqual(friendId);
        expect(friend.groupMemberStreakId).toEqual(expect.any(String));
        expect(Object.keys(currentUser).sort()).toEqual(['memberId', 'groupMemberStreakId'].sort());

        const teamStreak = await streakoid.teamStreaks.getOne(createdteamStreakId);

        expect(teamStreak.streakName).toEqual(expect.any(String));
        expect(teamStreak.status).toEqual(StreakStatus.live);
        expect(teamStreak.streakDescription).toEqual(expect.any(String));
        expect(teamStreak.creatorId).toEqual(userId);
        expect(teamStreak.timezone).toEqual(expect.any(String));
        expect(teamStreak.active).toEqual(false);
        expect(teamStreak.completedToday).toEqual(false);
        expect(teamStreak.currentStreak.numberOfDaysInARow).toEqual(0);
        expect(Object.keys(teamStreak.currentStreak).sort()).toEqual(['numberOfDaysInARow'].sort());
        expect(teamStreak.pastStreaks.length).toEqual(0);
        expect(Object.keys(teamStreak).sort()).toEqual(
            [
                '_id',
                'members',
                'status',
                'creatorId',
                'creator',
                'streakName',
                'streakDescription',
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

        const { creator } = teamStreak;
        expect(creator._id).toBeDefined();
        expect(creator.username).toEqual(username);
        expect(Object.keys(creator).sort()).toEqual(['_id', 'username'].sort());

        expect(teamStreak.members.length).toEqual(2);

        const member = teamStreak.members[0];
        expect(member._id).toEqual(userId);
        expect(member.username).toEqual(username);
        expect(Object.keys(member).sort()).toEqual(['_id', 'username', 'groupMemberStreak'].sort());

        expect(member.groupMemberStreak._id).toEqual(expect.any(String));
        expect(member.groupMemberStreak.completedToday).toEqual(false);
        expect(member.groupMemberStreak.active).toEqual(false);
        expect(member.groupMemberStreak.pastStreaks).toEqual([]);
        expect(member.groupMemberStreak.userId).toEqual(userId);
        expect(member.groupMemberStreak.teamStreakId).toEqual(createdteamStreakId);
        expect(member.groupMemberStreak.timezone).toEqual(londonTimezone);
        expect(member.groupMemberStreak.createdAt).toEqual(expect.any(String));
        expect(member.groupMemberStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(member.groupMemberStreak).sort()).toEqual(
            [
                '_id',
                'currentStreak',
                'completedToday',
                'active',
                'pastStreaks',
                'userId',
                'teamStreakId',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );

        const friendMember = teamStreak.members[1];
        expect(friendMember._id).toEqual(friendId);
        expect(friendMember.username).toEqual(friendUsername);
        expect(Object.keys(friendMember).sort()).toEqual(['_id', 'username', 'groupMemberStreak'].sort());

        expect(friendMember.groupMemberStreak._id).toEqual(expect.any(String));
        expect(friendMember.groupMemberStreak.completedToday).toEqual(false);
        expect(friendMember.groupMemberStreak.active).toEqual(false);
        expect(friendMember.groupMemberStreak.pastStreaks).toEqual([]);
        expect(friendMember.groupMemberStreak.userId).toEqual(friendId);
        expect(friendMember.groupMemberStreak.teamStreakId).toEqual(createdteamStreakId);
        expect(friendMember.groupMemberStreak.timezone).toEqual(londonTimezone);
        expect(friendMember.groupMemberStreak.createdAt).toEqual(expect.any(String));
        expect(friendMember.groupMemberStreak.updatedAt).toEqual(expect.any(String));
        expect(Object.keys(friendMember.groupMemberStreak).sort()).toEqual(
            [
                '_id',
                'currentStreak',
                'completedToday',
                'active',
                'pastStreaks',
                'userId',
                'teamStreakId',
                'timezone',
                'createdAt',
                'updatedAt',
                '__v',
            ].sort(),
        );
    });
});
