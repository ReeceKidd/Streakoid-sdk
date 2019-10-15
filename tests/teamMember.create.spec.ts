import { londonTimezone, StreakoidFactory } from '../src/streakoid';
import StreakStatus from '../src/StreakStatus';
import { getUser, streakoidTest, username } from './setup/streakoidTest';

const friendEmail = 'group-member-friend@gmail.com';
const friendUsername = 'groupmemberfrienduser';

jest.setTimeout(120000);

describe('POST /team-streaks/:id/members', () => {
    let streakoid: StreakoidFactory;
    let userId: string;
    let friendId: string;
    let createdteamStreakId: string;

    const streakName = 'Drink water';
    const streakDescription = 'Everyday I must drink two litres of water';

    beforeAll(async () => {
        const user = await getUser();
        userId = user._id;
        streakoid = await streakoidTest();

        const friend = await streakoid.users.create({
            username: friendUsername,
            email: friendEmail,
        });

        friendId = friend._id;

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

        try {
            const members = await streakoid.teamStreaks.teamMembers.create({
                friendId,
                teamStreakId: createdteamStreakId,
            });

            expect(members.length).toEqual(2);

            const currentUser = members[0];
            expect(currentUser.memberId).toEqual(userId);
            expect(currentUser.teamMemberStreakId).toEqual(expect.any(String));
            expect(Object.keys(currentUser).sort()).toEqual(['memberId', 'teamMemberStreakId'].sort());

            const friend = members[1];
            expect(friend.memberId).toEqual(friendId);
            expect(friend.teamMemberStreakId).toEqual(expect.any(String));
            expect(Object.keys(currentUser).sort()).toEqual(['memberId', 'teamMemberStreakId'].sort());

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
            expect(Object.keys(member).sort()).toEqual(['_id', 'username', 'teamMemberStreak'].sort());

            expect(member.teamMemberStreak._id).toEqual(expect.any(String));
            expect(member.teamMemberStreak.completedToday).toEqual(false);
            expect(member.teamMemberStreak.active).toEqual(false);
            expect(member.teamMemberStreak.pastStreaks).toEqual([]);
            expect(member.teamMemberStreak.userId).toEqual(userId);
            expect(member.teamMemberStreak.teamStreakId).toEqual(createdteamStreakId);
            expect(member.teamMemberStreak.timezone).toEqual(londonTimezone);
            expect(member.teamMemberStreak.createdAt).toEqual(expect.any(String));
            expect(member.teamMemberStreak.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(member.teamMemberStreak).sort()).toEqual(
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
            expect(Object.keys(friendMember).sort()).toEqual(['_id', 'username', 'teamMemberStreak'].sort());

            expect(friendMember.teamMemberStreak._id).toEqual(expect.any(String));
            expect(friendMember.teamMemberStreak.completedToday).toEqual(false);
            expect(friendMember.teamMemberStreak.active).toEqual(false);
            expect(friendMember.teamMemberStreak.pastStreaks).toEqual([]);
            expect(friendMember.teamMemberStreak.userId).toEqual(friendId);
            expect(friendMember.teamMemberStreak.teamStreakId).toEqual(createdteamStreakId);
            expect(friendMember.teamMemberStreak.timezone).toEqual(londonTimezone);
            expect(friendMember.teamMemberStreak.createdAt).toEqual(expect.any(String));
            expect(friendMember.teamMemberStreak.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(friendMember.teamMemberStreak).sort()).toEqual(
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
        } catch (err) {
            console.log(err.response.data);
        }
    });
});
