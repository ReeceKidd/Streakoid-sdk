import { streakoid } from "../src/streakoid";


const registeredEmail = "get-group-streaks@gmail.com";
const registeredUsername = "get-group-streaks-user";

const creatorRegisteredEmail = "creator@gmail.com";
const creatorRegisteredUsername = "creator";

const creatorIdStreakName = "Daily Spanish";
const creatorIdStreakDescription =
    "Each day I must do the insame amount 50xp of Duolingo";

const memberIdStreakName = "Read 30 minutes";
const memberIdStreakDescription = "Everyday we must read for 30 minutes";

const timezoneStreakName = "Cold showers";
const timezoneStreakDescription =
    "Every day I must take cold showers for one minutes";

const timezone = "Europe/Paris";
const romeTimezone = "Europe/Rome";

jest.setTimeout(120000);

describe("GET /group-streaks", () => {
    let userId: string;
    let creatorId: string;
    let creatorIdGroupStreakId: string;
    let memberIdGroupStreakId: string;
    let timezoneGroupStreakId: string;

    beforeAll(async () => {
        const registrationResponse = await streakoid.users.create(
            {
                username: registeredUsername,
                email: registeredEmail
            }
        );
        userId = registrationResponse._id;

        const creatorRegistrationResponse = await streakoid.users.create(
            {
                username: creatorRegisteredUsername,
                email: creatorRegisteredEmail
            }
        );
        creatorId = creatorRegistrationResponse._id;

        const members = [{ memberId: userId }];

        const creatorIdGroupStreakResponse = await streakoid.groupStreaks.create({
            creatorId,
            streakName: creatorIdStreakName,
            streakDescription: creatorIdStreakDescription,
            timezone,
            members
        });
        creatorIdGroupStreakId = creatorIdGroupStreakResponse._id;

        const memberIdGroupStreakResponse = await streakoid.groupStreaks.create({
            creatorId: userId,
            streakName: memberIdStreakName,
            streakDescription: memberIdStreakDescription,
            members,
            timezone
        });
        memberIdGroupStreakId = memberIdGroupStreakResponse._id;

        const specificTimezoneGroupStreakResponse = await streakoid.groupStreaks.create(
            {
                creatorId: userId,
                streakName: timezoneStreakName,
                streakDescription: timezoneStreakDescription,
                timezone: romeTimezone,
                members
            }
        );

        timezoneGroupStreakId = specificTimezoneGroupStreakResponse._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.users.deleteOne(creatorId);

        await streakoid.groupStreaks.deleteOne(creatorIdGroupStreakId);
        await streakoid.groupStreaks.deleteOne(memberIdGroupStreakId);
        await streakoid.groupStreaks.deleteOne(timezoneGroupStreakId);
    });

    test(`group streaks can be retreived with creatorId query paramater`, async () => {
        expect.assertions(12);
        const groupStreaks = await streakoid.groupStreaks.getAll({ creatorId });
        expect(groupStreaks.length).toEqual(1);

        const groupStreak = groupStreaks[0];
        expect(groupStreak.streakName).toEqual(creatorIdStreakName);
        expect(groupStreak.streakDescription).toEqual(creatorIdStreakDescription);
        expect(groupStreak.creatorId).toEqual(creatorId);
        expect(groupStreak.timezone).toEqual(timezone);
        expect(Object.keys(groupStreak).sort()).toEqual([
            "_id",
            "members",
            "creatorId",
            "streakName",
            "streakDescription",
            "timezone",
            "createdAt",
            "updatedAt",
            "__v"
        ].sort());

        const { members } = groupStreak;
        expect(members.length).toEqual(1);

        const member = members[0];
        expect(member._id).toBeDefined();
        expect(member.username).toEqual(registeredUsername);
        expect(Object.keys(member).sort()).toEqual([
            "_id",
            "username",
            "groupMemberStreak"
        ].sort());

        const { groupMemberStreak } = member;
        expect(Object.keys(groupMemberStreak).sort()).toEqual([
            "_id",
            "currentStreak",
            "completedToday",
            "active",
            "activity",
            "pastStreaks",
            "userId",
            "groupStreakId",
            "timezone",
            "createdAt",
            "updatedAt",
            "__v"
        ].sort());

        const { currentStreak } = groupMemberStreak;
        expect(Object.keys(currentStreak)).toEqual(["numberOfDaysInARow"]);
    });

    test("returns no group streaks when invalid creatorId is used", async () => {
        expect.assertions(1);
        const groupStreaks = await streakoid.groupStreaks.getAll({
            creatorId: "InvalidID"
        });
        expect(groupStreaks.length).toEqual(0);
    });

    test(`group streaks can be retreived with memberId query parameter`, async () => {
        expect.assertions(12);
        const groupStreaks = await streakoid.groupStreaks.getAll({ memberId: userId });
        expect(groupStreaks.length).toBeGreaterThanOrEqual(1);
        const groupStreak = groupStreaks[0];

        expect(groupStreak.streakName).toEqual(creatorIdStreakName);
        expect(groupStreak.streakDescription).toEqual(creatorIdStreakDescription);
        expect(groupStreak.creatorId).toEqual(creatorId);
        expect(groupStreak.timezone).toEqual(timezone);
        expect(Object.keys(groupStreak).sort()).toEqual([
            "_id",
            "members",
            "creatorId",
            "streakName",
            "streakDescription",
            "timezone",
            "createdAt",
            "updatedAt",
            "__v"
        ].sort());

        const { members } = groupStreak;
        expect(members.length).toEqual(1);

        const member = members[0];
        expect(member._id).toBeDefined();
        expect(member.username).toEqual(registeredUsername);
        expect(Object.keys(member).sort()).toEqual([
            "_id",
            "username",
            "groupMemberStreak"
        ].sort());

        const { groupMemberStreak } = member;
        expect(Object.keys(groupMemberStreak).sort()).toEqual([
            "_id",
            "currentStreak",
            "completedToday",
            "active",
            "activity",
            "pastStreaks",
            "userId",
            "groupStreakId",
            "timezone",
            "createdAt",
            "updatedAt",
            "__v"
        ].sort());

        const { currentStreak } = groupMemberStreak;
        expect(Object.keys(currentStreak)).toEqual(["numberOfDaysInARow"]);
    });

    test("returns no group streaks when invalid memberId is used", async () => {
        expect.assertions(1);
        const groupStreaks = await streakoid.groupStreaks.getAll({
            memberId: "InvalidID"
        });
        expect(groupStreaks.length).toEqual(0);
    });

    test(`group streaks can be retreieved with timezone query parameter`, async () => {
        expect.assertions(13);
        const groupStreaks = await streakoid.groupStreaks.getAll({ timezone });

        expect(groupStreaks.length).toBeGreaterThanOrEqual(1);

        const groupStreak = groupStreaks[0];
        expect(groupStreak.streakName).toEqual(creatorIdStreakName);
        expect(groupStreak.streakDescription).toEqual(creatorIdStreakDescription);
        expect(groupStreak.creatorId).toEqual(creatorId);
        expect(groupStreak.timezone).toEqual(timezone);
        expect(Object.keys(groupStreak).sort()).toEqual([
            "_id",
            "members",
            "creatorId",
            "streakName",
            "streakDescription",
            "timezone",
            "createdAt",
            "updatedAt",
            "__v"
        ].sort());

        const { members } = groupStreak;
        expect(members.length).toEqual(1);

        const member = members[0];
        expect(member._id).toBeDefined();
        expect(member.username).toEqual(registeredUsername);
        expect(Object.keys(member).sort()).toEqual([
            "_id",
            "username",
            "groupMemberStreak"
        ].sort());

        const { groupMemberStreak } = member;
        expect(Object.keys(groupMemberStreak).sort()).toEqual([
            "_id",
            "currentStreak",
            "completedToday",
            "active",
            "activity",
            "pastStreaks",
            "userId",
            "groupStreakId",
            "timezone",
            "createdAt",
            "updatedAt",
            "__v"
        ].sort());

        const { currentStreak } = groupMemberStreak;
        expect(currentStreak.numberOfDaysInARow).toEqual(0);
        expect(Object.keys(currentStreak).sort()).toEqual(["numberOfDaysInARow"]);
    });

    test("returns no group streaks when timezone with no group streaks is used", async () => {
        expect.assertions(1);
        const groupStreaks = await streakoid.groupStreaks.getAll({
            timezone: "Europe/Gambier Islands"
        });
        expect(groupStreaks.length).toEqual(0);
    });
});
